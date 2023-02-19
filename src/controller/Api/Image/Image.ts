import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../../interface/vendors";
import { Database } from "../../../provider/Database";

class Image {
  public static new: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    try {
      check("name", "Password cannot be blank").notEmpty();
      check(
        "isPrivate",
        "Password length must be atleast 8 characters"
      ).notEmpty();
      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // @ts-ignore
      const { user, file, body } = req;
      const { name, isPrivate } = body;

      // V1 存local TODO: access control

      // 存圖片metadata
      const insertResult = await Database.pool.query(
        "INSERT INTO images (name, is_private, user_id, path, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, isPrivate, user.id, file.path, new Date()]
      );

      if (insertResult.rowCount === 1) {
        return res.status(200).json({
          error: false,
          message: "Image created",
          data: insertResult.rows[0],
        });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  public static delete: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    const client = await Database.pool.connect();
    try {
      check("imageId", "imageId cannot be blank").notEmpty();
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // @ts-ignore
      const { user, body } = req;
      const { imageId } = body;

      await client.query("BEGIN");

      const deleteResult = await Database.pool.query(
        "DELETE FROM images WHERE id = $1 AND user_id = $2",
        [imageId, user.id]
      );

      // TODO
      // delete the actual image file
      await client.query("DELETE FROM images WHERE id = $1", [imageId]);

      await client.query("COMMIT");

      if (deleteResult.rowCount === 1) {
        return res.status(200).json({
          error: false,
          message: "Image deleted",
        });
      }
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  };

  public static update: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    const client = await Database.pool.connect();
    try {
      check("imageId", "imageId cannot be blank").notEmpty();
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // @ts-ignore
      const { user, body } = req;
      const { imageId, isPrivate } = body;

      await client.query("BEGIN");

      // TODO
      // change the actual accessibliity of the image file

      const updateResult = await Database.pool.query(
        "UPDATE images SET is_private = $1 WHERE id = $2 AND user_id = $3",
        [isPrivate, imageId, user.id]
      );

      await client.query("COMMIT");

      if (updateResult.rowCount === 1) {
        return res.status(200).json({
          error: false,
          message: "Image updated",
        });
      }
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  };

  public static getList: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    try {
      // @ts-ignore
      const { user } = req;

      const selectResult = await Database.pool.query(
        "SELECT id, name, is_private, path, created_at FROM images WHERE user_id = $1",
        [user.id]
      );

      return res.status(200).json({
        error: false,
        message: "Image list",
        data: selectResult.rows,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // get image by id <- need private protection
  public static get: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    try {
      check("id", "Password cannot be blank").notEmpty();
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // @ts-ignore
      const { user, body } = req;
      const { id } = body;

      const selectResult = await Database.pool.query(
        "SELECT id, name, is_private, path, created_at FROM images WHERE id = $1 AND user_id = $2",
        [id, user.id]
      );

      if (selectResult.rowCount === 1) {
        return res.status(200).json({
          error: false,
          message: "Image",
          data: selectResult.rows[0],
        });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

export default Image;

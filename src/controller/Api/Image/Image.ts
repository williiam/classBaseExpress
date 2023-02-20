import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../../interface/vendors";
import { Database } from "../../../provider/Database";
import path from 'path';
class Image {
  public static new: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    const client = await Database.pool.connect();
    try {
      await check("isPrivate", "isPrivate must be not empty")
        .notEmpty()
        .run(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }
      // @ts-ignore
      const { user, file, body } = req;
      const { isPrivate } = body;
      const { originalname: name } = file;

      await client.query("BEGIN");

      // V1 存local TODO: access control

      // 存圖片metadata
      const insertResult = await client.query(
        "INSERT INTO image (name, is_private, user_id, path, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, isPrivate, user.id, file.path, new Date()]
      );

      // FIXME
      await client.query("COMMIT");

      if (insertResult.rowCount === 1) {
        return res.status(200).json({
          error: false,
          message: "Image created",
          data: insertResult.rows[0],
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

  public static delete: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    const client = await Database.pool.connect();
    try {
      await check("imageId", "imageId cannot be blank").notEmpty().run(req);
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // @ts-ignore
      const { user, body } = req;
      const { imageId } = body;

      await client.query("BEGIN");

      const deleteResult = await client.query(
        "DELETE FROM image WHERE id = $1 AND user_id = $2",
        [imageId, user.id]
      );

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
      await check("imageId", "imageId cannot be blank").notEmpty().run(req);
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

      const updateResult = await client.query(
        "UPDATE image SET is_private = $1 WHERE id = $2 AND user_id = $3",
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
        "SELECT id, name, is_private, path, created_at FROM image WHERE user_id = $1",
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
  public static get: RequestHandler<IRequest & {imageId: string}, Partial<IResponse>> = async (
    req,
    res
  ) => {
    try {
      check("imageId", "imageId cannot be blank").notEmpty();
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      // @ts-ignore
      const { user, params } = req;
      const { imageId } = params;

      const selectResult = await Database.pool.query(
        "SELECT id, name, is_private, path, created_at FROM image WHERE id = $1",
        [imageId]
      );

      if(selectResult.rows.length===0){
        return res.sendStatus(404);
      }

      const selectImage = selectResult.rows[0];

      if (selectImage.isPrivate && !!user && user.id !== selectImage.userId) {
        return res.status(400).json({
          message: "unauthorized",
        });
      }

      const actualPath = path.join(__dirname, `../../${selectImage.path}`)

      res.sendFile(actualPath);
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

// Helper function to determine the content type based on the file extension
function getContentType(filePath: string) {
  const parts = filePath.split(".");
  const ext = parts.length > 1 ? parts.pop()?.toLowerCase() : "";
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

export default Image;

import bcrypt from "bcrypt";
import Locals from "../provider/Local";

export const hash = async (password: string): Promise<string> => {
  const saltRounds = Locals.config().saltRounds;
  const salt = await bcrypt.genSalt(saltRounds);
  const result = await bcrypt.hash(password, salt);
  return result;
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

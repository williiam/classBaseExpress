import bcrypt from "bcrypt";
import Locals from "../provider/Local";

export const hash = async (password: string): Promise<string> => {
  const saltRounds = Locals.config().saltRounds;
  return await bcrypt.hash(password, saltRounds);
};

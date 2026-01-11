import process from "node:process";
import { SQL } from "bun";

export const sql = new SQL(process.env.DATABASE_URL!);

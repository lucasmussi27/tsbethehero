import connection from "../database/connection";
import generateUniqueId from "../utils/generateUniqueId";
import { Request, Response } from "express";

export default {
  async findAll(req: Request, res: Response) {
    const ongs = await connection('ongs').select('*');
    return res.json(ongs);
  },
  async create(req: Request, res: Response) {
    const { name, email, whatsapp, country, city, uf } = req.body;
    const id = generateUniqueId();
    await connection('ongs').insert({
      id, name, email, whatsapp, country, city, uf
    });
    return res.json({ id });
  }
}
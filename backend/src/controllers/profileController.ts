import { Request, Response } from "express"
import connection from "../database/connection"

export default {
  async findAll(req: Request, res: Response) {
    const ong_id = req.headers.authorization
    const incidents = await connection('incidents')
      .where('ong_id', ong_id).select("*")
    return res.json(incidents)
  }
}
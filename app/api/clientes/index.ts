import { db } from "@/app/db";
import { clienteTable } from "@/app/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { tipo, score, nome } = req.body;

      if (!tipo || !score || !nome) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const result = await db.insert(clienteTable).values({
        tipo,
        score,
        nome,
      });

      return res.status(201).json({ message: "Client created", result });
    } else if (req.method === "GET") {
      const clientes = await db.select().from(clienteTable);
      return res.status(200).json(clientes);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

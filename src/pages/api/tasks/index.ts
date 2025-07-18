import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    })
    return res.status(200).json(tasks)
  }

  if (req.method === "POST") {
    const { title } = req.body

    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: "Título inválido" })
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
      },
    })

    return res.status(201).json(task)
  }

  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

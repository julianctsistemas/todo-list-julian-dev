import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (typeof id !== "string") {
    return res.status(400).json({ error: "ID inválido" })
  }

  if (req.method === "PATCH") {
    const existing = await prisma.task.findUnique({ where: { id } })
  
    if (!existing) {
      return res.status(404).json({ error: "Tarea no encontrada" })
    }
  
    const updated = await prisma.task.update({
      where: { id },
      data: { completed: !existing.completed },
    })
  
    return res.status(200).json(updated)
  }
  
  if (req.method === "DELETE") {
    const task = await prisma.task.findUnique({ where: { id } })
  
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" })
    }
  
    if (!task.completed) {
      return res.status(403).json({ error: "Solo puedes eliminar tareas completadas" })
    }
  
    await prisma.task.delete({ where: { id } })
    return res.status(204).end()
  }
  

  res.setHeader("Allow", ["PATCH", "DELETE"])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

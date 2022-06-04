import { NextApiRequest, NextApiResponse } from "next";
import { create } from "utils/generator.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = JSON.parse(JSON.stringify(req.body));
  const { items, layers, address } = body;
  const result = await create({ items, layers, address });
  res.status(200).send({ data: result });
  return;
}

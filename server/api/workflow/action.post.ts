import { defineEventHandler } from "h3";
import { z } from "zod";

// Define a tipagem e a validação dos dados
const schemaAction = z.object({
  id: z.number().min(1),
});

// Método que executa a ação do nó
export default defineEventHandler(async (event) => {
  try {
    const { type } = await readBody(event);
    // Faz uma simulação com retornos entre verdadeiro ou falso
    const data = { id: [34, type, 68, "Vue"][Math.floor(Math.random() * 3)] };
    return schemaAction.safeParse(data);
  } catch (error) {
    return setResponseStatus(500, "Tente novamente mais tarde");
  }
});

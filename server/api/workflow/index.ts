import { defineEventHandler } from "h3";
import { z } from "zod";

// Define a tipagem e a validação dos dados
const schemaListWorkflow = z.array(
  z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    icon: z.string().optional(),
  })
);

export type ListWorkflow = z.infer<typeof schemaListWorkflow>;

// Método que lista todos os workflows com base no JSON
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const data = await fetch(`${config.public.apiBase}/workflow/all.json`).then(
      async (res) => {
        if (res.status === 200) {
          const { data } = await res.json();
          return data.workflow;
        }

        return {};
      }
    );
    return schemaListWorkflow.safeParse(data);
  } catch (error) {
    return setResponseStatus(500, "Tente novamente mais tarde");
  }
});

import { defineEventHandler } from "h3";
import { z } from "zod";

const baseActionSchema = z.object({
  type: z.string().min(1),
  timeout: z.number(),
});

type Action = z.infer<typeof baseActionSchema> & {
  on_success?: Action[];
  on_failure?: Action[];
};

const actionSchema: z.ZodType<Action> = baseActionSchema.extend({
  on_success: z.lazy(() => actionSchema.array().optional()),
  on_failure: z.lazy(() => actionSchema.array().optional()),
});
export type WorkflowAction = z.infer<typeof actionSchema>;

// Define a tipagem e a validação dos dados
const schemaWorkflow = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  blocks: z.array(
    z.object({
      name: z.string().min(1),
      icon: z.string().optional(),
      iconColor: z.string().optional(),
      actions: z.array(actionSchema),
    })
  ),
});

export type Workflow = z.infer<typeof schemaWorkflow>;

// Método find espera o parâmetro id, faz a busca do workflow no JSON
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const id = event.context?.params?.id;
    if (!id) {
      return setResponseStatus(400, "Dados inválidos.");
    }
    const data = await fetch(
      `${config.public.apiBase}/workflow/${id}.json`
    ).then(async (res) => {
      if (res.status === 200) {
        const { workflow } = await res.json();
        return workflow;
      }

      return {};
    });
    return schemaWorkflow.safeParse(data);
  } catch (error) {
    return setResponseStatus(500, "Tente novamente mais tarde");
  }
});

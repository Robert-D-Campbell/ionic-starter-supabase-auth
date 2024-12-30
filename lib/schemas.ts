import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authSchemaInitialValues = {
  email: "",
  password: "",
};

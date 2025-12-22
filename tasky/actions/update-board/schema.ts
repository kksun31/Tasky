import { z } from "zod";

export const UpdateBoard = z.object({
  id: z.string(),
  title: z.string().min(3, "Название должно быть не короче 3 символов"),
});
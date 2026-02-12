import { z } from "zod";

export const CreateList = z.object({
  title: z.string().min(3, {
    message: "Название слишком короткое",
  }),
  boardId: z.string(),
});
import { z } from "zod";


export const CreateBoard = z.object({
  title: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z.string().min(1, "Требуется название").min(3, "Название короткое")
  ),
});
//export const CreateBoard = z.object({
//    title: z.string({
//        required_error: "Требуется название",
//        invalid_type_error: "Требуется название",  
//    }).min(3, {
    //    message: "Название короткое"
  //  }),
//});

// lib/create-safe-action.ts
import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction =
  <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (data: TInput) => Promise<ActionState<TInput, TOutput>>,
  ) =>
  async (raw: TInput): Promise<ActionState<TInput, TOutput>> => {
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      return {
        fieldErrors: parsed.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(parsed.data);
  };

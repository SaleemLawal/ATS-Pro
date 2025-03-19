"use server";
import { loginSchema } from "@/schema/loginSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const passwordSignIn = async (values: z.infer<typeof loginSchema>) => {
  const supabase = await createClient();
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  return { success: true};
};

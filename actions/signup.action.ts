"use server";
import { registerSchema } from "@/schema/registerSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const passwordSignUp = async (
  values: z.infer<typeof registerSchema>
) => {
  const supabase = await createClient();
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  return { success: true };
};

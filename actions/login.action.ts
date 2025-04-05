"use server";
import { loginSchema } from "@/schema/loginSchema";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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
  return { success: true };
};

export const OAuthSignIn = async (provider: Provider) => {
  const supabase = await createClient();
  const headersList = headers();
  const headerOrigin = (await headersList).get("origin");
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  console.log("Header Origin:", headerOrigin);
  console.log("ENV URL:", envUrl);

  const origin = headerOrigin ?? envUrl ?? "";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);

  redirect(data.url);
};

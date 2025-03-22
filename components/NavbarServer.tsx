import { createClient } from "@/utils/supabase/server";
import Navbar from "./Navbar";

export default async function NavbarServer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  // console.log("From nav server", user);

  return <Navbar user={user} />;
}

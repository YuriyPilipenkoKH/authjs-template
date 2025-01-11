import Link from "next/link";
import { auth } from "../../auth";
import AuthButton from "@/components/auth/AuthBtn.server";


export default async function Home() {
  const session = await auth()
  console.log(session);
  
  return (
    <nav className="flex gap-4 items-center justify-between p-4" >
      <Link href={'/'}>template </Link>
      <AuthButton/>

      </nav>
  );
}

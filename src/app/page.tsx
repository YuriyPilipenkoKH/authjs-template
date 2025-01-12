import Link from "next/link";
import { auth } from "../../auth";


export default async function Home() {
  const session = await auth()
  console.log(session);
  
  return (
    <nav className="flex gap-4 items-center justify-between p-4" >
      <Link href={'/'}>template </Link>
      <Link href={'/login'}>login </Link>
      

      </nav>
  );
}

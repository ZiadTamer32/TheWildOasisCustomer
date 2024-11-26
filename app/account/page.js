import { auth } from "../_library/auth";

export const metadata = {
  title: "Guest Area"
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name.split(" ")[0];
  return (
    <h1 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome {firstName}!
    </h1>
  );
}

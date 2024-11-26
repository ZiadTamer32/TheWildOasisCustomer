import SignInButton from "@/starter/components/SignInButton";
import { signInActions } from "../_library/actions";

export const metadata = {
  title: "Login"
};

export default function Page() {
  return (
    <form action={signInActions}>
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h2 className="text-3xl font-semibold">
          Sign in to access your guest area
        </h2>
        <SignInButton />
      </div>
    </form>
  );
}

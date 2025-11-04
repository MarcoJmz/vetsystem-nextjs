"use client";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { signInWithCredentials } from "../../../firebase/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  return (
    <SignInPage
      providers={[{ id: "credentials", name: "Credentials" }]}
      signIn={async (
        provider: AuthProvider,
        formData: FormData,
        callbackUrl?: string
      ) => {
        try {
          let result;
          if (provider.id === "credentials") {
            const email = formData?.get("email") as string;
            const password = formData?.get("password") as string;

            if (!email || !password) {
              return { error: "Email and password are required" };
            }

            result = await signInWithCredentials(email, password);
          }

          if (result?.success && result?.user) {
            // Firebase actualizará la sesión automáticamente via onAuthStateChanged
            // Redirigir al dashboard o callback URL
            router.push(callbackUrl || "/");
            return {};
          }

          return { error: result?.error || "Failed to sign in" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "An error occurred",
          };
        }
      }}
    />
  );
}

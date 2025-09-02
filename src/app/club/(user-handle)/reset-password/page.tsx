"use client";

import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgArrowLeft, CgSpinner } from "react-icons/cg";
import Image from "next/image";
import Field from "@/app/club/Components/Field";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      await signOut(auth);
      console.log(auth, email)
      toast.success(
        "Password reset link sent to your email. Please reset your password and login again."
      );
      router.push("/club/login");
    } catch (error: any) {
      console.error("Password reset error:", error);
      
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email address");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later");
          break;
        default:
          toast.error(error.message.replace("Firebase: ", "") || "Failed to send reset link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 md:min-h-[70vh]">
        <form
          className="flex w-full flex-col justify-center gap-5 p-5 sm:p-12 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between text-sm md:text-base">
            <button
              type="button"
              className="ml-2 flex items-center gap-2 border-b-2 border-transparent font-medium text-primary hover:border-primary"
              onClick={() => router.back()}
            >
              <CgArrowLeft /> Go Back
            </button>
          </div>
          
          <h1 className="text-4xl">
            PASSWORD <span className="text-primary">RESET</span>
          </h1>
          
          <p className="text-base">
            Enter your email address to receive a password reset link. After resetting, please login again.
          </p>

          <div className="flex w-full flex-col gap-5">
            <Field
              state={email}
              setValue={(name, value) => setEmail(String(value))}
              name="email"
              label="Email Address"
              type="email"

            />
            
            <div className="w-full justify-self-end md:w-auto">
              <button
                disabled={loading}
                className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary disabled:opacity-70"
                type="submit"
              >
                {loading ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </div>
        </form>
        
        <div className="m-5 hidden w-1/2 lg:block">
          <Image
            src="/image/club/login.svg"
            alt="Password reset illustration"
            width={512}
            height={512}
            className="h-full rounded-xl object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
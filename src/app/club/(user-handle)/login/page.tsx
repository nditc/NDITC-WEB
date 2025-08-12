"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { CgLogIn, CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FirebaseError } from "firebase/app";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const { userAuth, loading: userLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && userAuth) {
      router.push("/club/profile");
    } else {
      setAuthLoading(false);
    }
  }, [userAuth, userLoading, router]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateUser = async (email: string) => {
    try {
      const usersRef = collection(db, "participants");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error validating user:", error);
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      const userExists = await validateUser(formData.email);
      if (!userExists) {
        toast.error("No account found with this email");
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login successful!");
      router.push("/club/profile");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      
      switch (firebaseError.code) {
        case "auth/invalid-credential":
          toast.error("Invalid email or password");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later.");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;
        case "auth/user-disabled":
          toast.error("This account has been disabled");
          break;
        default:
          toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = () => {
    if (!formData.email) {
      toast.info("Please enter your email first");
      return;
    }
    router.push(`/club/reset-password`);
  };

  if (authLoading || userLoading) {
    return (
      <div className="mt-[81px] grid h-[calc(100vh_-_81px)] w-screen place-items-center">
        <CgSpinner className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex min-h-[calc(100vh_-_81px)] w-full bg-white pb-8 pt-3 sm:my-16 sm:rounded-2xl sm:py-0 md:min-h-[70vh]">
        <form
          className="flex w-full flex-col justify-center gap-5 p-5 sm:p-12 lg:w-1/2"
          onSubmit={handleLogin}
        >
          <CgLogIn className="h-12 w-12 text-primary" />
          <h1 className="text-4xl">
            PARTICIPANT <span className="text-primary">Login</span>
          </h1>
          
          <div className="flex w-full flex-col gap-5">
            <Field
              state={formData.email}
              setValue={handleInputChange}
              name="email"
              label="Email"
              type="email"
              required
            />
            <Field
              state={formData.password}
              setValue={handleInputChange}
              name="password"
              label="Password"
              type="password"
              required
            />
          </div>
          
          <div className="flex justify-between text-sm md:text-base">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="ml-2 border-b-2 border-transparent font-medium text-primary hover:border-primary"
            >
              Forgot Password?
            </button>
          </div>
          
          <div className="flex w-full flex-col items-center gap-3">
            <button
              disabled={loading}
              className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-primary_dark disabled:opacity-70"
              type="submit"
            >
              {loading ? (
                <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
              ) : (
                "Login"
              )}
            </button>

            <div className="text-lg font-medium">
              Don't have an account?{" "}
              <Link
                className="border-b-2 border-transparent text-primary hover:border-primary"
                href="/club/register"
              >
                Register Now
              </Link>
            </div>
          </div>
        </form>
        
        <Image
          alt="login"
          className="m-5 hidden w-1/2 rounded-xl object-cover lg:block"
          src="/image/club/login.svg"
          width={512}
          height={512}
          priority
        />
      </div>
    </div>
  );
};

export default LoginPage;
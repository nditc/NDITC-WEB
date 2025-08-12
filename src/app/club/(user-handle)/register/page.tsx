"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useState } from "react";
import { regDataInit, regDataType } from "@/config/registerData";
import { auth, db } from "@/config/firebase";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getConfig } from "@/config/config_db";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
import PassingYear from "../../Components/PassingYear";
import { CiWarning } from "react-icons/ci";
import Image from "next/image";

const Page = () => {
  const { userAuth, loading: authLoading } = useAuthContext();
  const router = useRouter();

  const [regData, setRegData] = useState<regDataType>(regDataInit);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNDCStudent, setIsNDCStudent] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (name: string, data: string | number) => {
    setRegData(prev => ({ ...prev, [name]: data }));
  };

  const validateForm = (): [boolean, string] => {
    if (!regData.email || !password || !confirmPassword) {
      return [false, "Please fill in all required fields"];
    }

    if (password !== confirmPassword) {
      return [false, "Passwords do not match"];
    }

    if (password.length < 8) {
      return [false, "Password must be at least 8 characters long"];
    }

    if (!isNDCStudent && (!regData.name || !regData.institution || !regData.mobile)) {
      return [false, "Please fill in all required fields"];
    }

    return [true, ""];
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    const q = query(collection(db, "participants"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormLoading(true);

    const [isValid, errorMessage] = validateForm();
    if (!isValid) {
      toast.error(errorMessage);
      setFormLoading(false);
      return;
    }

    try {
      const emailExists = await checkEmailExists(regData.email);
      if (emailExists) {
        toast.error("Email address is already in use");
        setFormLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        regData.email,
        password
      );

      const userData = {
        ...regData,
        institution: isNDCStudent ? "Notre Dame College" : regData.institution,
        timestamp: serverTimestamp(),
        pass_set: true,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86"
      };

      await setDoc(doc(db, "participants", userCredential.user.uid), userData);
      await sendEmailVerification(userCredential.user);
      
      toast.success("Registration successful! Please check your email for verification.");
      router.push("/club/verify");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email address is already in use");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 8 characters");
          break;
        default:
          toast.error("Registration failed. Please try again.");
      }
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && userAuth) {
      router.push("/club/verify");
    }
  }, [userAuth, authLoading, router]);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const config = await getConfig();
        if (!config.registration_status) {
          router.push("/club/registration-closed");
        } else {
          setConfigLoading(false);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
        toast.error("Failed to load registration configuration");
        setConfigLoading(false);
      }
    };

    checkRegistrationStatus();
  }, [router]);

  if (configLoading) {
    return (
      <div className="mt-[81px] grid h-[calc(100vh_-_81px)] w-screen place-items-center">
        <CgSpinner className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex w-full flex-col bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 lg:flex-row">
        <div className="my-5 ml-5 mr-0 hidden w-[40%] flex-1 rounded-xl p-5 lg:block">
          <Image
            src="/image/club/login.svg"
            alt="Registration Illustration"
            width={400}
            height={400}
            className="h-full w-full object-contain"
            priority
          />
        </div>
        
        <form className="grid w-full flex-1 grid-cols-1 gap-5 p-5 sm:p-12" onSubmit={handleSubmit}>
          <AiOutlineUserAdd className="h-12 w-12 text-primary" />
          <h1 className="text-4xl">
            <span className="text-primary">Registration</span> Form
          </h1>
          
          <p>
            Please fill out the form below to register.{" "}
            <Link
              className="inline border-b-2 border-transparent font-medium text-primary hover:border-primary"
              href="/club/login"
            >
              Login Instead
            </Link>{" "}
            if you have already registered. By filling out this form you are
            agreeing to our terms and conditions.
          </p>

          {isNDCStudent && (
            <div className="rounded-xl bg-yellow-100 p-5 text-yellow-950">
              <p className="flex items-center gap-1 font-bold">
                <CiWarning />
                Notice:
              </p>
              <p>
                All Batch '26 Students are requested to create a Non-member
                Account right now as all of your Club Forms haven't been
                submitted yet. After we announce, you can enter your Roll in
                your profile and it will be converted to a Member account
                automatically.
              </p>
            </div>
          )}

          <div className="my-2 flex items-center gap-4">
            <div className="flex w-full gap-1 rounded-xl border border-gray-200 p-1 text-small">
              <button
                type="button"
                onClick={() => setIsNDCStudent(true)}
                className={`w-[123px] flex-1 rounded-lg px-4 py-3 transition ${
                  isNDCStudent
                    ? "bg-primary text-white"
                    : "hover:bg-zinc-200 active:bg-zinc-400"
                }`}
              >
                Club Member
              </button>
              <button
                type="button"
                onClick={() => setIsNDCStudent(false)}
                className={`w-[123px] flex-1 rounded-lg px-4 py-3 transition ${
                  !isNDCStudent
                    ? "bg-primary text-white"
                    : "hover:bg-zinc-200 active:bg-zinc-400"
                }`}
              >
                Non-Member
              </button>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {!isNDCStudent && (
              <>
                <Field
                  state={regData.name}
                  setValue={handleInputChange}
                  name="name"
                  label="Full Name"
                  type="text"
                />
                <PassingYear
                  state={regData.class}
                  setValue={handleInputChange}
                  name="class"
                  label="HSC Passing Year"
                  type="number"
                />
                <Field
                  state={regData.institution}
                  setValue={handleInputChange}
                  name="institution"
                  label="Institution"
                  type="text"
                />
                <Field
                  state={regData.mobile}
                  setValue={handleInputChange}
                  name="mobile"
                  label="Mobile No."
                  type="tel"
                />
                <Field
                  state={regData.address}
                  setValue={handleInputChange}
                  name="address"
                  label="Present Address"
                  type="text"
                />
              </>
            )}

            {isNDCStudent && (
              <Field
                state={regData.ndc_id}
                setValue={handleInputChange}
                name="ndc_id"
                label="NDC Roll"
                type="text"
              />
            )}

            <Field
              state={regData.email}
              setValue={handleInputChange}
              name="email"
              label="E-mail"
              type="email"
            />
            
            <Field
              state={regData.fbLink}
              setValue={handleInputChange}
              name="fbLink"
              label="Facebook (Optional)"
              type="text"
              notRequired
            />

            <Field
              state={password}
              setValue={(name, value) => setPassword(String(value))}
              name="password"
              label="Password"
              type="password"
            />
            
            <Field
              state={confirmPassword}
              setValue={(name, value) => setConfirmPassword(String(value))}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          </div>

          <button
            disabled={formLoading}
            className="mb-4 mt-6 w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary disabled:opacity-70"
            type="submit"
          >
            {formLoading ? (
              <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
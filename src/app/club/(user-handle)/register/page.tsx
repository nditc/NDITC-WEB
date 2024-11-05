"use client";

import Field from "@/app/club/Components/Field";
import React, { useEffect, useReducer, useState } from "react";
import { regDataInit, regDataType, classes } from "@/config/registerData";
import Select from "@/app/club/Components/Select";
import { auth, db } from "@/config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import verifyData from "@/util/verification";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getConfig } from "@/config/config_db";
import { Checkbox } from "@nextui-org/checkbox";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
import PassingYear from "../../Components/PassingYear";
import { CiWarning } from "react-icons/ci";

type actionType = {
  type: "SET_FIELD";
  name: string;
  data: string | number;
};

const getRegisteredNDC = async (regData: regDataType) => {
  const res = await fetch("/api/createaccountndc", {
    method: "POST",
    body: JSON.stringify({ ...regData }),
  });

  return res;
};

const Page = () => {
  const { userAuth, loading, error } = useAuthContext();

  const [regData, dispatch] = useReducer<
    (prevState: regDataType, action: actionType) => regDataType
  >((prevState: regDataType, action: actionType) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...prevState, [action.name]: action.data };
      default:
        return { ...prevState };
    }
  }, regDataInit);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isNDCStudent, setIsNDCStudent] = useState(false);
  const [configLoading, setConfigLoading] = useState<boolean>(true);
  const [rloading, setLoading] = useState<boolean>(false);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const [verified, massage] = verifyData(regData, password, confirmPassword);

    if (isNDCStudent && regData.ndc_id != "") {
      if (verified) {
        const ndc_register_res = await getRegisteredNDC(regData);
        const ndc_register_json = await ndc_register_res.json();

        if (!ndc_register_res.ok) {
          toast.error(ndc_register_json.error);
          setLoading(false);
          return;
        } else {
          if (ndc_register_json.success) {
            regData.ndc_id = ndc_register_json.memberID;
            createUserWithEmailAndPassword(auth, regData.email, password)
              .then(async (userInfo) => {
                //add userInfo in Collections
                const uid = userInfo.user.uid;
                await setDoc(doc(db, "participants", uid), {
                  ...regData,
                  institution: "Notre Dame College",
                  mobile: ndc_register_json.mobile,
                  name: ndc_register_json.name,
                  address: ndc_register_json.address,
                  pass_set: true,
                  class: ndc_register_json.year,
                  ndc_roll: ndc_register_json.roll,
                  timestamp: serverTimestamp(),
                  imageUrl:
                    "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86",
                });
                await sendEmailVerification(userInfo.user);
                toast.success(
                  "Email verification link sent! Please verify your email please.",
                );
                setLoading(false);
                Router.push("/club/verify");
              })
              .catch((error) => {
                switch (error.code) {
                  case "auth/email-already-in-use":
                    toast.error(`Email address already in use.`);
                    break;
                  case "auth/invalid-email":
                    toast.error(`Email address is invalid.`);
                    break;
                  case "auth/operation-not-allowed":
                    toast.error(`Error during sign up.`);
                    break;
                  case "auth/weak-password":
                    toast.error(
                      "Password is not strong enough. Add additional characters including special characters and numbers.",
                    );
                    break;
                  default:
                    toast.error(error.message.replaceAll("Firebase: ", ""));

                    break;
                }
                setLoading(false);
              });
          }
        }
      } else {
        toast.error(massage);
        setLoading(false);
      }
    } else {
      if (verified) {
        //

        regData.ndc_id = "";
        createUserWithEmailAndPassword(auth, regData.email, password)
          .then(async (userInfo) => {
            //add userInfo in Collections
            const uid = userInfo.user.uid;
            await setDoc(doc(db, "participants", uid), {
              ...regData,
              timestamp: serverTimestamp(),
              pass_set: true,
              imageUrl:
                "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86",
            });
            await sendEmailVerification(userInfo.user);
            toast.success(
              "Email verification link sent! Please verify your email please.",
            );
            setLoading(false);
            Router.push("/club/verify");
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                toast.error(`Email address already in use.`);
                break;
              case "auth/invalid-email":
                toast.error(`Email address is invalid.`);
                break;
              case "auth/operation-not-allowed":
                toast.error(`Error during sign up.`);
                break;
              case "auth/weak-password":
                toast.error(
                  "Password is not strong enough. Add additional characters including special characters and numbers.",
                );
                break;
              default:
                toast.error(error.message.replaceAll("Firebase: ", ""));

                break;
            }
            setLoading(false);
          });
      } else {
        toast.error(massage);
        setLoading(false);
      }
    }
  };
  const setValue = (name: string, data: string | number) => {
    dispatch({ type: "SET_FIELD", name, data });
  };

  useEffect(() => {
    if (!loading && userAuth) {
      Router.push("/club/verify");
    }
  }, [userAuth, loading]);

  useEffect(() => {
    getConfig()
      .then((config: any) => {
        if (!config.registration_status) {
          Router.push("/club/registration-closed");
        } else {
          setConfigLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);

        toast.error("Aww Snap!");
      });
  }, [Router]);

  return (
    <div className="mt-[81px] grid w-screen place-items-center bg-[url(/image/club/lbg.jpg)] bg-cover bg-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex w-full flex-col bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0 lg:flex-row">
        {configLoading ? (
          <div className="grid h-[80vh] w-full place-items-center">
            <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <img
              alt="login"
              className={
                "my-5 ml-5 mr-0 hidden w-[40%] flex-1 rounded-xl object-contain lg:block"
              }
              src="/image/club/login.svg"
              width={400}
              height={400}
            />
            <form
              className="grid w-full flex-1 grid-cols-1 gap-5 p-5 sm:p-12"
              onSubmit={handleSubmit}
            >
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
                agreeing, to our terms and conditions.
              </p>

              {isNDCStudent && (
                <p className="rounded-xl bg-yellow-100 p-5 text-yellow-950">
                  <b className="flex items-center gap-1">
                    {" "}
                    <CiWarning />
                    Notice:
                  </b>
                  All Batch '26 Students are requested to create a Non-member
                  Account right now as all of your Club Forms haven't been
                  submitted yet. After we announce, you can enter your Roll in
                  your profile and it will be converted to a Member account
                  automatically.
                </p>
              )}
              <div className="my-2 flex items-center gap-4">
                {/* <label className="ml-2 font-medium text-gray-500 disabled:text-gray-200">
                Membership Satus:
              </label> */}
                <div className="flex w-full gap-1 rounded-xl border border-gray-200 p-1 text-small">
                  <button
                    onClick={() => setIsNDCStudent(true)}
                    type="button"
                    className={
                      (isNDCStudent
                        ? "bg-primary text-white"
                        : "hover:bg-zinc-200 active:bg-zinc-400") +
                      " w-[123px] flex-1 rounded-lg px-4 py-3 transition"
                    }
                  >
                    Club Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNDCStudent(false)}
                    className={
                      (!isNDCStudent
                        ? "bg-primary text-white"
                        : "hover:bg-zinc-200 active:bg-zinc-400") +
                      " w-[123px] flex-1 rounded-lg px-4 py-3 transition"
                    }
                  >
                    Non-Member
                  </button>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {/* Non-Member Fields */}
                {!isNDCStudent ? (
                  <>
                    <Field
                      state={regData.name}
                      setValue={setValue}
                      name="name"
                      label="Full Name"
                      type="text"
                    />
                    <PassingYear
                      state={regData.class}
                      setValue={setValue}
                      name="class"
                      label="HSC Passing Year"
                      type="number"
                      editable={true}
                    />
                    <Field
                      state={regData.institution}
                      setValue={setValue}
                      name="institution"
                      label="Institution"
                      type="text"
                    />
                    <Field
                      state={regData.mobile}
                      setValue={setValue}
                      name="mobile"
                      label="Mobile No."
                      type="tel"
                    />
                    <Field
                      state={regData.address}
                      setValue={setValue}
                      name="address"
                      label="Present Address"
                      type="text"
                    />
                  </>
                ) : null}
                {/* Member Fields */}
                {isNDCStudent ? (
                  <Field
                    notRequired={!isNDCStudent}
                    editable={isNDCStudent}
                    state={regData.ndc_id}
                    setValue={setValue}
                    name="ndc_id"
                    label="NDC Roll"
                    type="text"
                  />
                ) : null}
                {/* Common Fields */}
                <Field
                  state={regData.email}
                  setValue={setValue}
                  name="email"
                  label="E-mail"
                  type="email"
                />
                <Field
                  state={regData.fbLink}
                  setValue={setValue}
                  name="fbLink"
                  label="Facebook"
                  type="text"
                  notRequired
                />
                <br></br>
                <Field
                  state={password}
                  setValue={(name, data) => setPassword(String(data))}
                  name="Password"
                  label="Password"
                  type="password"
                />{" "}
                <Field
                  state={confirmPassword}
                  setValue={(name, data) => setConfirmPassword(String(data))}
                  name="Confirm Password"
                  label="Confirm Password"
                  type="password"
                />
              </div>

              <button
                style={{
                  pointerEvents: rloading ? "none" : "auto",
                }}
                className="mb-4 mt-6 w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {rloading ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

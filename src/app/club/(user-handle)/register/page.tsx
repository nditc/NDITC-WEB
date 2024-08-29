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
import { useAuthContext } from "@/app/club/Components/Layout/AuthContextProvider";

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
                  timestamp: serverTimestamp(),
                  imageUrl:
                    "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86",
                });
                await sendEmailVerification(userInfo.user);
                toast.success(
                  "Email verification link sent! Please verify your email please.",
                );
                setLoading(false);
                Router.push("/club/profile");
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
              imageUrl:
                "https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86",
            });
            await sendEmailVerification(userInfo.user);
            toast.success(
              "Email verification link sent! Please verify your email please.",
            );
            setLoading(false);
            Router.push("/club/profile");
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
      Router.push("/club/profile");
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
    <div className="bg-image mt-[81px] grid w-screen place-items-center shadow-lg shadow-secondary md:min-h-[calc(100vh_-_81px)]">
      <div className="container-login flex w-full bg-white pb-8 pt-3 sm:my-16 sm:rounded-xl sm:py-0">
        {configLoading ? (
          <div className="grid h-[80vh] w-full place-items-center">
            <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
          </div>
        ) : (
          <form
            className="grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
            onSubmit={handleSubmit}
          >
            <AiOutlineUserAdd className="h-12 w-12 text-primary" />
            <h1 className="text-4xl">
              <span className="text-primary">Registration</span> Form
            </h1>
            <p>
              Please fill out the form below to secure your spot in the contest.
              We can’t wait to see what you’ll bring to the table!{" "}
              <Link
                className="inline border-b-2 border-transparent font-medium text-primary hover:border-primary"
                href="/club/login"
              >
                Login Instead
              </Link>{" "}
              if you have already registered. By filling out this form you are
              agreeing, to our terms and conditions.
            </p>
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
              <Field
                state={regData.name}
                setValue={setValue}
                name="name"
                label="Full Name"
                type="text"
              />
              <Select
                selected={regData.class}
                values={classes}
                setValue={setValue}
                name="class"
                label="Class"
              />
              <Field
                state={regData.institution}
                setValue={setValue}
                name="institution"
                label="Institution"
                type="text"
              />
              <Field
                state={regData.email}
                setValue={setValue}
                name="email"
                label="E-mail"
                type="email"
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
              <Checkbox
                size="lg"
                isSelected={isNDCStudent}
                onValueChange={setIsNDCStudent}
              >
                <label className="text-2xl font-medium text-gray-900">
                  <span className="text-primary">NDITC</span> Member (Checkbox)
                </label>
              </Checkbox>
              <Field
                notRequired={!isNDCStudent}
                editable={isNDCStudent}
                state={regData.ndc_id}
                setValue={setValue}
                name="ndc_id"
                label="NDC Roll"
                type="text"
              />
              <Field
                state={regData.fbLink}
                setValue={setValue}
                name="fbLink"
                label="Facebook Profile Link"
                type="text"
                notRequired
              />
              <Field
                state={regData.codeforcesHandle}
                setValue={setValue}
                name="codeforcesHandle"
                label="Codeforces Handle"
                type="text"
                notRequired
              />{" "}
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
            <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
              <button
                style={{
                  pointerEvents: rloading ? "none" : "auto",
                }}
                className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {rloading ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;

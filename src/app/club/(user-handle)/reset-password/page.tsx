'use client';

import Field from '@/Components/Field';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/config/firebase';

import {
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { toast } from 'react-toastify';
import { CgArrowLeft, CgSpinner } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, DocumentReference, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        auth.signOut();
        toast.success('Reset password link sent to you email. Reset Password then login again.');
        Router.push('/login');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error(`Email address already in use.`);
            break;
          case 'auth/invalid-email':
            toast.error(`Email address is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            toast.error(`Error during sign up.`);
            break;
          default:
            toast.error(error.message.replaceAll('Firebase: ', ''));

            break;
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);
  return (
    <div className="w-screen shadow-lg  shadow-secondary mt-[81px] bg-image md:min-h-[calc(100vh_-_81px)] grid place-items-center">
      <div className="container-login w-full bg-white sm:rounded-xl flex pt-3 pb-8 sm:py-0 sm:my-16 min-h-[calc(100vh_-_81px)] md:min-h-[70vh]">
        <form
          className="flex flex-col grid-cols-1 gap-5 w-full lg:w-1/2 p-5 sm:p-12 justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between text-sm md:text-base">
            <button
              type="button"
              className="text-primary font-medium border-b-2 border-transparent hover:border-primary ml-2 flex gap-2 items-center"
              onClick={() => Router.back()}
            >
              <CgArrowLeft /> Go Back
            </button>
          </div>
          <h1 className="text-4xl">
            PASSWORD <span className="text-primary">RESET</span>
          </h1>
          <p className="text-base">
            Get password reset link to reset your password. Then login again.
          </p>
          <div className="flex flex-col gap-5 w-full">
            <Field
              state={email}
              setValue={(name, data) => setEmail(String(data))}
              name="email"
              label="E-mail"
              type="email"
            />
            <div className="justify-self-end w-full md:w-auto">
              <button
                style={{
                  pointerEvents: loading ? 'none' : 'auto',
                }}
                className="bg-primary rounded-xl text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {loading ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                ) : (
                  'Send Password Reset Link'
                )}
              </button>
            </div>
          </div>
        </form>
        <Image
          alt="login"
          className={'hidden lg:block w-1/2 rounded-xl object-cover m-5'}
          src="/Images/reg_banner.png"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;

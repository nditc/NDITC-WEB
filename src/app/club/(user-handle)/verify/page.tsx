'use client';

import Field from '@/Components/Field';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/config/firebase';

import {
  deleteUser,
  reauthenticateWithPopup,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { toast } from 'react-toastify';
import { CgArrowLeft, CgArrowRight, CgSpinner } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, DocumentReference, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const Router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success('Verfication Email Sent! Verify and Login.');
      } catch (err) {
        console.error(err);
        toast.error('Aww! Snap!');
      }
    } else {
      toast.error('User not signed in!');
    }
    setLoading(false);
  };
  const deleteAccount = async (event: any) => {
    event.preventDefault();
    setLoading2(true);
    try {
      if (user) {
        await deleteUser(user);
        toast.info(`Please register again.`);
        Router.push('/register');
      }
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'auth/requires-recent-login') {
        toast.error(`Login expired. Please register/login again.`);
        auth.signOut();
        Router.push('/register');
      } else {
        setLoading2(false);
        toast.error('Aww! Snap!');
      }
    }
  };
  useEffect(() => {
    if (user && user.emailVerified) {
      Router.push('/profile');
    } else if (!user && !loading2) {
      Router.push('/login');
    }
    const x = setInterval(() => {
      auth.currentUser?.reload();
    }, 3000);

    return () => {
      clearInterval(x);
    };
  }, [user, Router, loading2]);
  return (
    <div className="w-screen shadow-lg  shadow-secondary mt-[81px] bg-image md:min-h-[calc(100vh_-_81px)] grid place-items-center">
      <div className="container-login w-full bg-white sm:rounded-xl flex pt-3 pb-8 sm:py-0 sm:my-16 min-h-[calc(100vh_-_81px)] md:min-h-[70vh]">
        <div className="flex flex-col order-2 grid-cols-1 gap-5 w-full lg:w-1/2 p-5 sm:p-12 justify-center">
          <h1 className="text-4xl">
            ACCOUNT <span className="text-primary">VERIFICATION</span>
          </h1>
          <p className="text-base">
            Please verify your account. An email has been sent to {user?.email}. Don&apos;t forget
            to check you spam.
          </p>
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full h-full">
              <button
                style={{
                  pointerEvents: loading ? 'none' : 'auto',
                }}
                className="bg-primary block text-center rounded-xl text-white  w-full text-lg py-2 px-8 transition-all  hover:bg-secondary_light hover:text-primary"
                onClick={() => window.location.replace('/profile')}
              >
                I&apos;m Verified!
              </button>
            </div>
            <div className=" w-full h-full">
              <button
                type="button"
                style={{
                  pointerEvents: loading ? 'none' : 'auto',
                }}
                className="bg-primary rounded-xl  text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                onClick={handleSubmit}
              >
                {loading ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                ) : (
                  'Re-send Verification Link'
                )}
              </button>
            </div>
            <div className=" w-full h-full">
              <button
                type="button"
                style={{
                  pointerEvents: loading ? 'none' : 'auto',
                }}
                className="bg-primary rounded-xl  text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                onClick={deleteAccount}
              >
                {loading2 ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                ) : (
                  'Incorrect Address? Register Again'
                )}
              </button>
            </div>
          </div>
        </div>
        <Image
          alt="login"
          className={'hidden object-cover lg:block w-1/2 rounded-xl m-5 order-1'}
          src="/Images/reg_banner.png"
          width={512}
          height={512}
        />
      </div>
    </div>
  );
};

export default Page;

import React, { FormEvent, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { auth } from '@/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { PiGearBold } from 'react-icons/pi';
import { setConfig, getConfig, setConfigAll } from '@/config/config_db';

const EditConfig = () => {
  const [configs, setConfigs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userAuth] = useAuthState(auth);
  useEffect(() => {
    getConfig()
      .then((config: any) => {
        setConfigs(config);
      })
      .catch((err) => {
        console.error(err);

        toast.error('Aww Snap!');
      });
  }, []);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (userAuth) {
      try {
        await setConfigAll(configs);
        toast.success('Config Updated');
      } catch (err) {
        console.error(err);

        toast.error('Aww Snap!');
      }
    }
    setLoading(false);
  };
  console.log(configs);
  return (
    <div className="container w-full bg-white rounded-xl flex pt-3 pb-8 mb-4 sm:py-0 sm:mt-8">
      <form className="grid grid-cols-1 gap-5 w-full p-5 sm:p-12" onSubmit={submitHandler}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <PiGearBold className="w-12 h-12 text-primary" />
            <h1 className="text-4xl">
              <span className="text-primary">EDIT</span> CONFIG
            </h1>
          </div>
        </div>
        <p>Click on Edit to edit your information.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="flex flex-col gap-2">
            {configs &&
              Array.from(Object.entries(configs)).map((arr, index) => {
                return (
                  <div className="flex items-center gap-2" key={index}>
                    <input
                      className="w-4 h-4 cursor-pointer  accent-primary"
                      name={arr[0]}
                      type="checkbox"
                      checked={Boolean(configs[arr[0]])}
                      key={index}
                      onChange={(e) => {
                        setConfigs((s: any) => {
                          return { ...s, [arr[0]]: e.target.checked };
                        });
                      }}
                    />
                    <label htmlFor={arr[0]}>
                      {' '}
                      {arr[0].replaceAll('_', ' ')}:{' '}
                      <span
                        className={`${
                          !configs[arr[0]] ? 'text-red-500' : 'text-primary'
                        } font-bold`}
                      >
                        {String(configs[arr[0]])}
                      </span>
                    </label>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="justify-self-end w-full md:w-auto py-3 md:py-0">
          <button
            style={{
              pointerEvents: loading ? 'none' : 'auto',
            }}
            className="bg-primary rounded-xl text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
            type="submit"
          >
            {loading ? <CgSpinner className="w-7 h-7 animate-spin text-white" /> : 'Update Config'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditConfig;

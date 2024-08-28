import { auth, db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaTimes } from 'react-icons/fa';
import { IoCheckmarkDone } from 'react-icons/io5';
import { LiaTimesSolid } from 'react-icons/lia';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import nthNumber from '@/util/nthNumber';
import { GrTrophy } from 'react-icons/gr';
import { AiFillCode } from 'react-icons/ai';
import { getConfig } from '@/config/config_db';

const ContestCard = () => {
  const [preResult, setPreResult] = useState<null | any>(null);
  const [finalResult, setFinalResult] = useState<null | any>(null);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    const func = async () => {
      if (user?.uid) {
        try {
          const config = await getConfig();
          const pre = await getDoc(doc(db, 'pre_result', user.uid));
          const final = await getDoc(doc(db, 'final_result', user.uid));
          setPreResult(pre.exists() && config?.pre_result_published ? pre.data() : null);
          setFinalResult(
            final.exists() && config?.final_result_published && config?.pre_result_published
              ? final.data()
              : null
          );
        } catch (err) {
          toast.error('Result Cannot be Loaded!');
        }
      }
    };
    func();
  }, [user]);
  return (
    <div className="flex-1 p-4 md:p-6  xl:ml-16 rounded-xl items-center justify-center shadow-sm  bg-secondary_lightest text-primary_dark">
      {/* Contest Details Coming Soon */}
      <h1 className="text-3xl mb-5 text-center ">
        <AiFillCode className="w-8 h-8 inline mr-1 text-secondary_light" />
        YOU IN <span className="text-secondary">CONTEST</span>
      </h1>
      {}
      {preResult ? (
        <div className="w-full flex gap-3 items-center flex-col md:flex-row  justify-center md:justify-between">
          <h1 className="text-xl text-secondary Nunito font-bold w-32">Preliminary</h1>
          <div className=" flex gap-3 items-center">
            <div
              className={
                'w-32 md:w-36 py-2 px-4 flex md:text-lg  items-center text-white gap-1 rounded-lg  font-bold shadow-sm ' +
                (preResult.selected ? 'bg-secondary' : 'bg-rose-500')
              }
            >
              {preResult.selected ? (
                <>
                  <IoCheckmarkDone className="w-6 h-6 mr-1 text-secondary_lighter" />
                  {'Selected'}
                </>
              ) : (
                <>
                  <FaTimes className="w-5 h-5 mr-1 text-rose-200" />
                  {'Eliminated'}
                </>
              )}
            </div>
            <div
              className={
                'w-32 md:w-36 py-2 px-4 flex md:text-lg  shadow-sm justify-between items-center text-secondary bg-white gap-1 rounded-lg  font-bold '
              }
            >
              <span className="text-black font-medium">Rank:</span>
              {nthNumber(preResult.ranking)}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-3 items-center mt-3 flex-col md:flex-row  justify-center md:justify-between">
          <h1 className="text-xl text-secondary Nunito font-bold md:w-32">Preliminary</h1>
          <div
            className={
              'py-2 px-4 flex md:text-lg  justify-between items-center text-green-500 bg-secondary_lighter gap-1 rounded-lg  font-bold '
            }
          >
            <span className=" font-medium">Not Published</span>
          </div>
        </div>
      )}
      {finalResult ? (
        <div className="w-full flex gap-3 items-center mt-3 flex-col md:flex-row  justify-center md:justify-between">
          <h1 className="text-xl text-secondary Nunito font-bold md:w-32">Final</h1>
          <div className=" flex gap-3 items-center">
            <div
              className={
                'w-32 md:w-36 py-2 px-4 flex md:text-lg  items-center text-white gap-1 rounded-lg  font-bold shadow-sm ' +
                (finalResult.participated ? 'bg-secondary' : 'bg-rose-500')
              }
            >
              {finalResult.participated ? (
                <>
                  <GrTrophy className="w-6 h-6 mr-1 text-secondary_lighter" />
                  {'Won'}
                </>
              ) : (
                <>
                  <FaTimes className="w-5 h-5 mr-1 text-rose-200" />
                  {'Absent'}
                </>
              )}
            </div>
            <div
              className={
                'w-32 md:w-36 py-2 px-4 flex md:text-lg  shadow-sm justify-between items-center text-secondary bg-white gap-1 rounded-lg  font-bold '
              }
            >
              <span className="text-black font-medium">Rank:</span>
              {nthNumber(finalResult.ranking)}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-3 items-center mt-3 flex-col md:flex-row  justify-center md:justify-between">
          <h1 className="text-xl text-secondary Nunito font-bold md:w-32">Final</h1>
          <div
            className={
              'py-2 px-4 flex md:text-lg  justify-between items-center text-green-500 bg-secondary_lighter gap-1 rounded-lg  font-bold '
            }
          >
            <span className=" font-medium">Not Published</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestCard;

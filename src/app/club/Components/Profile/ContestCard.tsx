import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaTimes } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { toast } from "react-toastify";
import nthNumber from "@/util/nthNumber";
import { GrTrophy } from "react-icons/gr";
import { AiFillCode } from "react-icons/ai";
import { getConfig } from "@/config/config_db";

const ContestCard = () => {
  const [preResult, setPreResult] = useState<null | any>(null);
  const [finalResult, setFinalResult] = useState<null | any>(null);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    const func = async () => {
      if (user?.uid) {
        try {
          const config = await getConfig();
          const pre = await getDoc(doc(db, "pre_result", user.uid));
          const final = await getDoc(doc(db, "final_result", user.uid));
          setPreResult(
            pre.exists() && config?.pre_result_published ? pre.data() : null,
          );
          setFinalResult(
            final.exists() &&
              config?.final_result_published &&
              config?.pre_result_published
              ? final.data()
              : null,
          );
        } catch (err) {
          toast.error("Result Cannot be Loaded!");
        }
      }
    };
    func();
  }, [user]);
  return (
    <div className="flex-1 items-center justify-center rounded-xl bg-secondary_lightest p-4 text-primary_dark shadow-sm md:p-6 xl:ml-16">
      {/* Contest Details Coming Soon */}
      <h1 className="mb-5 text-center text-3xl">
        <AiFillCode className="mr-1 inline h-8 w-8 text-secondary_light" />
        YOU IN <span className="text-secondary">CONTEST</span>
      </h1>
      {}
      {preResult ? (
        <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
          <h1 className="Nunito w-32 text-xl font-bold text-secondary">
            Preliminary
          </h1>
          <div className="flex items-center gap-3">
            <div
              className={
                "flex w-32 items-center gap-1 rounded-lg px-4 py-2 font-bold text-white shadow-sm md:w-36 md:text-lg " +
                (preResult.selected ? "bg-secondary" : "bg-rose-500")
              }
            >
              {preResult.selected ? (
                <>
                  <IoCheckmarkDone className="mr-1 h-6 w-6 text-secondary_lighter" />
                  {"Selected"}
                </>
              ) : (
                <>
                  <FaTimes className="mr-1 h-5 w-5 text-rose-200" />
                  {"Eliminated"}
                </>
              )}
            </div>
            <div
              className={
                "flex w-32 items-center justify-between gap-1 rounded-lg bg-white px-4 py-2 font-bold text-secondary shadow-sm md:w-36 md:text-lg"
              }
            >
              <span className="font-medium text-black">Rank:</span>
              {nthNumber(preResult.ranking)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
          <h1 className="Nunito text-xl font-bold text-secondary md:w-32">
            Preliminary
          </h1>
          <div
            className={
              "flex items-center justify-between gap-1 rounded-lg bg-secondary_lighter px-4 py-2 font-bold text-green-500 md:text-lg"
            }
          >
            <span className="font-medium">Not Published</span>
          </div>
        </div>
      )}
      {finalResult ? (
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
          <h1 className="Nunito text-xl font-bold text-secondary md:w-32">
            Final
          </h1>
          <div className="flex items-center gap-3">
            <div
              className={
                "flex w-32 items-center gap-1 rounded-lg px-4 py-2 font-bold text-white shadow-sm md:w-36 md:text-lg " +
                (finalResult.participated ? "bg-secondary" : "bg-rose-500")
              }
            >
              {finalResult.participated ? (
                <>
                  <GrTrophy className="mr-1 h-6 w-6 text-secondary_lighter" />
                  {"Won"}
                </>
              ) : (
                <>
                  <FaTimes className="mr-1 h-5 w-5 text-rose-200" />
                  {"Absent"}
                </>
              )}
            </div>
            <div
              className={
                "flex w-32 items-center justify-between gap-1 rounded-lg bg-white px-4 py-2 font-bold text-secondary shadow-sm md:w-36 md:text-lg"
              }
            >
              <span className="font-medium text-black">Rank:</span>
              {nthNumber(finalResult.ranking)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
          <h1 className="Nunito text-xl font-bold text-secondary md:w-32">
            Final
          </h1>
          <div
            className={
              "flex items-center justify-between gap-1 rounded-lg bg-secondary_lighter px-4 py-2 font-bold text-green-500 md:text-lg"
            }
          >
            <span className="font-medium">Not Published</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestCard;

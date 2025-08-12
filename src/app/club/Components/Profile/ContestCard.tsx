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
import { useUserDataContext } from "@/app/_context/UserDataProvider";
import { BiTrophy } from "react-icons/bi";
import { CgTrophy } from "react-icons/cg";
import { SiHtmlacademy } from "react-icons/si";
import { IoIosStats } from "react-icons/io";

const ContestCard = () => {
  const [userAuth, loading, error] = useAuthState(auth);
  const { userData } = useUserDataContext();

  const [points, setPoints] = useState(0);

  // useEffect(() => {
  //   const func = async () => {
  //     if (user?.uid) {
  //       try {
  //         const config = await getConfig();
  //         const pre = await getDoc(doc(db, "pre_result", user.uid));
  //         const final = await getDoc(doc(db, "final_result", user.uid));
  //         setPreResult(
  //           pre.exists() && config?.pre_result_published ? pre.data() : null,
  //         );
  //         setFinalResult(
  //           final.exists() &&
  //             config?.final_result_published &&
  //             config?.pre_result_published
  //             ? final.data()
  //             : null,
  //         );
  //       } catch (err) {
  //         toast.error("Result Cannot be Loaded!");
  //       }
  //     }
  //   };
  //   func();
  // }, [user]);

  useEffect(() => {
    const func = async () => {
      if (userAuth?.uid) {
        try {
          const points = await getDoc(
            doc(db, "eventparticipant", userAuth.uid),
          );

          setPoints(points.data()?.points);
        } catch (err) {
          toast.error("Result Cannot be Loaded!");
        }
      }
    };
    func();
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-end rounded-xl lg:flex-row lg:gap-8 xl:ml-16">
      {/* Contest Details Coming Soon */}
      {/* <h1 className="mb-5 text-center text-3xl">
        <AiFillCode className="mr-1 inline h-8 w-8 text-secondary_light" />
        YOU IN <span className="text-secondary">CONTEST</span>
      </h1>
      <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
        <h1 className="Inter w-32 text-xl font-bold text-secondary">
          Preliminary
        </h1>
        <div className="flex items-center gap-3">
          <div
            className={
              "flex w-32 items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-white shadow-sm md:w-36 md:text-lg"
            }
          >
            <>
              <BiTrophy className="mr-1 h-6 w-6 text-secondary_lighter" />
              {"Selected"}
            </>
          </div></div></div> */}
      <div className="flex scale-75 flex-row items-center justify-center gap-4 text-secondary xsm:scale-85 xsm:gap-8 md:scale-100 lg:justify-end">
        <div className="col-start-2 row-span-2 row-start-1 flex aspect-square h-48 w-48 flex-col items-center justify-center rounded-full bg-[conic-gradient(#60a5fa_30%,#3b82f6_75%,#d1d5db_0)]">
          <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-white text-center">
            <div className="-mt-4 flex flex-col items-center">
              <CgTrophy className="text-3xl leading-[0] text-blue-500 sm:text-4xl 2xl:text-5xl"></CgTrophy>
              <p className="Inter text-4xl font-bold text-black">
                {points || 0}
              </p>
              <p className="Inter text-sm font-semibold leading-none">
                <span className="text-black">Season</span> Points
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div
            className={
              "flex w-32 items-center justify-between gap-1 rounded-lg bg-white px-4 py-2 text-secondary shadow-sm md:w-36 md:text-lg"
            }
          >
            <span className="font-medium text-black">Rank:</span>
            {nthNumber(preResult.ranking)}
          </div> */}
    </div>
  );
};

export default ContestCard;

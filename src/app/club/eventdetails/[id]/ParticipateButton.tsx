"use client";

import Link from "next/link";
import { useUserDataContext } from "../../Components/Layout/UserDataProvider";

const ParticipateButton = ({
  id,
  intra_club,
  intra_college,
  publicQuiz,
}: {
  id: string;
  intra_club: boolean;
  intra_college: boolean;
  publicQuiz: boolean;
}) => {
  const { userData, userDataLoading, dataError } = useUserDataContext();

  if (userDataLoading) return <div />;

  if (intra_college && userData && userData.ndc_roll != "") {
    return (
      <div className="mt-2 flex flex-col flex-wrap items-start gap-2 md:flex-row md:gap-3 md:pb-5">
        <Link
          href={`club/participate/${id}`}
          target="_blank"
          className="before:ease Bebas text-whiterounded-lg border-2focus:z-10 relative flex h-full min-w-[48%] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-black px-7 py-2 text-center align-middle font-Bebas text-xl font-medium text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-white hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 focus:ring-4 focus:ring-gray-700 sm:min-w-[auto] md:flex-[0_auto]"
        >
          <span className="relative z-10">Participate</span>
        </Link>
      </div>
    );
  }

  if (intra_club && userData && userData.ndc_id != "") {
    return (
      <div className="mt-2 flex flex-col flex-wrap items-start gap-2 md:flex-row md:gap-3 md:pb-5">
        <Link
          href={`/club/participate/${id}`}
          className="before:ease Bebas text-whiterounded-lg border-2focus:z-10 relative flex h-full min-w-[48%] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-black px-7 py-2 text-center align-middle font-Bebas text-xl font-medium text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-white hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 focus:ring-4 focus:ring-gray-700 sm:min-w-[auto] md:flex-[0_auto]"
        >
          <span className="relative z-10">Participate</span>
        </Link>
      </div>
    );
  }

  if (publicQuiz && userData) {
    return (
      <div className="mt-2 flex flex-col flex-wrap items-start gap-2 md:flex-row md:gap-3 md:pb-5">
        <Link
          href={`club/participate/${id}`}
          target="_blank"
          className="before:ease Bebas text-whiterounded-lg border-2focus:z-10 relative flex h-full min-w-[48%] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-black px-7 py-2 text-center align-middle font-Bebas text-xl font-medium text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-white hover:shadow-blue-500 hover:before:h-[29rem] hover:before:-translate-y-44 focus:ring-4 focus:ring-gray-700 sm:min-w-[auto] md:flex-[0_auto]"
        >
          <span className="relative z-10">Participate</span>
        </Link>
      </div>
    );
  }

  return <div />;
};

export default ParticipateButton;

"use client";

import { useUserDataContext } from "@/app/_context/UserDataProvider";
const Eligibility = ({
  intra_club,
  intra_college,
  publicQuiz,
}: {
  intra_club: boolean;
  intra_college: boolean;
  publicQuiz: boolean;
}) => {
  const { userData, userDataLoading, dataError } = useUserDataContext();
  if (intra_college && userData && userData.ndc_roll != "") return <div />;
  if (intra_club && userData && userData.ndc_id != "") return <div />;
  if (publicQuiz && userData) return <div />;

  if (!userData) {
    return (
      <div className="text-lg font-bold text-black">
        Please login to participate
      </div>
    );
  }

  return (
    <div className="text-lg font-bold text-black">
      You are not eligible for this exam
    </div>
  );
};

export default Eligibility;

"use client";
import { useUserDataContext } from "@/app/club/Components/Layout/UserDataProvider";
import ClubInfo from "@/app/club/Components/Profile/ClubInfo";
import { auth } from "@/config/firebase";

const Page = () => {
  const { userData, userDataLoading, dataError, updateUserData } =
    useUserDataContext();

  return (
    <div>
      {userData && !userDataLoading ? (
        <ClubInfo
          ndc_roll={userData?.ndc_roll}
          ndc_id={userData?.ndc_id}
          email={auth.currentUser?.email || ""}
          uid={auth.currentUser?.uid || ""}
          updateUserData={updateUserData}
        />
      ) : null}
    </div>
  );
};

export default Page;

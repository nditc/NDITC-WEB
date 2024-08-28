import { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const getRegisteredNDC = async (ndc_id: string) => {
  const res = await fetch("/api/memberdata", {
    method: "POST",
    body: JSON.stringify({ ndc_id: ndc_id }),
  });

  return res;
};

const getConnectToNDITC = async (ndc_id: string, email: string) => {
  const res = await fetch("/api/createaccountndc", {
    method: "POST",
    body: JSON.stringify({ ndc_id: ndc_id, email: email }),
  });

  return res;
};

const ClubInfo = ({
  ndc_id,
  email,
  uid,
}: {
  ndc_id: any;
  email: string;
  uid: string;
}) => {
  const [memberData, setMemberData] = useState<any>();

  const [roll, setRoll] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ndc_id != "") {
      getRegisteredNDC(ndc_id)
        .then((r) => r.json())
        .then((resp) => {
          setMemberData(resp);
        })
        .catch(() => {
          toast.error("You are not a member of NDITC!");
          updateDoc(doc(db, "participants", uid), { ndc_id: "" });
        });
    }
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const docRes = await getConnectToNDITC(roll, email);

    if (!docRes.ok) {
      toast.error("Invalid Request Bruh");
      setLoading(false);
    } else {
      const memberID = await docRes.json();
      if (memberID.success) {
        await updateDoc(doc(db, "participants", uid), {
          ndc_id: memberID.memberID,
        }).then(() => {
          setLoading(false);
          location.reload();
        });
      }
    }
  };

  return (
    <div className="container mb-4 flex w-full rounded-xl bg-white pb-8 pt-3 sm:mt-8 sm:py-0">
      {ndc_id == "" ? (
        <form
          onSubmit={onSubmit}
          className="grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <PiStudentFill className="h-12 w-12 text-primary" />
              <h1 className="text-4xl">
                <span className="text-primary">{"CONNECT"}</span>
                {" TO NDITC"}
              </h1>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-5">
            <div className="flex flex-col gap-1">
              <label
                className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
                htmlFor={"roll"}
              >
                NDC Roll:
              </label>
              <input
                className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
                onChange={(e) => setRoll(e.currentTarget.value)}
                value={roll}
                name={"roll"}
                placeholder={"#####"}
              />
            </div>

            <div className="">
              <button
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="flex w-full items-center justify-center rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {loading ? (
                  <CgSpinner className="h-7 w-7 animate-spin text-white" />
                ) : (
                  "Connect to NDITC"
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div
          onSubmit={onSubmit}
          className="grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <PiStudentFill className="h-12 w-12 text-primary" />
              <h1 className="text-4xl">
                <span className="text-primary">{"NDITC"}</span>
                {" INFORMATION"}
              </h1>
            </div>
          </div>
          {memberData && (
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
              <Info label="Name" info={memberData?.name} />

              <Info label="Passing Year" info={memberData?.year} />

              <Info
                label="Admission Serial"
                info={memberData?.admission_serial}
              />

              <Info label="College Roll" info={memberData?.college_roll} />

              <Info label="Serial Number" info={memberData?.serial} />

              <Info label="Contact Number" info={memberData?.contact_number} />

              <Info label="Transaction ID" info={memberData?.transection_id} />

              <Info label="Father's Name" info={memberData?.father} />

              <Info label="Mother's Name" info={memberData?.mother} />

              <Info
                label="Present Address"
                info={memberData?.present_address}
              />

              <Info
                label="Permanent Address"
                info={memberData?.permanent_address}
              />

              <Info label="Blood Group" info={memberData?.blood_group} />

              <Info
                label="Institutional Background"
                info={memberData?.institutional_background}
              />

              <Info
                label="Background Club Activities"
                info={memberData?.background_club_Activities}
              />

              <Info label="Competitions" info={memberData?.competitions} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubInfo;

const Info = ({ label, info }: { label: string; info: string }) => {
  return (
    <div className="rounded-xl border border-gray-200 px-4 py-2">
      <span className="font-bold">{`${label}: `}</span>
      {info}
    </div>
  );
};

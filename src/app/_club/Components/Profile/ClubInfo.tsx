import { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { CiCircleInfo, CiWarning } from "react-icons/ci";
import Loading from "../Loading";
import { Checkbox } from "@nextui-org/checkbox";
import { useAuthContext } from "@/app/_context/AuthContextProvider";

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
  ndc_roll,
  email,
  uid,
  updateUserData,
}: {
  ndc_id: any;
  ndc_roll: any;
  email: string;
  uid: string;
  updateUserData: Function;
}) => {
  const [memberData, setMemberData] = useState<any>();

  const [roll, setRoll] = useState(ndc_roll || "");
  const [loading, setLoading] = useState(false);

  const [asMember, setAsMember] = useState(false);

  const userAuth = useAuthContext().userAuth;
  const userLoading = useAuthContext().loading;

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

  const [editing, setEditing] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (roll == "") {
      toast.error("Roll can't be empty");
      return;
    }

    setLoading(true);

    if (asMember) {
      const docRes = await getConnectToNDITC(roll, email);

      if (!docRes.ok) {
        toast.error("Invalid Roll or Email.");
        setLoading(false);
      } else {
        const memberID = await docRes.json();

        if (memberID.success) {
          const fields: any = {};

          if (memberID.year) {
            fields["class"] = memberID.year;
          }

          await updateDoc(doc(db, "participants", uid), {
            ndc_id: memberID.memberID,
            name: memberID.name,
            ...fields,
          }).then(() => {
            //setLoading(false);
            location.reload();
          });
        }
      }
    } else {
      if (userAuth && !userLoading) {
        try {
          await updateDoc(doc(db, "participants", userAuth.uid), {
            ndc_roll: roll,
          });

          toast.success("NDC Roll Updated!");
          updateUserData();
          setEditing(false);
          setLoading(false);
        } catch (err) {
          console.error(err);

          toast.error("Aww Snap!");
        }
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
          {asMember ? (
            <p className="rounded-xl bg-yellow-100 p-5 text-yellow-950">
              <b className="flex items-center gap-1">
                {" "}
                <CiWarning />
                Warning:
              </b>
              You can only connect if you are a member of NDITC and submitted
              your membership form in college. Batch '26 can't connect yet cause
              we don't have your form data yet. So, keep the Member Checkmark
              unticked
            </p>
          ) : (
            <p className="rounded-xl bg-yellow-100 p-5 text-yellow-950">
              <b className="flex items-center gap-1">
                {" "}
                <CiWarning />
                Warning:
              </b>
              This section is for only Notre Dame College students. Enter your
              correct college permanent roll. Otherwise your account may get
              banned.
            </p>
          )}
          <div className="grid w-full grid-cols-1 gap-5">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <Checkbox
                  isSelected={asMember}
                  onValueChange={setAsMember}
                  className="pb-5"
                  size="lg"
                >
                  NDITC Member ?
                </Checkbox>

                {!asMember && ndc_roll && ndc_roll != "" && (
                  <Checkbox
                    isSelected={editing}
                    onValueChange={setEditing}
                    className="pb-5"
                    size="lg"
                  >
                    Edit Data
                  </Checkbox>
                )}
              </div>

              <label
                className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
                htmlFor={"roll"}
              >
                NDC Roll:
              </label>
              <input
                disabled={!asMember && ndc_roll && ndc_roll != "" && !editing}
                className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
                onChange={(e) => setRoll(e.currentTarget.value)}
                value={roll}
                name={"roll"}
                placeholder={"#####"}
              />
            </div>

            <div className="">
              <button
                disabled={
                  !asMember && ndc_roll != null && ndc_roll != "" && !editing
                }
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="flex w-full items-center justify-center rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary disabled:bg-secondary_light"
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
          <p className="rounded-xl bg-zinc-100 p-5 text-zinc-950">
            <b className="flex items-center gap-1">
              {" "}
              <CiCircleInfo />
              Info:
            </b>
            The information submitted in the membership forms is displayed here
            and cannot be edited. If you need to make changes, please contact
            the panelists.
          </p>
          {memberData ? (
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
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
          ) : (
            <Loading height="50vh" />
          )}
        </div>
      )}
    </div>
  );
};

export default ClubInfo;

const Info = ({ label, info }: { label: string; info: string }) => {
  return (
    <div className="rounded-xl border border-gray-200 px-5 py-3 text-gray-700">
      <span className="text-sm font-medium text-gray-500">{`${label}: `}</span>
      <br></br>
      {info === "" ? "-" : info}
    </div>
  );
};

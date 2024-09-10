import { FormEvent, useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import Field from "@/app/club/Components/Field";
import Select from "@/app/club/Components/Select";
import { FiUser } from "react-icons/fi";
import { classes, regDataType } from "@/config/registerData";
import { LiaTimesSolid } from "react-icons/lia";
import { CgSpinner } from "react-icons/cg";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import PassingYear from "../PassingYear";
import { useUserDataContext } from "../Layout/UserDataProvider";

interface props {
  userData: any;
  setUserData: React.Dispatch<any>;
}

const EditData = ({ userData, setUserData }: props) => {
  const [editUserData, setEditUserData] = useState<any>(userData);
  const [editin, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userAuth] = useAuthState(auth);
  const { updateUserData } = useUserDataContext();
  const setValue = (fname: string, value: string | number) => {
    setEditUserData((s: regDataType) => ({ ...s, [fname]: value }));
  };
  useEffect(() => {
    setEditUserData(userData);
  }, [userData]);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (userAuth) {
      try {
        await updateDoc(doc(db, "participants", userAuth.uid), editUserData);

        setUserData(editUserData);
        toast.success("Data Updated!");
        updateUserData();
        setEditing(false);
      } catch (err) {
        console.error(err);

        toast.error("Aww Snap!");
      }
    }
    setLoading(false);
  };
  return (
    <div className="container mb-4 flex w-full rounded-xl bg-white pb-8 pt-3 sm:mt-8 sm:py-0">
      {editUserData ? (
        <form
          className="grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
          onSubmit={submitHandler}
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <FiUser className="h-12 w-12 text-primary" />
              <h1 className="text-4xl">
                <span className="text-primary">USER</span> DATA
              </h1>
            </div>
            <div>
              {editin ? (
                <button
                  type={"button"}
                  onClick={() => {
                    setEditing(false);
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary_light px-5 py-2 text-sm leading-[1.15] text-primary_dark shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
                >
                  <LiaTimesSolid className="h-6 w-6" />
                  Stop Editing
                </button>
              ) : (
                <button
                  type={"button"}
                  onClick={() => {
                    setEditing(true);
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
                >
                  <FaRegEdit className="h-6 w-6" />
                  Edit Data
                </button>
              )}
            </div>
          </div>
          <p>Click on Edit to edit your information.</p>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            {!userData.ndc_id ? (
              <>
                {" "}
                <Field
                  state={editUserData.name}
                  setValue={setValue}
                  name="name"
                  label="Full Name"
                  type="text"
                  editable={editin}
                />
                <PassingYear
                  state={editUserData.class}
                  setValue={setValue}
                  name="class"
                  label="HSC Passing Year"
                  type="number"
                  editable={editin}
                />
                <Field
                  state={editUserData.institution}
                  setValue={setValue}
                  name="institution"
                  label="Institution"
                  type="text"
                  editable={editin}
                />
              </>
            ) : null}
            <Field
              state={editUserData.mobile}
              setValue={setValue}
              name="mobile"
              label="Mobile No."
              type="tel"
              editable={editin}
            />
            <Field
              state={editUserData.address}
              setValue={setValue}
              name="address"
              label="Present Address"
              type="text"
              editable={editin}
            />
            <Field
              state={editUserData.fbLink}
              setValue={setValue}
              name="fbLink"
              label="Facebook Profile Link"
              type="text"
              editable={editin}
              notRequired
            />
            <Field
              state={editUserData.codeforcesHandle}
              setValue={setValue}
              name="codeforcesHandle"
              label="Codeforces Handle"
              type="text"
              editable={editin}
              notRequired
            />{" "}
          </div>
          {editin ? (
            <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
              <button
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                type="submit"
              >
                {loading ? (
                  <CgSpinner className="h-7 w-7 animate-spin text-white" />
                ) : (
                  "Update Data"
                )}
              </button>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default EditData;

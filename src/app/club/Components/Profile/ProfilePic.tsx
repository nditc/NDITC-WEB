/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useRef, useState } from "react";
import Modal from "@/app/club/Components/Modal";
import { CgSpinner } from "react-icons/cg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, pfp } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import fileValidator from "@/util/fileValidator";

const ProfilePic = ({
  imageUrl,
  setImage,
}: {
  imageUrl: any;
  setImage: (url: string) => void;
}) => {
  const [changeImage, setChangeImage] = useState<boolean>();
  const [newImage, setNewImage] = useState<FileList | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const FileRef = useRef<HTMLInputElement>(null);
  const changePfp = () => {
    if (user?.uid && newImage) {
      setLoading(true);
      const storeRef = ref(pfp, "pfp/" + user.uid);
      uploadBytes(storeRef, newImage[0])
        .then(async (snapshot) => {
          const url = await getDownloadURL(storeRef);
          await updateDoc(doc(db, "participants", user.uid), { imageUrl: url });
          setImage(url);
          setLoading(false);
          setNewImage(null);
          setChangeImage(false);
          toast.success("Photo Updated!");
        })
        .catch((error) => {
          console.dir(error);

          toast.error(error.message.replaceAll("Firebase: ", ""));

          setLoading(false);
        });
    } else {
      toast.error("Something Happenned");
    }
  };
  return (
    <>
      <div
        className="group relative rounded-full text-center"
        onClick={() => {
          setChangeImage(true);
        }}
      >
        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none font-medium text-transparent group-hover:text-white">
          Click to Change
        </p>
        <Image
          className="aspect-square h-[200px] w-[200px] min-w-[200px] max-w-[200px] cursor-pointer rounded-full bg-white object-cover shadow-md transition-all group-hover:brightness-50"
          src={imageUrl}
          alt="profile-img"
          width={200}
          height={200}
        />
      </div>
      <Modal state={changeImage}>
        {changeImage ? (
          <div className="absolute left-1/2 top-1/2 max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5">
            <div className="flex justify-end">
              <button
                className="mb-5 ml-2 flex items-center gap-2 border-b-2 border-transparent text-right font-medium text-primary hover:border-primary"
                onClick={() => {
                  setChangeImage(false);
                  setNewImage(null);
                }}
              >
                <LiaTimesSolid className="h-4 w-4" />
                Close
              </button>
            </div>
            <h1 className="text-4xl">
              UPLOAD <span className="text-primary">PROFILE PICTURE</span>
            </h1>
            {newImage && newImage[0] ? (
              <img
                className="mx-auto my-2 h-[200px] w-[200px] rounded-full object-cover"
                src={URL.createObjectURL(newImage[0])}
                alt=""
              />
            ) : null}
            <input
              onChange={async (e) => {
                try {
                  await fileValidator(
                    e.target.files || [],
                    ["image/png", "image/jpeg", "image/webp"],
                    512,
                    1,
                    "File must have to be a .jpg, .png or .webp file",
                  );
                  setNewImage(e.target.files ? e.target.files : null);
                } catch (err) {
                  e.target.value = "";

                  toast.error(String(err));
                }
              }}
              className="my-5 file:mr-3 file:cursor-pointer file:rounded-lg file:border-none file:bg-primary file:px-4 file:py-2 file:text-white file:hover:bg-secondary_light file:hover:text-primary"
              ref={FileRef}
              name="pfp"
              type={"file"}
              accept=".png, .jpg, .jpeg, .webp"
            />
            <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
              <button
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                disabled={newImage && newImage[0] ? false : true}
                className="flex w-full justify-center rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary disabled:opacity-80"
                type="button"
                onClick={changePfp}
              >
                {loading ? (
                  <CgSpinner className="h-7 w-7 animate-spin text-white" />
                ) : (
                  "Update Image"
                )}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default ProfilePic;

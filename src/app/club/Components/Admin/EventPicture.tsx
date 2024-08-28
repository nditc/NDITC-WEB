/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useRef, useState } from "react";
import Modal from "@/Components/Modal";
import Field from "../Field";
import { CgSpinner } from "react-icons/cg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, pfp } from "@/config/firebase";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import fileValidator from "@/util/fileValidator";
import { doc, updateDoc } from "firebase/firestore";

const EventPicture = ({
  imageUrl,
  setImage,
  eventID,
}: {
  imageUrl: any;
  setImage: (url: string) => void;
  eventID: string;
}) => {
  const [changeImage, setChangeImage] = useState<boolean>();
  const [newImage, setNewImage] = useState<FileList | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const FileRef = useRef<HTMLInputElement>(null);
  const changeEp = () => {
    if (newImage) {
      setLoading(true);
      const storeRef = ref(pfp, "ep/" + eventID);
      uploadBytes(storeRef, newImage[0])
        .then(async (snapshot) => {
          const url = await getDownloadURL(storeRef);
          await updateDoc(doc(db, "events", eventID), { imageURL: url });
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
        className="rounded-xl relative text-center group"
        onClick={() => {
          setChangeImage(true);
        }}
      >
        <p className="absolute z-10 font-medium text-transparent  cursor-pointer select-none group-hover:text-white top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
          Click to Change
        </p>
        <Image
          className="rounded-xl group-hover:brightness-50 transition-all cursor-pointer   min-w-[384px] max-w-[384px]  object-cover w-[384px] h-[384px]  aspect-square shadow-md  bg-white"
          src={imageUrl}
          alt="profile-img"
          width={384}
          height={384}
        />
      </div>
      <Modal state={changeImage}>
        {changeImage ? (
          <div className="max-w-[95vw] rounded-xl bg-white p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-end">
              <button
                className="text-primary text-right mb-5 font-medium border-b-2 border-transparent hover:border-primary ml-2 flex gap-2 items-center"
                onClick={() => {
                  setChangeImage(false);
                  setNewImage(null);
                }}
              >
                <LiaTimesSolid className="w-4 h-4" />
                Close
              </button>
            </div>
            <h1 className="text-4xl">
              UPDATE <span className="text-primary">EVENT PICTURE</span>
            </h1>
            {newImage && newImage[0] ? (
              <img
                className="w-[384px] h-[384px] object-cover rounded-xl mx-auto my-2"
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
                    "File must have to be a .jpg, .png or .webp file"
                  );
                  setNewImage(e.target.files ? e.target.files : null);
                } catch (err) {
                  e.target.value = "";

                  toast.error(String(err));
                }
              }}
              className="my-5 file:bg-primary file:text-white file:border-none file:py-2 file:px-4  file:rounded-lg file:cursor-pointer file:mr-3 file:hover:bg-secondary_light file:hover:text-primary"
              ref={FileRef}
              name="pfp"
              type={"file"}
              accept=".png, .jpg, .jpeg, .webp"
            />
            <div className="justify-self-end w-full md:w-auto py-3 md:py-0">
              <button
                style={{
                  pointerEvents: loading ? "none" : "auto",
                }}
                disabled={newImage && newImage[0] ? false : true}
                className="bg-primary rounded-xl flex justify-center disabled:opacity-80 text-white text-lg py-2 px-8 transition-all w-full hover:bg-secondary_light hover:text-primary"
                type="button"
                onClick={changeEp}
              >
                {loading ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white" />
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

export default EventPicture;

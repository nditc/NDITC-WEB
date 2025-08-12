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
import imageCompression from "browser-image-compression";
import { updateProfile } from "firebase/auth";

const ProfilePic = ({ imageUrl }: { imageUrl: string }) => {
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const FileRef = useRef<HTMLInputElement>(null);

  const changePfp = async () => {
    if (!user?.uid || !newImage) {
      toast.error("Authentication error or no image selected");
      return;
    }

    setLoading(true);
    try {
      const storeRef = ref(pfp, `pfp/${user.uid}`);
      
      // Compression options
      const options = {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 420,
        useWebWorker: true,
      };
      
      setCompressing(true);
      const compressedFile = await imageCompression(newImage, options);
      setCompressing(false);

      // Upload to storage
      const snapshot = await uploadBytes(storeRef, compressedFile);
      const url = await getDownloadURL(snapshot.ref);

      // Update both Firestore and Auth profile
      await Promise.all([
        updateDoc(doc(db, "participants", user.uid), { 
          imageUrl: url 
        }),
        updateProfile(user, {
          photoURL: url
        })
      ]);

      toast.success("Profile picture updated successfully!");
      setNewImage(null);
      setChangeImage(false);
    } catch (error: any) {
      console.error("Upload error:", error);
      let errorMessage = error.message.replace("Firebase: ", "");
      
      if (error.code === 'storage/unauthorized') {
        errorMessage = "You don't have permission to update profile picture";
      } else if (error.code === 'storage/retry-limit-exceeded') {
        errorMessage = "Upload failed. Please try again later";
      }
      
      toast.error(errorMessage || "Failed to update profile picture");
    } finally {
      setLoading(false);
      setCompressing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    try {
      const file = e.target.files[0];
      
      // Validate file
      await fileValidator(
        [file],
        ["image/png", "image/jpeg", "image/webp"],
        5 * 1024, // 5MB in KB
        1,
        "File must be a .jpg, .png or .webp under 5MB"
      );

      setNewImage(file);
    } catch (err) {
      if (FileRef.current) FileRef.current.value = "";
      toast.error(String(err));
    }
  };

  return (
    <>
      <div
        className="group relative rounded-full text-center"
        onClick={() => setChangeImage(true)}
      >
        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none font-medium text-transparent group-hover:text-white">
          Click to Change
        </p>
        <img
          className="aspect-square h-[200px] w-[200px] min-w-[200px] max-w-[200px] cursor-pointer rounded-full bg-white object-cover shadow-md transition-all group-hover:brightness-50"
          src={`${imageUrl}?x=${Math.random()}`} // Cache busting
          alt="Profile picture"
        />
      </div>

      <Modal state={changeImage}>
        {changeImage && (
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
            
            {compressing && (
              <div className="my-3 flex items-center justify-center gap-2">
                <CgSpinner className="h-7 w-7 animate-spin text-primary" />
                Image Compressing
              </div>
            )}
            
            {newImage && (
              <img
                className="mx-auto my-2 h-[200px] w-[200px] rounded-full object-cover"
                src={URL.createObjectURL(newImage)}
                alt="Preview"
              />
            )}
            
            <input
              onChange={handleFileChange}
              className="my-5 file:mr-3 file:cursor-pointer file:rounded-lg file:border-none file:bg-primary file:px-4 file:py-2 file:text-white file:hover:bg-secondary_light file:hover:text-primary"
              ref={FileRef}
              name="pfp"
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
            />
            
            <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
              <button
                disabled={!newImage || loading}
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
        )}
      </Modal>
    </>
  );
};

export default ProfilePic;
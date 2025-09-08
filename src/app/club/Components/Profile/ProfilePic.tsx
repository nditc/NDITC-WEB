"use client";

import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/config/firebase";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import fileValidator from "@/util/fileValidator";
import imageCompression from "browser-image-compression";
import Modal from "@/app/club/Components/Modal";
import { doc, updateDoc } from "firebase/firestore";

const ProfilePic = ({ imageUrl }: { imageUrl: string }) => {
  const [changeImage, setChangeImage] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [user, userLoading] = useAuthState(auth);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const FileRef = useRef<HTMLInputElement>(null);
 
  useEffect(() => {
    // Set the image URL when prop changes
    if (imageUrl) {
      setCurrentImageUrl(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const changePfp = async (): Promise<void> => {
    if (userLoading) {
      toast.info("Please wait while we verify your authentication");
      return;
    }

    if (!user?.uid) {
      toast.error("You must be logged in to change your profile picture");
      return;
    }

    if (!newImage) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    try {
      setCompressing(true);
 
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newImage, options);
      setCompressing(false);
 
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Data }),
      });

      const data = await response.json(); 
      if (response.ok) {
        if (data.imageUrl) {
          try {
            await updateDoc(doc(db, "participants", user.uid), {
              imageUrl: data.imageUrl
            });
            
            toast.success("Profile picture updated successfully!");
            // Update with cache busting timestamp
            setCurrentImageUrl(`${data.imageUrl}?t=${Date.now()}`);
          } catch (firestoreError) {
            console.error("Firestore update error:", firestoreError);
            toast.error("Image uploaded but failed to update profile data");
          }
        }
        
        setNewImage(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
        setChangeImage(false);
      } else {
        throw new Error(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile picture"
      );
    } finally {
      setLoading(false);
      setCompressing(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    try {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }

      await fileValidator(
        e.target.files,
        ["image/png", "image/jpeg", "image/webp"],
        4 * 1024,
        1,
        "File must be a .jpg, .png or .webp under 5MB"
      );

      const file = e.target.files[0];
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      if (FileRef.current) FileRef.current.value = "";
      toast.error(String(err));
    }
  };

  const closeModal = () => {
    setChangeImage(false);
    setNewImage(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    if (FileRef.current) FileRef.current.value = "";
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    // Optional: fallback to default image if the main one fails to load
    setCurrentImageUrl("https://firebasestorage.googleapis.com/v0/b/ftmpc-63d81.appspot.com/o/pfp%2Fno_user.webp?alt=media&token=fd930687-e7b9-4fa6-9603-f20b73bd0a86");
  };

  return (
    <>
      <div
        className="group relative rounded-full text-center cursor-pointer"
        onClick={() => setChangeImage(true)}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[200px] w-[200px] rounded-full bg-zinc-300 animate-pulse"></div>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 transition-all group-hover:bg-opacity-50">
          <p className="text-transparent group-hover:text-white font-medium transition-all">
            Click to Change
          </p>
        </div>
        <img
          className="aspect-square h-[200px] w-[200px] min-w-[200px] max-w-[200px] rounded-full bg-white object-cover shadow-md"
          src={currentImageUrl}
          alt="Profile picture"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      </div>

      <Modal state={changeImage}  >
        <div className="absolute left-1/2 top-1/2 max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5">
          <div className="flex justify-end">
            <button
              className="mb-5 ml-2 flex items-center gap-2 border-b-2 border-transparent text-right font-medium text-primary hover:border-primary"
              onClick={closeModal}
              disabled={loading}
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
              Compressing Image...
            </div>
          )}

          {previewUrl && (
            <img
              className="mx-auto my-2 h-[200px] w-[200px] rounded-full object-cover"
              src={previewUrl}
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
            disabled={loading || compressing}
          />

          <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
            <button
              disabled={!newImage || loading || compressing}
              className="flex w-full justify-center rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary disabled:opacity-80 disabled:cursor-not-allowed"
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
      </Modal>
    </>
  );
};

export default ProfilePic;
"use client";

import Link from "next/link";
import { PiStudent } from "react-icons/pi";
import { useAuthContext } from "../Layout/AuthContextProvider";
import { createCipheriv } from "crypto";
import { useUserDataContext } from "../Layout/UserDataProvider";

const PartcipateButton = ({ id }: { id: string }) => {
  const encryption_key = "kjfofvdhjHjgrmgherTtyLJfVbshJbvQ"; // Must be 32 characters
  const initialization_vector = "X05IGQ5qdBnIqAWD"; // Must be 16 characters

  function encrypt(text: string) {
    const cipher = createCipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector),
    );
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  const uid = useAuthContext().userAuth?.uid;
  const memberid = useUserDataContext().userData?.ndc_id;
  return (
    <Link
      href={`/club/participate/${id}/${encrypt(`${uid}`)}/${encrypt(memberid == "" || memberid == undefined ? "none" : memberid)}`}
      className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary_dark focus:bg-primary_darkest focus:outline-none focus:ring-4"
    >
      <PiStudent className="h-7 w-7" />
      Participate
    </Link>
  );
};

export default PartcipateButton;

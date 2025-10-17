import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import { notFound } from "next/navigation";
import ImageGrid from "@/app/(main)/Components/ImageComponents/ImageGrid";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createDecipheriv } from "crypto";
import { initAdmin } from "@/config/firebaseAdmin";
import { firestore } from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { timeValue } from "../../Components/Time";
import ParticipateButton from "./ParticipateButton";
import Eligibility from "./Eligibility";

type ParamType = { id: string };

const page = async (props: { params: Promise<ParamType> }) => {
  const params = await props.params;
  await initAdmin();
  const encryption_key = "kjfofvdhjHjgrmgherTtyLJfVbshJbvQ"; // Must be 32 characters
  const initialization_vector = "X05IGQ5qdBnIqAWD"; // Must be 16 characters

  function decrypt(text: any) {
    const decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector),
    );
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }

  function convertToBangladeshTime(timestamp: Timestamp): Timestamp {
    if (!timestamp) return timestamp;

    const utcDate = timestamp.toDate();
    const bdDate = new Date(utcDate.getTime() + (6 * 60 * 60 * 1000)); 
    return Timestamp.fromDate(bdDate);
  }
  const firestore = getFirestore();

  const dataDoc = await firestore
    .collection("events")
    .doc(decrypt(params.id))
    .get();

  if (!dataDoc.exists) notFound();

  const data = dataDoc.data();

  const title = data?.eventName;

  const DateData = timeValue(convertToBangladeshTime(data?.date));

 const bdNow = Timestamp.fromDate(new Date(Date.now() + (6 * 60 * 60 * 1000))); // Current BD time
const timeUp = bdNow > convertToBangladeshTime(data?.enddate);
const notTime = bdNow < convertToBangladeshTime(data?.date);
  return (
    <div className="w-screen bg-[#F6F6F6]">
      <div className="container relative flex flex-col items-center gap-10 bg-transparent py-10 pt-[81px]">
        <div className="w-screen bg-white shadow-xl">
          <div className="container flex flex-col items-center gap-0 pb-5 md:flex-row md:gap-5 md:pb-0">
            <div className="order-2 ml-1 flex w-full flex-1 flex-col gap-2 md:order-1 md:gap-3 md:py-8 2xl:gap-5">
              <h1 className="pt-5 text-2xl">
                <span className="text-blue-500"> {`${data?.category}>`}</span>
              </h1>

              <h1 className="text-4xl 2xl:text-5xl">{title}</h1>

              <p className="line-clamp-5 flex items-center justify-start font-semibold">
                <MdOutlineDateRange className={"mr-2 h-6 w-6 text-blue-500"} />
                {`${DateData.date} ${DateData.monthText} ${DateData.year}`}{" "}
                <span className="text-zinc-300">|</span>{" "}
                {`${DateData.hour}:${DateData.minute}`}
              </p>

              {!timeUp && !notTime ? (
                <ParticipateButton
                  id={params.id}
                  intra_club={data?.intra}
                  intra_college={data?.intraCollege}
                  publicQuiz={data?.public}
                  isExternal={!!data?.isExternal}
                  extrernalLink={data?.externalLink || ""}
                />


              ) : (
                <Eligibility
                  intra_club={data?.intra}
                  intra_college={data?.intraCollege}
                  publicQuiz={data?.public}
                />
              )}
            </div>
            <div className="order-1 h-full max-h-[50vh] w-full flex-1 md:order-2 md:min-h-[410px]">
              <img
                className="h-full max-h-[50vh] w-full rounded-b-xl object-cover md:min-h-[410px] md:rounded-none"
                src={data?.imageURL}
                alt=""
                width={750}
                height={430}
              />
            </div>
          </div>
        </div>
        <div className="w-full self-start">
          <div className="markdown mb-10 mt-3 min-h-[30vh] text-left font-Nunito text-lg">
            <Markdown remarkPlugins={[remarkGfm]}>{data?.description}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

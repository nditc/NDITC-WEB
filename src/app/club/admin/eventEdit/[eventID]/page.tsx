"use client";

import EventPicture from "@/app/club/Components/Admin/EventPicture";
import NotFound from "@/app/not-found";
import { auth, db, pfp } from "@/config/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef, use } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "@/app/club/Components/Modal";
import fileValidator from "@/util/fileValidator";
import { LiaTimesSolid } from "react-icons/lia";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import AddQuestions from "@/app/club/Components/Admin/AddQuestions";
import { Checkbox, DatePicker, Radio, RadioGroup, Input } from "@nextui-org/react";
import {
  now,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { timeValue } from "@/app/club/Components/Time";
import Link from "next/link";
import InfoBox from "@/app/club/Components/InfoBox";
import { CiWarning } from "react-icons/ci";

const Page = (props: { params: Promise<{ eventID: string }> }) => {
  const params = use(props.params);
  const [adminAuth, setAdminAuth] = useState(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState(true);

  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [eventUID, setEventUID] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [intra, setIntra] = useState(false);
  const [intraCollege, setIntraCollege] = useState(false);
  const [publicQuiz, setPublicQuiz] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState("public");

  const [date, setDate] = useState(now(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));
  const [addTime, setAddTime] = useState<any>();
  const [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/nditc-club.appspot.com/o/ep%2Ffallback.webp?alt=media&token=2607601b-5deb-49f6-a0cf-5a8d12e71112"
  );
  const [description, setDescription] = useState("");

  // External event toggle
  const [isExternal, setIsExternal] = useState(false);
  const [externalLink, setExternalLink] = useState("");

  // Questions
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  const setData = (q: any, a: any) => {
    setQuestions(q);
    setAnswers(a);
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [notfound, setNotfound] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [newImage, setNewImage] = useState<FileList | null>(null);
  const FileRef = useRef<HTMLInputElement>(null);

  // Auth check
  useEffect(() => {
    if (user && user.email) {
      fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ id: user.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          setAdminAuth(resp.auth || false);
          setAuthLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong");
          setAdminAuth(false);
          setAuthLoading(false);
        });
    } else {
      setAdminAuth(false);
      setAuthLoading(false);
    }

    if (params.eventID !== "new") {
      getDoc(doc(db, "events", params.eventID)).then((event) => {
        if (event.exists()) {
          const data = event.data();
          setNotfound(false);
          setEventName(data.eventName);
          setEventUID(event.id);
          setCategory(data.category || "");
          setImageURL(data.imageURL);
          setDescription(data.description);
          setShowResult(data.showResult);
          setPublicQuiz(data.public);
          setIntraCollege(data.intraCollege);
          setIntra(data.intra);
          setAddTime(data.addTime);
          setIsExternal(data.isExternal || false);
          setExternalLink(data.externalLink || "");

          let time = parseAbsoluteToLocal(timeValue(data.date).time.toISOString());
          let endTime = parseAbsoluteToLocal(timeValue(data.enddate).time.toISOString());
          setDate(time);
          setEndDate(endTime);

          setQuestions(data.questions || []);
          getDoc(doc(db, "answers", params.eventID)).then((ans) => {
            if (ans.exists()) setAnswers(ans.data().answers);
          });
        } else {
          setNotfound(true);
        }
      });
    } else {
      setNotfound(false);
    }
  }, [params.eventID, user]);

  // Save or update to Firestore
  const saveEventToDB = async (url?: string) => {
    const payload: any = {
      eventName,
      addTime: addTime || serverTimestamp(),
      date: date.toDate(),
      enddate: endDate.toDate(),
      imageURL: url || imageURL,
      description,
      category,
      public: publicQuiz,
      intraCollege,
      intra,
      showResult,
      isExternal,
      externalLink,
    };

    if (!isExternal) {
      payload.questions = questions;
    }

    await setDoc(doc(db, "events", eventUID), payload);

    if (!isExternal) {
      await setDoc(doc(db, "answers", eventUID), {
        public: publicQuiz,
        intraCollege,
        intra,
        answers,
        date: date.toDate(),
        enddate: endDate.toDate(),
      });
    }
  };

  // Submit new event
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!date) return toast.error("Date not specified");
    if (!isExternal && questions.length === 0)
      return toast.error("At least one question must be added");

    setLoading(true);

    const checkUID = await getDoc(doc(db, "events", eventUID));
    if (checkUID.exists()) {
      toast.error("This UID is already in use!");
      setLoading(false);
      return;
    }

    if (newImage) {
      const storeRef = ref(pfp, "ep/" + eventUID);
      uploadBytes(storeRef, newImage[0]).then(async () => {
        const url = await getDownloadURL(storeRef);
        await saveEventToDB(url);
        toast.success("Event Added");
        setLoading(false);
        router.push("/club/admin/events");
      });
    } else {
      await saveEventToDB();
      toast.success("Event Added");
      setLoading(false);
      router.push("/club/admin/events");
    }
  };

  // Update existing event
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!date) return toast.error("Date not specified");
    if (!isExternal && questions.length === 0)
      return toast.error("At least one question must be added");

    setLoading(true);

    if (changeImage && newImage) {
      const storeRef = ref(pfp, "ep/" + eventUID);
      uploadBytes(storeRef, newImage[0]).then(async () => {
        const url = await getDownloadURL(storeRef);
        await saveEventToDB(url);
        toast.success("Event Updated");
        setLoading(false);
        setChangeImage(false);
        router.push("/club/admin/events");
      });
    } else {
      await saveEventToDB();
      toast.success("Event Updated");
      setLoading(false);
      router.push("/club/admin/events");
    }
  };

  // Delete event
  const deleteEvent = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await deleteDoc(doc(db, "events", eventUID));
    await deleteDoc(doc(db, "answers", eventUID));
    toast.warning("Event Deleted");
    setLoading(false);
    router.push("/club/admin/events");
  };

  // Handle file selection
  const handleFileSelect = (e: any) => {
    const file = e.target.files;
    if (!fileValidator(file, 2)) return;
    setNewImage(file);
  };

  return (
    <main className="min-h-screen bg-[#f6f6f6]">
      {!notfound ? (
        <section className="container">
          <form
            className="mt-20 grid w-full grid-cols-1 gap-5 py-5 sm:py-12"
            onSubmit={params.eventID === "new" ? handleSubmit : handleUpdate}
          >
            <h1 className="text-4xl">
              {params.eventID === "new" ? "Add New" : "Edit"}{" "}
              <span className="text-primary">Event</span>
            </h1>

            {/* Image Section */}
            <div>
              <EventPicture
                imageURL={imageURL}
                FileRef={FileRef}
                setChangeImage={setChangeImage}
              />
              <button
                type="button"
                className="mt-2 rounded-lg border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white transition-all"
                onClick={() => setChangeImage(true)}
              >
                Edit Image
              </button>
            </div>

            {/* Image Edit Modal */}
            {changeImage && (
              <Modal close={() => setChangeImage(false)}>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold">Change Event Image</h2>
                    <button onClick={() => setChangeImage(false)}>
                      <LiaTimesSolid className="text-2xl" />
                    </button>
                  </div>
                  <input
                    ref={FileRef}
                    onChange={handleFileSelect}
                    type="file"
                    accept="image/*"
                    className="rounded-lg border border-gray-300 p-3"
                  />
                  {newImage && (
                    <p className="text-sm text-gray-500">
                      Selected: {newImage[0].name}
                    </p>
                  )}
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-6 py-2 text-white"
                    onClick={() => {
                      if (!newImage) return toast.error("No image selected");
                      setChangeImage(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </Modal>
            )}

            {/* External event checkbox */}
            <Checkbox
              size="lg"
              isSelected={isExternal}
              onValueChange={setIsExternal}
            >
              This event will happen on an external site (like a programming contest)
            </Checkbox>

            {isExternal && (
              <Input
                type="url"
                label="External Event Link"
                placeholder="https://example.com/contest"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                isRequired
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                className="rounded-xl border border-gray-200 px-5 py-3"
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
                placeholder="Event Name"
                required
              />
              <input
                className="rounded-xl border border-gray-200 px-5 py-3 lowercase"
                onChange={(e) =>
                  setEventUID(e.target.value.toLowerCase().replaceAll(" ", ""))
                }
                value={eventUID}
                placeholder="Event UID"
                required
                disabled={params.eventID !== "new"}
              />
              <input
                className="rounded-xl border border-gray-200 px-5 py-3"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Category"
                required
              />
              <DatePicker
                label="Start Date"
                value={date}
                onChange={setDate}
                size="lg"
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={setEndDate}
                size="lg"
              />
            </div>

            <textarea
              className="h-36 rounded-xl border border-gray-200 px-5 py-3"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Event Description"
              required
            />

            {/* Only show quiz-related settings if not external */}
            {!isExternal && (
              <>
                <Checkbox
                  size="lg"
                  isSelected={showResult}
                  onValueChange={setShowResult}
                >
                  Show Result To User After Submission?
                </Checkbox>

                <RadioGroup
                  value={selectedEventType}
                  onValueChange={setSelectedEventType}
                  label="Select Event Type"
                  color="primary"
                >
                  <Radio value="public">Open For All</Radio>
                  <Radio value="intra_college">Intra College</Radio>
                  <Radio value="intra_club">Intra Club</Radio>
                </RadioGroup>

                <AddQuestions
                  questionsData={questions}
                  answersData={answers}
                  setData={setData}
                  setQues={setQuestions}
                  setAns={setAnswers}
                />
              </>
            )}

            <InfoBox icon={<CiWarning />} title="Caution" type="warning">
              Please save after creating a new event. If external, ensure you
              include a valid link.
            </InfoBox>

            <div className="flex gap-5">
              {params.eventID !== "new" && (
                <button
                  type="button"
                  onClick={deleteEvent}
                  className="rounded-xl bg-red-600 px-8 py-2 text-white"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="rounded-xl bg-primary px-8 py-2 text-white"
                disabled={loading}
              >
                {loading ? (
                  <CgSpinner className="h-6 w-6 animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

export default Page;

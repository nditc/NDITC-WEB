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
import { useState, useEffect, useReducer, useRef, use } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Image from "next/image";
import Modal from "@/app/club/Components/Modal";
import fileValidator from "@/util/fileValidator";
import { LiaTimesSolid } from "react-icons/lia";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import AddQuestions from "@/app/club/Components/Admin/AddQuestions";
import { Checkbox, DatePicker, Radio, RadioGroup } from "@nextui-org/react";
import {
  now,
  getLocalTimeZone,
  ZonedDateTime,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { timeValue } from "@/app/club/Components/Time";
import Link from "next/link";
import InfoBox from "@/app/club/Components/InfoBox";
import { CiWarning } from "react-icons/ci";

const Page = (props: { params: Promise<{ eventID: string }> }) => {
  const params = use(props.params);
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [eventUID, setEventUID] = useState("");

  const [showResult, setShowResult] = useState(true);

  const [intra, setIntra] = useState(false);
  const [intraCollege, setIntraCollege] = useState(false);
  const [publicQuiz, setPublicQuiz] = useState(true);

  const [selectedEventType, setSelectedEventType] = useState("public");

  useEffect(() => {
    if (selectedEventType == "public") {
      setIntra(false);
      setIntraCollege(false);
      setPublicQuiz(true);
    }

    if (selectedEventType == "intra_college") {
      setIntra(false);
      setIntraCollege(true);
      setPublicQuiz(false);
    }

    if (selectedEventType == "intra_club") {
      setIntra(true);
      setIntraCollege(false);
      setPublicQuiz(false);
    }
  }, [selectedEventType]);

  useEffect(() => {
    if (intra) setSelectedEventType("intra_club");
    if (intraCollege) setSelectedEventType("intra_college");
    if (publicQuiz) setSelectedEventType("public");
  }, [intra, intraCollege, publicQuiz]);

  const [date, setDate] = useState(now(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));
  const [addTime, setAddTime] = useState<any>();
  const [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/nditc-club.appspot.com/o/ep%2Ffallback.webp?alt=media&token=2607601b-5deb-49f6-a0cf-5a8d12e71112",
  );
  const [description, setDescription] = useState("");

  //---------------Questions---------------

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  const setData = (questionData: any, answerData: any) => {
    setQuestions(questionData);
    setAnswers(answerData);
  };

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

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
        .catch((err) => {
          toast.error("Something went wrong");
          setAdminAuth(false);
          setAuthLoading(false);
        });
    } else {
      setAdminAuth(false);
      setAuthLoading(false);
    }
    console.log("loaded");
    if (params.eventID != "new") {
      const event = getDoc(doc(db, "events", params.eventID)).then((event) => {
        if (event.exists()) {
          setNotfound(false);
          setEventName(event.data().eventName);
          let time = parseAbsoluteToLocal(
            timeValue(event.data().date).time.toISOString(),
          );
          let endTime = parseAbsoluteToLocal(
            timeValue(event.data().enddate).time.toISOString(),
          );
          setDate(time);
          setEndDate(endTime);
          setAddTime(event.data().addTime);
          setEventUID(event.id);
          setImageURL(event.data().imageURL);
          setDescription(event.data().description);
          setPublicQuiz(event.data().public);
          setIntraCollege(event.data().intraCollege);
          setIntra(event.data().intra);
          setShowResult(event.data().showResult);
          setQuestions(event.data().questions);
          setCategory(event.data().category);

          const ans = getDoc(doc(db, "answers", params.eventID)).then((ans) => {
            if (ans.exists()) {
              setAnswers(ans.data().answers);
            }
          });
        } else {
          setNotfound(true);
        }
      });
    } else {
      setNotfound(false);
    }
  }, [params.eventID, user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!date) {
      toast.error("Date not specified");
      return;
    }

    if (questions.length == 0) {
      toast.error("At least one question must be added");
      return;
    }

    setLoading(true);

    const checkUID = await getDoc(doc(db, "events", eventUID));

    if (checkUID.exists()) {
      toast.error("This UID is already in use!");
      setLoading(false);
    } else {
      if (newImage) {
        const storeRef = ref(pfp, "ep/" + eventUID);
        uploadBytes(storeRef, newImage[0]).then(async (snapshot) => {
          const url = await getDownloadURL(storeRef);
          setDoc(doc(db, "events", eventUID), {
            eventName: eventName,
            addTime: serverTimestamp(),
            date: date.toDate(),
            enddate: endDate.toDate(),
            imageURL: url,
            description: description,
            public: publicQuiz,
            intraCollege: intraCollege,
            intra: intra,
            showResult: showResult,
            questions: questions,
            category,
          })
            .then(() => {
              setDoc(doc(db, "answers", eventUID), {
                public: publicQuiz,
                intraCollege: intraCollege,
                intra: intra,
                answers: answers,
                date: date.toDate(),
                enddate: endDate.toDate(),
              });
            })
            .then(() => {
              toast.success("Successfully Event Added");
              setLoading(false);
              goToAdminPanel();
            });
        });
      } else {
        setDoc(doc(db, "events", eventUID), {
          eventName: eventName,
          addTime: serverTimestamp(),
          date: date.toDate(),
          enddate: endDate.toDate(),
          imageURL: imageURL,
          description: description,
          public: publicQuiz,
          intraCollege: intraCollege,
          intra: intra,
          showResult: showResult,
          questions: questions,
          category,
        })
          .then(() => {
            setDoc(doc(db, "answers", eventUID), {
              public: publicQuiz,
              intraCollege: intraCollege,
              intra: intra,
              answers: answers,
              date: date.toDate(),
              enddate: endDate.toDate(),
            });
          })
          .then(() => {
            toast.success("Successfully Event Added");
            setLoading(false);
            goToAdminPanel();
          });
      }
    }
  };

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    if (!date) {
      toast.error("Date not specified");
      return;
    }
    if (questions.length == 0) {
      toast.error("At least one question must be added");
      return;
    }
    setLoading(true);

    setDoc(doc(db, "events", eventUID), {
      eventName: eventName,
      addTime: addTime,
      date: date.toDate(),
      enddate: endDate.toDate(),
      imageURL: imageURL,
      description: description,
      public: publicQuiz,
      intraCollege: intraCollege,
      intra: intra,
      showResult: showResult,
      questions: questions,
      category,
    })
      .then(() => {
        setDoc(doc(db, "answers", eventUID), {
          public: publicQuiz,
          intraCollege: intraCollege,
          intra: intra,
          answers: answers,
          date: date.toDate(),
          enddate: endDate.toDate(),
        });
      })
      .then(() => {
        toast.success("Successfully Event Updated");
        setLoading(false);
        goToAdminPanel();
      });
  };

  const save = async (event: any) => {
    localStorage.setItem(
      `event.${eventUID}`,
      JSON.stringify({
        questions,
        answers,
      }),
    );
    toast.info("Saved questions and answers.");
  };

  // useEffect(() => {
  //   const t = setInterval(() => {
  //     if (params.eventID !== "new") {
  //       localStorage.setItem(
  //         `event.${eventUID}`,
  //         JSON.stringify({
  //           questions,
  //           answers,
  //         }),
  //       );
  //     }
  //   }, 1000 * 30);

  //   return () => {
  //     clearInterval(t);
  //   };
  // }, [questions, answers, eventUID, params.eventID]);
  const loadLocal = async () => {
    const local = JSON.parse(localStorage.getItem(`event.${eventUID}`) || "{}");
    console.dir(local);
    setData(local?.questions, local?.answers);
    toast.info("Loaded local questions and answers.");
  };
  const [notfound, setNotfound] = useState(false);

  const [changeImage, setChangeImage] = useState<boolean>();
  const [newImage, setNewImage] = useState<FileList | null>();

  const FileRef = useRef<HTMLInputElement>(null);

  //---------Navigation--------

  const goToAdminPanel = () => {
    router.push("/club/admin/events");
  };

  //-----------Delete Event------------

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteWarning = (e: any) => {
    e.preventDefault();
    setDeleteModalOpen(true);
  };

  const deleteEvent = (e: any) => {
    e.preventDefault();
    setLoading(true);
    deleteDoc(doc(db, "events", eventUID))
      .then(() => {
        deleteDoc(doc(db, "answers", eventUID)).then(() => {
          toast.warning("Event Deleted");
          setLoading(false);
          goToAdminPanel();
        });
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <main className="min-h-screen bg-[#f6f6f6]">
      {!notfound ? (
        <section className="container">
          <form
            className="mt-20 grid w-full grid-cols-1 gap-5 py-5 sm:py-12"
            onSubmit={params.eventID == "new" ? handleSubmit : handleUpdate}
          >
            <h1 className="text-4xl">
              {params.eventID == "new" ? "Add New" : "Edit"}
              <span className="text-primary"> Event</span>
            </h1>

            <div className="flex h-fit w-full items-center justify-center md:w-fit">
              {params.eventID == "new" ? (
                <>
                  <div
                    className="group relative rounded-xl text-center"
                    onClick={() => {
                      setChangeImage(true);
                    }}
                  >
                    <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none font-medium text-transparent text-white">
                      Click to Change
                    </p>
                    <img
                      className="aspect-square h-[384px] w-[384px] min-w-[384px] max-w-[384px] cursor-pointer rounded-xl bg-white object-cover shadow-md brightness-50 transition-all"
                      src={
                        newImage ? URL.createObjectURL(newImage[0]) : imageURL
                      }
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
                          UPLOAD{" "}
                          <span className="text-primary">EVENT PICTURE</span>
                        </h1>
                        {newImage && newImage[0] ? (
                          <img
                            className="mx-auto my-2 h-[200px] w-[200px] rounded-xl object-cover"
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
                              setNewImage(
                                e.target.files ? e.target.files : null,
                              );
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
                            onClick={() => setChangeImage(false)}
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </Modal>
                </>
              ) : (
                <EventPicture
                  eventID={eventUID}
                  imageUrl={imageURL}
                  setImage={(img: string) => {
                    setImageURL(img);
                  }}
                />
              )}
            </div>

            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label
                  className="ml-2 font-medium text-gray-500"
                  htmlFor="name"
                >
                  Event Name:
                </label>
                <input
                  className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
                  onChange={(e) => setEventName(e.currentTarget.value)}
                  value={eventName}
                  name="name"
                  placeholder="Event Name"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-2 font-medium text-gray-500" htmlFor="uid">
                  Event UID:
                </label>
                <input
                  className="rounded-xl border border-gray-200 px-5 py-3 lowercase focus:border-primary focus:outline-none"
                  onChange={(e) =>
                    setEventUID(
                      e.currentTarget.value.toLowerCase().replaceAll(" ", ""),
                    )
                  }
                  value={eventUID}
                  name="uid"
                  placeholder="Event Unique ID"
                  required
                  disabled={params.eventID != "new"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="ml-2 font-medium text-gray-500"
                  htmlFor="name"
                >
                  Category Name:
                </label>
                <input
                  className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
                  onChange={(e) => setCategory(e.currentTarget.value)}
                  value={category}
                  name="name"
                  placeholder="Category Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="ml-2 font-medium text-gray-500"
                  htmlFor="description"
                >
                  Select Event Start Date Time:
                </label>
                <DatePicker
                  label="Start Time"
                  size="lg"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  classNames={{
                    selectorIcon: "text-primary",
                    base: "bg-white rounded-xl shadow-none",
                  }}
                  value={date}
                  onChange={(e) => setDate(e)}
                  isRequired
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="ml-2 font-medium text-gray-500"
                  htmlFor="description"
                >
                  Select Event End Date Time:
                </label>
                <DatePicker
                  label="End Time"
                  size="lg"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  classNames={{
                    selectorIcon: "text-primary",
                    base: "bg-white rounded-xl shadow-none",
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                  isRequired
                  minValue={date}
                />
              </div>

              <RadioGroup
                value={selectedEventType}
                onValueChange={setSelectedEventType}
                label="Select the Event Type"
                color="primary"
              >
                <Radio
                  value="public"
                  description="Seasonal Event. Anyone can participate"
                >
                  Open-For-All
                </Radio>
                <Radio
                  value="intra_college"
                  description="Quiz for all NDC Students"
                >
                  Intra College
                </Radio>
                <Radio
                  value="intra_club"
                  description="Quiz only for all NDITC Members"
                >
                  Intra Club
                </Radio>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Checkbox
                size="lg"
                isSelected={showResult}
                onValueChange={setShowResult}
              >
                Show Result To User After Submission ?
              </Checkbox>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="ml-2 font-medium text-gray-500"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                className="h-36 rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none"
                onChange={(e) => setDescription(e.currentTarget.value)}
                value={description}
                name="description"
                placeholder="More about the event ..."
                required
              />
            </div>

            <AddQuestions
              questionsData={questions}
              answersData={answers}
              setData={setData}
              setQues={(s) => setQuestions(s)}
              setAns={(s) => setAnswers(s)}
            />

            <Modal state={deleteModalOpen}>
              {deleteModalOpen ? (
                <div className="absolute left-1/2 top-1/2 max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5">
                  <div className="flex justify-end">
                    <button
                      className="mb-5 ml-2 flex items-center gap-2 border-b-2 border-transparent text-right font-medium text-primary hover:border-primary"
                      onClick={() => {
                        setDeleteModalOpen(false);
                      }}
                    >
                      <LiaTimesSolid className="h-4 w-4" />
                      Close
                    </button>
                  </div>
                  <h1 className="text-4xl">
                    DELETE <span className="text-red-600">EVENT</span>
                  </h1>

                  <p className="py-6">
                    You are about to delete an existing NDITC Event. Are you
                    sure?
                  </p>

                  <button
                    onClick={deleteEvent}
                    type="button"
                    className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete Event
                  </button>
                </div>
              ) : null}
            </Modal>
            <InfoBox icon={<CiWarning />} title="Caution" type="warning">
              Please do an inital save immediately after creating new event.
              Don't forget to save your progress, you can back it up by using
              "Load Backup" option. But if you save blank then it will not work.
              It will only work if you do it in same device you were working on
              as well as not clear history and cache. Copy `event.[id]` in
              localstorage to load and test questions in local.
            </InfoBox>
            <div className="flex flex-col items-stretch justify-between gap-5 lg:flex-row">
              <div className="flex h-full w-full py-3 md:w-auto md:py-0">
                {params.eventID != "new" && (
                  <Link
                    href={`/club/admin/rankers/${publicQuiz ? "public" : eventUID}`}
                    style={{
                      pointerEvents: loading ? "none" : "auto",
                    }}
                    className="h-full w-full rounded-xl bg-primary px-8 py-2 text-center text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                    type="button"
                  >
                    Rankers
                  </Link>
                )}
              </div>

              <div className="flex flex-col items-stretch justify-end gap-5 lg:flex-row">
                {loading ? (
                  <CgSpinner className="mx-auto h-9 w-9 animate-spin justify-self-end text-primary" />
                ) : null}

                {params.eventID != "new" && (
                  <>
                    <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
                      <button
                        style={{
                          pointerEvents: loading ? "none" : "auto",
                          opacity: loading ? "0.65" : "1",
                        }}
                        className="w-full rounded-xl bg-red-600 px-8 py-2 text-lg text-white transition-all hover:bg-red-500 hover:text-red-800"
                        onClick={deleteWarning}
                      >
                        <div className="flex items-center justify-center gap-3">
                          Delete
                          <RiDeleteBin6Line />
                        </div>
                      </button>
                    </div>

                    <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
                      <button
                        style={{
                          pointerEvents: loading ? "none" : "auto",
                          opacity: loading ? "0.65" : "1",
                        }}
                        className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                        onClick={save}
                        type="button"
                      >
                        <div className="flex items-center justify-center gap-3">
                          Save Local
                        </div>
                      </button>
                    </div>
                    <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
                      <button
                        style={{
                          pointerEvents: loading ? "none" : "auto",
                          opacity: loading ? "0.65" : "1",
                        }}
                        className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                        onClick={loadLocal}
                        type="button"
                      >
                        <div className="flex items-center justify-center gap-3">
                          Load Backup
                        </div>
                      </button>
                    </div>
                  </>
                )}

                <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
                  <button
                    style={{
                      pointerEvents: loading ? "none" : "auto",
                      opacity: loading ? "0.65" : "1",
                    }}
                    className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                    type="submit"
                  >
                    {" "}
                    Submit
                  </button>
                </div>
              </div>
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

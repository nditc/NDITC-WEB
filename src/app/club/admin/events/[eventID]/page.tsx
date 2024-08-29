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
import { useState, useEffect, useReducer, useRef } from "react";
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
import { Checkbox, DatePicker } from "@nextui-org/react";
import {
  now,
  getLocalTimeZone,
  ZonedDateTime,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { timeValue } from "@/app/club/Components/Time";

const Page = ({ params }: { params: { eventID: string } }) => {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [eventName, setEventName] = useState("");
  const [eventUID, setEventUID] = useState("");
  const [intra, setIntra] = useState(false);
  const [date, setDate] = useState(now(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(now(getLocalTimeZone()));
  const [addTime, setAddTime] = useState<any>();
  const [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/nditc-event.appspot.com/o/ep%2F356631772_874301840754682_3334138381481657833_n.jpg?alt=media&token=042e40b4-46ff-4ff6-90f0-2fb64990bffe",
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
          console.log(resp);
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
          setIntra(event.data().intra);
          setQuestions(event.data().questions);

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
  }, [user]);

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
            intra: intra,
            questions: questions,
          })
            .then(() => {
              setDoc(doc(db, "answers", eventUID), {
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
          intra: intra,
          questions: questions,
        })
          .then(() => {
            setDoc(doc(db, "answers", eventUID), {
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
      intra: intra,
      questions: questions,
    })
      .then(() => {
        setDoc(doc(db, "answers", eventUID), {
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

  const [notfound, setNotfound] = useState(false);

  const [changeImage, setChangeImage] = useState<boolean>();
  const [newImage, setNewImage] = useState<FileList | null>();

  const FileRef = useRef<HTMLInputElement>(null);

  //---------Navigation--------

  const goToAdminPanel = () => {
    router.push("/club/admin");
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
    <main className="min-h-screen w-screen bg-[#f6f6f6]">
      {!notfound ? (
        <section>
          <form
            className="mt-20 grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
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
                    <Image
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
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                  isRequired
                  minValue={date}
                />
              </div>

              <Checkbox size="lg" isSelected={intra} onValueChange={setIntra}>
                <label className="text-2xl font-medium text-gray-900">
                  <span className="text-primary">Intra</span> Event (Checkbox)
                </label>
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

            <div className="flex items-center justify-end gap-5">
              {params.eventID != "new" && (
                <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
                  <button
                    style={{
                      pointerEvents: loading ? "none" : "auto",
                    }}
                    className="w-full rounded-xl bg-red-600 px-8 py-2 text-lg text-white transition-all hover:bg-red-500 hover:text-red-800"
                    onClick={deleteWarning}
                  >
                    {loading ? (
                      <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        Delete
                        <RiDeleteBin6Line />
                      </div>
                    )}
                  </button>
                </div>
              )}

              <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
                <button
                  style={{
                    pointerEvents: loading ? "none" : "auto",
                  }}
                  className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
                  type="submit"
                >
                  {loading ? (
                    <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                  ) : (
                    "Submit"
                  )}
                </button>
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

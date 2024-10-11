"use client";

import { auth, db } from "@/config/firebase";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgSpinner } from "react-icons/cg";
import Error from "@/app/club/Components/Error";
import { toast } from "react-toastify";

import Select from "@/app/club/Components/Select";
import { MdEventNote, MdOutlinePersonSearch } from "react-icons/md";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { regDataType } from "@/config/registerData";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaCaretUp, FaFilter, FaRegEdit } from "react-icons/fa";
import { FiCheckCircle, FiUser } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import { BiHeart } from "react-icons/bi";
import Field from "../../../Components/Field";
import PassingYear from "../../../Components/PassingYear";
import Loading from "../../../Components/Loading";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [usersData, setUsersData] = useState<any | undefined | null>([]);
  const [lastUserDoc, setLastUserDoc] = useState<QueryDocumentSnapshot>();

  const docLimit = 5;

  const router = useRouter();

  const firstQ =
    params.id == "public"
      ? query(collection(db, "eventparticipant"), orderBy("points"))
      : query(
          collection(db, "answers", params.id, "eventparticipant"),
          orderBy("marks", "desc"),
        );

  const getData = async () => {
    const docsSnap = await getDocs(firstQ);

    setLastUserDoc(docsSnap.docs[docsSnap.docs.length - 1]);

    const tempArr: any[] = [];

    docsSnap.docs.forEach(async (e) => {
      const userData = await getDoc(doc(db, "participants", e.id));

      tempArr.push({
        id: e.id,
        data: { ...userData.data() },
        quizData: { ...e.data() },
      });

      setUsersData(tempArr);
    });

    //setUsersData((oldArr: any) => [oldArr, ...tempArr]);

    setAuthLoading(false);
  };

  useEffect(() => {
    if (user && user.email) {
      fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ id: user.email }),
      })
        .then((r) => r.json())
        .then((resp) => {
          setAdminAuth(resp.auth || false);

          getData();
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
  }, [user]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedStudentData, setSelectedStudentData] = useState<any>();
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);

  const [searchText, setSearchText] = useState("");

  //-------Filters------

  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreUsers = () => {
    const loadMoreQ =
      params.id == "public"
        ? query(
            collection(db, "eventparticipant"),
            orderBy("points"),
            startAfter(lastUserDoc),
          )
        : query(
            collection(db, "answers", params.id, "eventparticipant"),
            orderBy("marks"),
            startAfter(lastUserDoc),
          );

    getDocs(loadMoreQ).then((data) => {
      setLastUserDoc(data.docs[data.docs.length - 1]);
      const tempArr: any[] = [];
      data.docs.forEach((e) => {
        getDoc(doc(db, "participants", e.id))
          .then((userData) => {
            tempArr.push({
              id: e.id,
              data: { ...userData.data() },
              quizData: { ...e.data() },
            });

            setUsersData((oldArr: any) => [...oldArr, ...tempArr]);
          })
          .catch(() => {
            toast.error("Error Occurred");
            router.push("/club/admin");
          });
      });

      setAuthLoading(false);
    });
  };

  const onFilter = () => {
    if (searchText == "") {
      toast.error("Search Text is empty");
      return;
    }

    const filterRef =
      params.id == "public"
        ? doc(db, "eventparticipant", searchText)
        : doc(db, "answers", params.id, "eventparticipant", searchText);

    getDoc(filterRef)
      .then((data) => {
        if (!data.exists) {
          toast.error("This user hasn't participated in this Quiz yet");
          return;
        }

        const tempArr: any[] = [];

        getDoc(doc(db, "participants", data.id)).then((userData) => {
          if (!data.exists || userData.data()?.name == "") {
            toast.error("This user hasn't participated in this Quiz yet");
            return;
          }
          tempArr.push({
            id: data.id,
            data: { ...userData.data() },
            quizData: { ...data.data() },
          });

          setUsersData(tempArr);
        });

        setAuthLoading(false);
      })
      .catch(() => {
        toast.error("Error Occurred");
        router.push("/club/admin");
      });
  };

  return (
    <>
      {adminAuth ? (
        <div
          suppressHydrationWarning
          className="container min-h-screen w-full bg-[#f6f6f6]"
        >
          <div className="flex flex-col pb-[81px]">
            <h1 className="mt-8 text-5xl">
              RANKERS <span className="text-primary">PANEL</span>
            </h1>

            <div className="flex flex-col gap-1 py-6 md:flex-row md:gap-6">
              <div className="flex w-full flex-col gap-1">
                <label
                  className="ml-2 font-medium text-gray-500 disabled:text-gray-200"
                  htmlFor={"searchtext"}
                >
                  Search User By UID
                </label>
                <input
                  className="rounded-xl border border-gray-200 px-5 py-3 focus:border-primary focus:outline-none disabled:bg-white disabled:text-gray-400"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  type={"text"}
                  name={"searchtext"}
                  placeholder={"Enter ..."}
                />
              </div>
              <button
                onClick={onFilter}
                type={"button"}
                className="my-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary md:my-0 md:mt-7 md:w-60"
              >
                <MdOutlinePersonSearch className="h-6 w-6" /> Search User
              </button>
            </div>

            <div className="relative flex w-full flex-col md:flex-row">
              <div className="w-full md:flex-[5]">
                <div className="mb-3 mt-8 flex w-full justify-between text-3xl">
                  <h1>
                    RANKERS <span className="text-primary">INFO</span>
                  </h1>
                  <button
                    type="button"
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="block md:hidden"
                  >
                    <FaFilter className="h-7 w-7 text-primary" />
                  </button>
                </div>
                <div className="scrollbar max-h-[60vh] w-full overflow-scroll pb-3 pr-3">
                  {" "}
                  <div className="mb-2 flex h-20 w-full min-w-[800px] items-center justify-center gap-5 rounded-xl border-1 border-transparent bg-secondary p-2 pr-8 text-white transition">
                    <div className="basis-[68px]"></div>
                    <div className="flex flex-[1.5] flex-col gap-1 leading-none">
                      Name / Institution
                    </div>
                    <div className="flex-[1] text-center">Points</div>
                    <div className="flex-[1] text-center">Passing Year</div>
                    <div className="basis-[80px] gap-2 text-center">
                      Verified
                    </div>
                    <div className="basis-[80px] gap-2 text-center">
                      Selected
                    </div>
                  </div>
                  <div className="flex w-full min-w-[800px] flex-col gap-2">
                    {usersData?.map(
                      (
                        e: {
                          quizData: any;
                          id: string;
                          data: any;
                        },
                        i: number,
                      ) => {
                        return (
                          <div
                            onClick={() => {
                              setSelectedStudentData(e);
                              setSelectedStudentIndex(i);
                              onOpen();
                            }}
                            key={i}
                            className="flex h-20 w-full min-w-[800px] cursor-pointer items-center gap-5 rounded-xl border-1 border-transparent bg-white p-2 pr-8 transition hover:border-secondary_lighter"
                          >
                            <div className="basis-[68px]">
                              <img
                                src={e.data?.imageUrl}
                                className="ml-1 aspect-square w-[60px] rounded-full border p-1"
                              />
                            </div>
                            <div className="flex flex-[1.5] flex-col gap-1 leading-none">
                              <div className="Nunito font break-keep text-lg font-semibold leading-none">
                                {e.data?.name}
                              </div>
                              <div className="Nunito break-keep text-primary">
                                {" "}
                                {e.data?.institution}
                              </div>
                            </div>
                            <div className="flex-[1] text-center">
                              {" "}
                              <span className="text-lg text-primary">
                                {e.quizData?.points || e.quizData.marks}
                              </span>
                            </div>
                            <div className="flex-[1] text-center">
                              {" "}
                              <span className="text-sm">HSC-</span>
                              <span className="text-lg text-primary">
                                {e.data?.class}
                              </span>
                            </div>
                            <div
                              className={
                                "flex basis-[80px] justify-center gap-2 " +
                                (e.data?.verified
                                  ? "grayscale-[0]"
                                  : "grayscale-[1]")
                              }
                              title="Verified"
                            >
                              <FiCheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                            <div
                              className={
                                "flex basis-[80px] justify-center gap-2 " +
                                (e.data?.selected
                                  ? "grayscale-[0]"
                                  : "grayscale-[1]")
                              }
                              title="Selected"
                            >
                              <BiHeart className="h-5 w-5 text-red-400" />
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Modal
              scrollBehavior={"inside"}
              size="5xl"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-primary">
                      Student Info
                    </ModalHeader>
                    <ModalBody>
                      <EditUserData
                        allUsersData={usersData}
                        userData={selectedStudentData.data}
                        setUsersData={setUsersData}
                        i={selectedStudentIndex}
                        uid={selectedStudentData.id}
                      />

                      {params.id != "public" && (
                        <EditEventData
                          data={selectedStudentData.quizData}
                          id={params.id}
                          uid={selectedStudentData.id}
                          allData={usersData}
                          setAllData={setUsersData}
                          i={selectedStudentIndex}
                        />
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            {usersData.length >= docLimit && (
              <button
                onClick={loadMoreUsers}
                type={"button"}
                className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary md:mt-7"
              >
                <MdOutlinePersonSearch className="h-6 w-6" /> Load More Users
              </button>
            )}
          </div>
        </div>
      ) : authLoading ? (
        <Loading />
      ) : (
        <Error statusCode={403} msg="Unauthorized User" dest={"/"} />
      )}
    </>
  );
};

export default Page;

interface props {
  allUsersData: any[];
  userData: regDataType;
  setUsersData: React.Dispatch<any>;
  i: number;
  uid: string;
}

const EditUserData = ({
  allUsersData,
  userData,
  setUsersData,
  i,
  uid,
}: props) => {
  const [editUserData, setEditUserData] = useState<any>(userData);
  const [editin, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userAuth] = useAuthState(auth);

  const setValue = (fname: string, value: string | number | boolean) => {
    setEditUserData((s: regDataType) => ({ ...s, [fname]: value }));
  };

  const setValueAllUsers = () => {
    const nextUsers = allUsersData.map((e, index) => {
      if (index != i) {
        // No change
        return e;
      } else {
        return { ...e, id: uid, data: editUserData };
      }
    });
    // Re-render with the new array
    setUsersData(nextUsers);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (userAuth) {
      try {
        await updateDoc(doc(db, "participants", uid), editUserData);
        setValueAllUsers();
        toast.success("Data Updated!");
        setEditing(false);
      } catch (err) {
        toast.error("Aww Snap!");
      }
    }
    setLoading(false);
  };
  return (
    <div className="mb-4 flex w-full rounded-xl bg-white pb-8 pt-0 sm:py-0 md:pt-3">
      {editUserData ? (
        <form
          className="grid w-full grid-cols-1 gap-5 p-5 sm:p-12 md:pt-0"
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

          <div className="flex flex-col items-center justify-between md:flex-row">
            <img
              src={editUserData.imageUrl}
              alt="User Image"
              className="aspect-square size-fit w-36 rounded-full"
            />
            <Field
              state={editUserData.imageUrl}
              setValue={setValue}
              name="imageUrl"
              label="Profile Image URL"
              type="text"
              editable={editin}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
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
              state={editUserData.email}
              setValue={setValue}
              name="email"
              label="Email"
              type="text"
              editable={editin}
            />
            <Field
              state={editUserData.mobile}
              setValue={setValue}
              name="mobile"
              label="Mobile No."
              type="tel"
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
            />

            <Checkbox
              size="lg"
              isDisabled={!editin}
              isSelected={editUserData.verified}
              onValueChange={(e) => setValue("verified", e)}
            >
              Verified
            </Checkbox>
            <Checkbox
              size="lg"
              isDisabled={!editin}
              isSelected={editUserData.selected}
              onValueChange={(e) => setValue("selected", e)}
            >
              Selected
            </Checkbox>

            <Field
              state={editUserData.ndc_roll}
              setValue={setValue}
              name="ndc_roll"
              label="NDC College Roll"
              type="text"
              editable={editin}
              notRequired
            />

            <Field
              state={editUserData.ndc_id}
              setValue={setValue}
              name="ndc_id"
              label="NDITC Member Unique ID"
              type="text"
              editable={editin}
              notRequired
            />
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

const EditEventData = ({
  data,
  id,
  uid,
  allData,
  setAllData,
  i,
}: {
  data: any;
  id: string;
  uid: string;
  allData: any[];
  setAllData: React.Dispatch<any>;
  i: number;
}) => {
  const [eventData, setEventData] = useState<any>(data);

  const [error, setError] = useState("");

  const updateData = async () => {
    await updateDoc(
      doc(db, "answers", id, "eventparticipant", uid),
      eventData,
    ).catch(() => {
      setError("Error Occurred. Code 0");
      toast.error("Error Occurred 0");
    });

    await updateDoc(
      doc(db, "eventparticipant", uid, "eventsData", id),
      eventData,
    ).catch(() => {
      setError("Error Occurred. Code 1");
      toast.error("Error Occurred 1");
    });

    const nextUsers = allData.map((e, index) => {
      if (index != i) {
        // No change
        return e;
      } else {
        return { ...e, quizData: { ...eventData } };
      }
    });
    // Re-render with the new array
    setAllData(nextUsers);

    toast.success("Event Data Updated");
  };

  return (
    <div className="flex w-full flex-col items-center gap-1">
      {error == "" && eventData && eventData?.uid == uid && (
        <div className="flex flex-col items-center gap-3">
          <Field
            returnNumber
            name={"Points"}
            label={"Points"}
            type={"number"}
            state={eventData.marks || 0}
            setValue={(name: string, data: string | number) => {
              setEventData((oldData: any) => {
                return {
                  ...oldData,
                  marks: data,
                };
              });
            }}
          />

          <div>
            {eventData.answers.map((e: any, i: number) => {
              return (
                <div key={i} className="flex items-center gap-3">
                  {`${i + 1}. `}
                  <div className="flex items-center gap-3">
                    <p>{`Chosen Option: ${e.option == 0 ? "A" : e.option == 1 ? "B" : e.option == 2 ? "C" : e.option == 3 ? "D" : "Not Selected"}`}</p>
                    <p>{`Chosen Answer: ${e.answer == "" ? "Not Answered" : e.answer}`}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={updateData}
            type={"button"}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary_light px-5 py-2 text-sm leading-[1.15] text-primary_dark shadow-sm transition-colors hover:bg-primary hover:text-white focus:ring-2 focus:ring-secondary"
          >
            <FaCaretUp className="h-6 w-6" />
            Update Event Data
          </button>
        </div>
      )}
    </div>
  );
};

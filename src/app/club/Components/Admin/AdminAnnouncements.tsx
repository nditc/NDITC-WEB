import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { FormEvent, useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { CgLock, CgSpinner } from "react-icons/cg";
import { GrAnnounce } from "react-icons/gr";
import Modal from "../Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Field from "../Field";
import Textarea from "../Textarea";
import { TbTrash } from "react-icons/tb";
import { Checkbox } from "@nextui-org/checkbox";
const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [editState, setEditState] = useState<number | false>(false);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [club, setClub] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const closeModal = () => {
    setModalState(false);
    setEditState(false);
    setTitle("");
    setDesc("");
    setOrder(announcements[announcements.length - 1].order + 1 || 1580);
  };
  const loadAnnc = () => {
    getDocs(query(collection(db, "announcements"), orderBy("order")))
      .then((docs) => {
        const annc: any[] = [];
        docs.forEach((data) => {
          annc.push({ id: data.id, ...data.data() });
        });
        annc.reverse();
        setAnnouncements(annc);
      })
      .catch((err) => {
        toast.error("Announcements can't be loaded");
        console.error(err);
      });
  };
  const addAnnc = (e: FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    addDoc(collection(db, "announcements"), {
      title,
      description: desc,
      order,
      timestamp: serverTimestamp(),
      club,
    })
      .then(() => {
        toast.success("Success");
        loadAnnc();
        closeModal();
        setModalLoading(false);
      })
      .catch((err) => {
        toast.error("Announcements can't be added");
        console.error(err);
        setModalLoading(false);
      });
  };
  const deleteAnnc = (id: string) => {
    setModalLoading(true);
    deleteDoc(doc(db, "announcements", id))
      .then(() => {
        toast.success("Success");
        loadAnnc();
        closeModal();
        setModalLoading(false);
      })
      .catch((err) => {
        toast.error("Announcements can't be edited");
        console.error(err);
        setModalLoading(false);
      });
  };
  const editAnnc = (e: FormEvent, id: string) => {
    e.preventDefault();

    setModalLoading(true);
    updateDoc(doc(db, "announcements", id), { title, description: desc, order })
      .then(() => {
        toast.success("Success");
        loadAnnc();
        closeModal();
        setModalLoading(false);
      })
      .catch((err) => {
        toast.error("Announcements can't be edited");
        console.error(err);
        setModalLoading(false);
      });
  };
  useEffect(() => {
    loadAnnc();
  }, []);
  useEffect(() => {
    if (announcements.length > 0) {
      setOrder(announcements[announcements.length - 1].order + 1 || 1580);
    }
  }, [announcements]);
  useEffect(() => {
    if (editState !== false) {
      setTitle(announcements[editState].title);
      setDesc(announcements[editState].description);
      setOrder(announcements[editState].order || 1580);
      setModalState(true);
    }
  }, [editState, announcements]);
  return (
    <div className="container my-8 rounded-xl bg-white p-6 pb-2 md:p-8 md:pb-4">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-5">
          <GrAnnounce className="h-12 w-12 text-primary" />
          <h1 className="text-4xl leading-none">
            <span className="">ANNOUNCEMENTS</span>
          </h1>
        </div>
        <div>
          <button
            type={"button"}
            onClick={() => {
              setModalState(true);
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
          >
            <FaPlus className="h-6 w-6" />
            Add Announcement
          </button>
        </div>
      </div>

      <div className="my-5 flex max-h-[550px] flex-col gap-5 overflow-x-clip overflow-y-scroll">
        {announcements.map((data: any, index: number) => {
          return (
            <div className="rounded-xl bg-gray-100 p-5" key={index}>
              <h3 className="Nunito text-xl font-bold">{data.title}</h3>
              <p className="min-h-[80px] md:min-h-0">{data.description}</p>
              <p className="mb-1 mt-4 flex items-center justify-end gap-2 text-sm text-zinc-500">
                <b>{data?.club ? "Club" : null}</b>
                <span className="mr-4">Order:{data.order}</span>
                <BsClock className="h-4 w-4 text-zinc-500" />
                {new Date(data.timestamp.seconds * 1000).toDateString()}
              </p>
              <div className="flex justify-end gap-5">
                <div className="flex-1" />
                <button
                  className="font-sm l-2 ml-auto mt-2 flex items-center gap-2 self-end border-b-2 border-transparent text-right text-primary hover:border-primary"
                  onClick={() => {
                    setEditState(index);
                  }}
                >
                  <FaRegEdit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  className="font-sm l-2 ml-auto mt-2 flex items-center gap-2 self-end border-b-2 border-transparent text-right text-red-600 hover:border-red-600"
                  onClick={() => {
                    deleteAnnc(data.id);
                  }}
                >
                  <TbTrash className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal state={modalState}>
        {modalState ? (
          <div className="absolute left-1/2 top-1/2 w-[450px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
            <div className="flex justify-end">
              <button
                className="mb-5 ml-2 flex items-center gap-2 border-b-2 border-transparent text-right font-medium text-primary hover:border-primary"
                onClick={closeModal}
              >
                <LiaTimesSolid className="h-4 w-4" />
                Close
              </button>
            </div>
            <h1 className="mb-2 text-4xl">
              {editState !== false ? "EDIT" : "ADD"}{" "}
              <span className="text-primary">ANNOUNCEMENT</span>
            </h1>
            <form
              className="flex flex-col"
              onSubmit={
                editState !== false
                  ? (e) => editAnnc(e, announcements[editState].id)
                  : addAnnc
              }
            >
              <Field
                state={title}
                setValue={(name, data) => setTitle(String(data))}
                name="title"
                label="Title"
                type="text"
              />{" "}
              <Field
                state={order}
                setValue={(name, data) => setOrder(Number(data))}
                name="Order"
                type="number"
                label="Order"
              />{" "}
              <div className="my-3 ml-1">
                <Checkbox
                  size="lg"
                  isSelected={club}
                  onValueChange={setClub}
                  className=""
                >
                  <label className="text-2xl font-medium text-gray-900">
                    <span className="text-primary">NDITC</span> Notice
                  </label>
                </Checkbox>
              </div>
              <Textarea
                state={desc}
                setValue={(name, data) => setDesc(String(data))}
                name="Description"
                label="Description"
              />{" "}
              <button
                type={"submit"}
                onClick={() => {
                  setModalState(true);
                }}
                className="mt-5 inline-flex flex-1 items-center justify-center gap-2 justify-self-end rounded-lg bg-primary px-5 py-2 text-sm leading-[1.15] text-white shadow-sm transition-colors hover:bg-primary_dark hover:text-white focus:ring-2 focus:ring-secondary"
              >
                {modalLoading ? (
                  <CgSpinner className="mx-auto h-7 w-7 animate-spin text-white" />
                ) : editState !== false ? (
                  <>
                    <FaRegEdit className="h-6 w-6" />
                    Edit
                  </>
                ) : (
                  <>
                    <FaPlus className="h-6 w-6" />
                    Add
                  </>
                )}
              </button>
            </form>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Announcements;

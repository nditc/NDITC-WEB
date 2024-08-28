import { db } from '@/config/firebase';
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
} from 'firebase/firestore';
import React, { FormEvent, useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs';
import { CgLock, CgSpinner } from 'react-icons/cg';
import { GrAnnounce } from 'react-icons/gr';
import Modal from '../Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';
import { FaRegEdit } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import Field from '../Field';
import Textarea from '../Textarea';
import { TbTrash } from 'react-icons/tb';
const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [editState, setEditState] = useState<number | false>(false);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [order, setOrder] = useState<number>(0);
  const closeModal = () => {
    setModalState(false);
    setEditState(false);
    setTitle('');
    setDesc('');
    setOrder(announcements[announcements.length - 1].order + 1 || 1580);
  };
  const loadAnnc = () => {
    getDocs(query(collection(db, 'announcements'), orderBy('order')))
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
    addDoc(collection(db, 'announcements'), {
      title,
      description: desc,
      order,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        toast.success('Success');
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
    deleteDoc(doc(db, 'announcements', id))
      .then(() => {
        toast.success('Success');
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
    updateDoc(doc(db, 'announcements', id), { title, description: desc, order })
      .then(() => {
        toast.success('Success');
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
    <div className="container   p-6 md:p-8 pb-2 md:pb-4 bg-white rounded-xl my-8">
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          <GrAnnounce className="w-12 h-12 text-primary" />
          <h1 className="text-4xl leading-none">
            <span className="">ANNOUNCEMENTS</span>
          </h1>
        </div>
        <div>
          <button
            type={'button'}
            onClick={() => {
              setModalState(true);
            }}
            className="hover:bg-primary_dark hover:text-white  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
          >
            <FaPlus className="w-6 h-6" />
            Add Announcement
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 my-5 max-h-[550px]  overflow-y-scroll overflow-x-clip">
        {announcements.map((data: any, index: number) => {
          return (
            <div className="p-5 bg-gray-100 rounded-xl" key={index}>
              <h3 className="text-xl Nunito font-bold">{data.title}</h3>
              <p className="min-h-[80px] md:min-h-0">{data.description}</p>
              <p className="justify-end text-sm flex gap-2 mt-4  mb-1 items-center text-zinc-500">
                <span className="mr-4">Order:{data.order}</span>
                <BsClock className="w-4 h-4 text-zinc-500" />
                {new Date(data.timestamp.seconds * 1000).toDateString()}
              </p>
              <div className="flex justify-end gap-5">
                <div className="flex-1" />
                <button
                  className="text-primary text-right font-sm border-b-2 border-transparent hover:border-primary ml-auto mt-2 self-end l-2 flex gap-2 items-center"
                  onClick={() => {
                    setEditState(index);
                  }}
                >
                  <FaRegEdit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="text-red-600 text-right font-sm border-b-2 border-transparent hover:border-red-600 ml-auto mt-2 self-end l-2 flex gap-2 items-center"
                  onClick={() => {
                    deleteAnnc(data.id);
                  }}
                >
                  <TbTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal state={modalState}>
        {modalState ? (
          <div className="max-w-[95vw]  w-[450px] rounded-xl bg-white p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-end">
              <button
                className="text-primary text-right mb-5 font-medium border-b-2 border-transparent hover:border-primary ml-2 flex gap-2 items-center"
                onClick={closeModal}
              >
                <LiaTimesSolid className="w-4 h-4" />
                Close
              </button>
            </div>
            <h1 className="text-4xl mb-2">
              {editState !== false ? 'EDIT' : 'ADD'}{' '}
              <span className="text-primary">ANNOUNCEMENT</span>
            </h1>
            <form
              className="flex flex-col "
              onSubmit={
                editState !== false ? (e) => editAnnc(e, announcements[editState].id) : addAnnc
              }
            >
              <Field
                state={title}
                setValue={(name, data) => setTitle(String(data))}
                name="title"
                label="Title"
                type="text"
              />{' '}
              <Field
                state={order}
                setValue={(name, data) => setOrder(Number(data))}
                name="Order"
                type="number"
                label="Order"
              />{' '}
              <Textarea
                state={desc}
                setValue={(name, data) => setDesc(String(data))}
                name="Description"
                label="Description"
              />{' '}
              <button
                type={'submit'}
                onClick={() => {
                  setModalState(true);
                }}
                className="hover:bg-primary_dark mt-5  justify-self-end  hover:text-white  text-sm flex-1 justify-center  transition-colors px-5 py-2 inline-flex focus:ring-2 focus:ring-secondary bg-primary text-white items-center gap-2 rounded-lg leading-[1.15] shadow-sm"
              >
                {modalLoading ? (
                  <CgSpinner className="w-7 h-7 animate-spin text-white mx-auto" />
                ) : editState !== false ? (
                  <>
                    <FaRegEdit className="w-6 h-6" />
                    Edit
                  </>
                ) : (
                  <>
                    <FaPlus className="w-6 h-6" />
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

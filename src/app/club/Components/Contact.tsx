'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Contact = () => {
  const [sending, setSending] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showingModal, setShowingModal] = useState(false);

  useEffect(() => {
    dialogRef.current?.close();
    setShowingModal(false);
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setSending(true);
    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/contact', {
        method: 'post',
        body: formData,
      });

      formRef.current?.reset();

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }

      setSending(false);

      dialogRef.current?.showModal();
      setShowingModal(true);
    } catch (err) {
      console.error(err);
      alert('Error, please try resubmitting the form');
    }
  }

  return (
    <>
      <div className="mt-10 flex flex-col items-center bg-[#e6e6e6]">
        <dialog
          ref={dialogRef}
          className={`w-[90%] ${
            showingModal ? 'z-30' : '-z-30'
          } h-[90%] md:w-96 md:h-56 rounded-xl flex flex-col items-center justify-center`}
        >
          {showingModal && (
            <div>
              <div className="success-checkmark">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>

              <h1 className="text-black text-xl">Successfully Message Sent</h1>

              <button
                onClick={() => {
                  dialogRef.current?.close();
                  setShowingModal(false);
                }}
                className="absolute right-2 top-2 hover:scale-110 transition-all"
              >
                <IoIosCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>
          )}
        </dialog>

        <div className="w-screen flex flex-col gap-10  md:flex-row justify-center md:justify-between">
          <div className="flex-1 md:w-1/2  py-10 bg-[#e6e6e6]">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id="Contact"
              className="flex flex-col mt-7  items-center md:items-start justify-center 2xl:pl-32 container-padding"
            >
              <div className="flex flex-col md:flex-row gap-2 mb-5">
                <h1 className="text-5xl text-center md:text-left text-primary">GET IN TOUCH</h1>
                <h1 className="text-5xl text-center md:text-left">WITH US</h1>
              </div>
              <div className="mb-6 w-full md:max-w-[550px]">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  required
                  id="form-name"
                  autoComplete="name"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  className="bg-white border border-stone-400 text-gray-900 text-sm rounded-lg focus:ring-text-primary focus:border-text-primary block w-full px-6 py-4"
                />
              </div>
              <div className="mb-6 w-full md:max-w-[550px]">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  required
                  id="form-email"
                  autoComplete="email"
                  name="email"
                  placeholder="Your Email Address"
                  type="email"
                  className="bg-white border border-stone-400 text-gray-900 text-sm rounded-lg focus:ring-text-primary focus:border-text-primary block w-full px-6 py-4"
                />
              </div>
              <div className="mb-6 w-full md:max-w-[550px]">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Message
                </label>
                <textarea
                  id="form-message"
                  required
                  name="message"
                  placeholder="Type your query here....."
                  rows={5}
                  className="block resize-none w-full px-6 py-4 text-gray-900 border border-stone-400 rounded-lg bg-white sm:text-md focus:ring-text-primary focus:border-text-primary"
                />
              </div>
              {sending ? (
                <div className="text-white w-44 bg-[#1f1f1f] hover:bg-stone-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  <div className="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="before:ease relative flex items-center justify-center overflow-hidden shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-32 before:rotate-45 before:bg-text-primary before:duration-300 hover:shadow-text-primary hover:before:h-[32rem] hover:before:-translate-y-32  text-white w-44 bg-[#2c2c2c]  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
                >
                  <span className="relative z-10">Send my message</span>
                </button>
              )}
            </form>
          </div>

          <div className="relative md:w-1/2 flex-1 ">
            <iframe
              width="100%"
              height="600"
              className="h-full min-h-[500px]"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=notre%20dame%20college+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

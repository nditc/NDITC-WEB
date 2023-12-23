"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/codeCompass.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

const CodeCompass = () => {
  const [email, setEmail] = useState("");

  const [sending, setSending] = useState(false);

  const [showingModal, setShowingModal] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.close();
    setShowingModal(false);
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    /*setSending(true);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/newsletter", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }

      setSending(false);
      dialogRef.current?.showModal();
      setShowingModal(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }*/
  }

  return (
    <form onSubmit={handleSubmit} id="news_letter_card">
      <dialog
        ref={dialogRef}
        className={`w-[90%] ${
          showingModal ? "z-30" : "-z-30"
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

            <h1 className="text-black text-xl">Successfully Subscribed</h1>

            {sending ? (
              <div className="text-white w-44 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2">
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                onClick={() => {
                  dialogRef.current?.close();
                  setShowingModal(false);
                }}
                className="absolute right-2 top-2 hover:scale-110 transition-all"
              >
                <IoIosCloseCircleOutline className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </dialog>

      <h3 id="header">
        Subscribe to our <span>Newsletter</span>
      </h3>
      <p id="about">
        Code Compass is our Official newsletter. SUBSCRIBE NOW for the latest
        updates on - Club Activities - Useful Learning Resources and many more!
      </p>

      <input
        autoComplete="email"
        name="email"
        placeholder="Your Email Address"
        type="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          window.open(
            "https://nditc.us14.list-manage.com/subscribe?u=252af46a54f45725aea40941c&id=53b7f78f01",
            "_blank"
          );
        }}
        //type="submit"
        id="subscribe"
        className="hover:scale-110 transition-all"
      >
        <span>Subscribe</span>
      </button>

      <div id="cdcmps_div">
        <picture>
          <source
            media="(min-width: 460px)"
            srcSet="/image/code_compass/cdcmp_txt.png"
          />
          <source
            media="(max-width: 460px)"
            srcSet="/image/code_compass/code_compass.png"
          />
          <img src="trnsprnt.png" alt="" id="cdcmps" />
        </picture>
      </div>
      <div id="smbl_div">
        <img src="/image/code_compass/compass.png" alt="" id="smbl" />
      </div>
    </form>
  );
};

export default CodeCompass;

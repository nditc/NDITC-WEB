'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/codeCompass.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const CodeCompass = () => {
  const [email, setEmail] = useState('');

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
      <h3 id="header">
        Subscribe to our <span>Newsletter</span>
      </h3>
      <p id="about">
        Code Compass is our Official newsletter. SUBSCRIBE NOW for the latest updates on - Club
        Activities - Useful Learning Resources and many more!
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
          if (email.replaceAll(' ', '') != '') {
            setEmail('');
            window.open(
              'https://nditc.us14.list-manage.com/subscribe?u=252af46a54f45725aea40941c&id=53b7f78f01',
              '_blank'
            );
          } else {
            alert('Enter a Valid Email');
          }
        }}
        //type="submit"
        id="subscribe"
        className="hover:scale-110 transition-all"
      >
        <span>Subscribe</span>
      </button>

      <div id="cdcmps_div">
        <picture>
          <source media="(min-width: 460px)" srcSet="/image/code_compass/cdcmp_txt.png" />
          <source media="(max-width: 460px)" srcSet="/image/code_compass/code_compass.png" />
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

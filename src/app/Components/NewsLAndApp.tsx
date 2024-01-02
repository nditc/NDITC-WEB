"use client";
import { useRouter } from "next/navigation";
import "../styles/NewsLAndApp.css";
import { useState } from "react";

const NewsLAndApp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  return (
    <div className="container my-10 md:my-12 lg:my-16">
      <div id="appANDnwslttr">
        <div id="nwslttr_crd">
          <h3 id="hdr">
            Subscribe to our <span>Newsletter</span>
          </h3>
          <p id="abt">
            Code Compass is our Official newsletter. SUBSCRIBE NOW for the
            latest updates on - Club Activities - Useful Learning Resources and
            many more!
          </p>
          <div id="usr_inf">
            <input
              type="email"
              placeholder="Your Email"
              id="eml"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <button
              onClick={() => {
                if (email.replaceAll(" ", "") != "") {
                  window.open(
                    "https://nditc.us14.list-manage.com/subscribe?u=252af46a54f45725aea40941c&id=53b7f78f01",
                    "_blank"
                  );
                } else {
                  alert("Enter a valid Email");
                }
              }}
              id="sbscrb"
            >
              <span>Subscribe</span>
            </button>
          </div>
          <div id="cdcmps_div">
            <picture>
              <source
                media="(min-width: 1200px)"
                srcSet="/image/newsl_and_app/cdcmp_txt.png"
              />
              <source
                media="(max-width: 1200px)"
                srcSet="/image/newsl_and_app/code_compass.png"
              />
              <img src="" alt="" id="cdcmps" />
            </picture>
          </div>
          <div id="smbl_div">
            <img src="/image/newsl_and_app/compass.png" alt="" id="smbl" />
          </div>
        </div>

        <div id="dwnld_app_container">
          <div id="caps">
            <p id="try">Try out</p>
            <h1>
              OFFICIAL <span id="mbl">NDITC MOBILE</span>
            </h1>
          </div>
          <div id="botom">
            <span id="appl">APPLICATION</span>
            <p id="inf">
              This is a paragraph with more information about something
              important. This something has many uses and is made of 100%
              recycled material.
            </p>
            <div id="cvr_img"></div>
            <button
              onClick={() => {
                router.push(
                  "/details/https%3A%2F%2Fnditc.pythonanywhere.com%2Fprojects%2FgAAAAABklDtCA8wgOMZar9YbvFJgn8e-jFUG27Ic9aHwhx40IBCUofeQ_uoinoAgpmskv_ojJNA4I9Rgswp3RLa9wWgp6846Zg%3D%3D/project/1687651200"
                );
              }}
              id="dwnld_btn"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLAndApp;

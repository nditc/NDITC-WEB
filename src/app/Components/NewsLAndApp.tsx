"use client";
import { useRouter } from "next/navigation";
import "../styles/NewsLAndApp.css";
import { useState } from "react";
type Props = {
  gap: number;
};
const NewsLAndApp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  return (
    <div className="container mb-12">
      <div className="gap-4 md:gap-6" id="appANDnwslttr">
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
                  setEmail("");
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
              An innovative app for our IT club that serves as a centralized hub
              for club members and others. Check out our App right now to get
              connected with all Tech Enthusiasts
            </p>
            <div id="cvr_img"></div>
            <button
              onClick={() => {
                router.push(
                  "/details/U2FsdGVkX1%2BAo1HnTjk4aPrXkCt9rh1%2BNX%2FDWCpvsejwdtAoSjewOeYdKkZbh6aGaCzc66CV12V3COPzTfJdiRVwQsKY9T7hTEK5uHR6K4odMR4G%2FHndw%2BsLnz%2FamA1HVEDOV9n%2FeVAQ7U3yvYJftX0vc455XIZ3msRakGeLRfcnSfCudDzNtNO2z%2BBV3BJ3Q%2FAiKPNaCas8xNySX8iKn2q6N6OfEw4tQeh7SlogJS4%3D/project/1687651200"
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

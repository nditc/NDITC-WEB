"use client";
import { useRouter } from "next/navigation";
import "../styles/NewsLAndApp.css";
import { useState } from "react";
import Link from "next/link";
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
                    "_blank",
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
            <Link
              href="/details/61ca02bf8daf0e6c4ef079990a0232c3ed79d9d23739a7131ca100dc841d538b7a7198def108d9490751f50ddee87b83eb9d48481de53630f8587d86f5d069765b950e0ac33a533a8a01acb2c811678f1319baade6c623e241987053835600f74466d9c1945caf46435209af9cdd5589c954b4a275113eae0203d7b9137965ae9de9f97b38675880101087c25bf3adc6512956df3c9e1726bebf3a39ee601cac/project/1687651200"
              id="dwnld_btn"
              className="grid place-items-center"
            >
              Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLAndApp;

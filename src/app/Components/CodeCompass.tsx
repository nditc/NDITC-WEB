import React from 'react';
import '../styles/codeCompass.css';

const CodeCompass = () => {
  return (
    <div id="news_letter_card">
      <h3 id="header">
        Subscribe to our <span>Newsletter</span>
      </h3>
      <p id="about">
        This is a paragraph with more information about something important. This something has many
        uses and is made of 100% recycled material.
      </p>
      <input type="email" placeholder="Your Email" id="email" />
      <button id="subscribe">
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
    </div>
  );
};

export default CodeCompass;

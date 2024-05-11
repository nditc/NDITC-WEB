"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";

const Certificate = () => {
  const doc = new jsPDF();

  const [name, setName] = useState("");

  function generateImage() {
    const image = new Image();
    image.onload = function () {
      const canvas: any = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);
      ctx.font = "24px Arial";
      ctx.fillStyle = "black";

      // Calculate the text width to center align
      const textWidth = ctx.measureText(name).width;
      const x = (canvas.width - textWidth) / 2 - 5; // Calculate x position for center align
      const y = image.height / 2 - 41; // Adjust y position as needed

      ctx.fillText(name, x, y);

      // Convert canvas content to a data URL
      const dataURL = canvas.toDataURL("image/png");

      // Calculate the width and height of the image
      var imgWidth = 210; // Width of the PDF document
      var imgHeight = (image.height * imgWidth) / image.width; // Maintain aspect ratio

      // Add the image to the PDF document
      doc.addImage(dataURL, "PNG", 0, 0, imgWidth, imgHeight);

      // Save the PDF document
      doc.save("image.pdf");
      doc.save("cert");
    };

    image.src = "/cert.jpg"; // Path to your image
  }

  return (
    <div className="pt-32 pb-10 h-screen overflow-x-hidden bg-[#F6F6F6]">
      <div className="mb-5 w-64">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Name
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Your Name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          required
        />
      </div>
      <canvas id="canvas" className="hidden"></canvas>
      <button
        onClick={generateImage}
        className="hover:border-blue-500 before:ease relative flex items-center justify-center overflow-hidden shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 Bebas text-xl mt-5 py-2 font-Bebas px-7 me-2 mb-2 font-medium text-whiterounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-black text-white border-gray-600 hover:text-white hover:bg-zinc-700 rounded-lg"
      >
        <span className="relative z-10">Download</span>
      </button>
    </div>
  );
};

export default Certificate;

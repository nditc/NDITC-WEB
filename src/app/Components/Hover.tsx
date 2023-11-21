import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  text: string;
  imageLink: string;
}

const Hover = ({ text, imageLink }: Props) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative z-50">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="tblock py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
        type="button"
      >
        {text}
      </button>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        id="dropdownHover"
        className={`top-7 shadow-2xl right-0 flex transition-all duration-300 items-center w-64 justify-evenly absolute bg-white divide-y divide-gray-100 rounded-lg ${
          hover
            ? "blur-0 translate-y-0 opacity-100 z-50"
            : "blur-0 translate-y-[-9rem] opacity-0 z-[-1]"
        }`}
      >
        <Image
          src={imageLink}
          alt="Image"
          className="w-[50%] ml-2"
          width={256}
          height={256}
        />

        <ul
          className="py-2 w-[50%] text-sm text-gray-700 "
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <h6 className="text-base font-semibold block px-4 py-2">
              Activities
            </h6>
          </li>
          <li>
            <Link
              href="/events"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              Events
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              Publication
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              App
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
            >
              Workshop
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hover;

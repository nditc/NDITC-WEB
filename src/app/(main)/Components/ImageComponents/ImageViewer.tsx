import React, { useState, useRef, useEffect } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import Modal from "../ModalOverlay";
import { FaTimes } from "react-icons/fa";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "../../styles/imageViewer.css";

interface props {
  images: string[];
  state: boolean;
  close: () => void;
  initIndex?: number;
}

const ImageViewer = ({ images, state, close, initIndex }: props) => {
  const [Index, setIndex] = useState<number>(0);
  const [val, setVal] = useState<string>((Index + 1).toString());
  const [loading, setLoading] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (initIndex) {
      setLoading(true);
      setIndex(initIndex);
    }
  }, [initIndex]);
  useEffect(() => {
    setLoading(true);
    ref.current?.scrollTo({ left: Index * 4.5 * 16 });
    setVal((Index + 1).toString());
  }, [Index]);
  return (
    <Modal state={state}>
      <TransformWrapper
        initialScale={1}
        centerOnInit={true}
        centerZoomedOut={true}
      >
        {({ zoomIn, zoomOut, centerView, resetTransform }) => (
          <>
            {" "}
            {loading ? (
              <svg
                aria-hidden="true"
                className="absolute left-[calc(50%_-_1rem)] top-[calc(50%_-_1rem)] inline h-8 w-8 origin-center animate-spin fill-white text-gray-200 dark:text-gray-600"
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
            ) : null}{" "}
            <button
              onClick={() => {
                centerView(1);
                close();
              }}
              className="absolute right-3 top-7 z-[80] grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black shadow-md transition-all hover:bg-black hover:fill-white xsm:right-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setIndex((s) => (s != 0 ? s - 1 : 0));
                resetTransform();
                setTimeout(() => centerView(1, 1, "linear"), 100);
              }}
              className="absolute left-0 top-1/2 z-[80] grid h-32 w-16 -translate-y-1/2 place-items-center rounded-full text-white shadow-md transition-all md:left-8 md:h-12 md:w-12 md:bg-white md:text-black md:hover:bg-black md:hover:text-white"
            >
              <PiCaretLeftBold />
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setIndex((s) => (s != images.length - 1 ? s + 1 : s));
                resetTransform();
                setTimeout(() => centerView(1, 1, "linear"), 100);
              }}
              className="absolute right-0 top-1/2 z-[80] grid h-32 w-16 -translate-y-1/2 place-items-center rounded-full text-white shadow-md transition-all md:right-8 md:h-12 md:w-12 md:bg-white md:text-black md:hover:bg-black md:hover:text-white"
            >
              <PiCaretRightBold />
            </button>
            {/* toolbar */}
            <div className="absolute left-1/2 top-7 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-3xl bg-white shadow-md">
              <button
                onClick={() => zoomIn()}
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black transition-all hover:bg-black hover:text-white"
              >
                <BiZoomIn />
              </button>
              <div className="flex px-3 xsm:px-5">
                <input
                  onChange={(e) => {
                    setVal(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    if (e.code === "Enter" || e.code == "NumpadEnter") {
                      let val =
                        e.currentTarget.value === ""
                          ? 0
                          : Number(e.currentTarget.value);
                      if (
                        val > 0 &&
                        val <= images.length &&
                        !Number.isNaN(val)
                      ) {
                        setIndex(val - 1);
                      } else {
                        setVal((Index + 1).toString());
                      }
                    }
                  }}
                  onBlur={(e) => {
                    let val =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    if (val > 0 && val <= images.length && !Number.isNaN(val)) {
                      setIndex(val - 1);
                    } else {
                      setVal((Index + 1).toString());
                    }
                  }}
                  className={"w-7"}
                  value={val}
                ></input>
                {`/${images.length}`}
              </div>
              <button
                onClick={() => zoomOut()}
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black transition-all hover:bg-black hover:text-white"
              >
                <BiZoomOut />
              </button>
            </div>
            <div
              className={`absolute left-1/2 top-[calc(50%_+_2.5rem)] z-[70] -translate-x-1/2 -translate-y-1/2 transition-all md:top-[calc(50%_+_1.5rem)] ${
                state ? "scale-100" : "scale-0"
              }`}
            >
              <div className="grid h-[calc(90vh-5rem)] w-screen place-items-center overflow-hidden md:h-[90vh] md:w-[90vw]">
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                >
                  <img
                    style={{
                      opacity: loading ? "0" : "1",
                    }}
                    onLoad={() => {
                      resetTransform();
                      setTimeout(() => centerView(1, 1, "linear"), 100);
                      setLoading(false);
                    }}
                    className={
                      "h-[calc(90vh-7rem)] w-screen object-contain md:h-[90vh] md:w-[90vw]"
                    }
                    src={images[Index]}
                    alt="loading"
                  />
                </TransformComponent>
                <div
                  className={`mt-4 flex h-20 w-full max-w-full items-center`}
                >
                  <div
                    ref={ref}
                    className="imagescroll absolute mx-2 max-w-full shrink-0 basis-[4rem] overflow-y-visible overflow-x-scroll scroll-smooth whitespace-nowrap align-middle transition-transform"
                  >
                    {images.map((url, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "mx-1 my-4 inline-block h-16 w-16 cursor-pointer" +
                            " " +
                            (index === 0
                              ? "ml-[calc(50vw_-_2rem)] md:ml-5"
                              : index === images.length - 1
                                ? "mr-5"
                                : "")
                          }
                        >
                          <img
                            height={64}
                            width={64}
                            onClick={() => {
                              setLoading(true);
                              setIndex(index);
                              resetTransform();
                              setTimeout(() => centerView(1, 1, "linear"), 100);
                            }}
                            className={`h-full w-full rounded-md object-cover transition-all hover:brightness-75 ${
                              index === Index ? "ring-4 ring-blue-400" : ""
                            }`}
                            src={url}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </TransformWrapper>
    </Modal>
  );
};

const HOC = () => {};
export default ImageViewer;

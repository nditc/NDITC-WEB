import React, { useState, useRef, useEffect } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import Modal from '../Modal';
import { FaTimes } from 'react-icons/fa';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Image from 'next/image';
interface props {
  images: string[];
  state: boolean;
  close: () => void;
}

const ImageViewer = ({ images, state, close }: props) => {
  const [Index, setIndex] = useState<number>(0);
  const [val, setVal] = useState<string>((Index + 1).toString());
  return (
    <Modal state={state}>
      <TransformWrapper initialScale={1} centerOnInit={true} centerZoomedOut={true}>
        {({ zoomIn, zoomOut, centerView, resetTransform }) => (
          <>
            {' '}
            <button
              onClick={() => {
                centerView(1);
                close();
              }}
              className="text-black absolute z-[80] right-7 top-7 text-2xl rounded-full fill-white hover:fill-black grid place-items-center  hover:bg-white w-10 h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 " viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
            </button>
            <button
              onClick={() => {
                setIndex((s) => (s != 0 ? s - 1 : 0));
                resetTransform();
                setTimeout(() => centerView(1, 1, 'linear'), 100);
              }}
              className="transition-all z-[80] absolute left-0 md:left-8 top-1/2 -translate-y-1/2 md:bg-white text-white md:text-black grid place-items-center rounded-full md:w-12 w-16 h-32 md:h-12 md:hover:bg-black md:hover:text-white"
            >
              <PiCaretLeftBold />
            </button>
            <button
              onClick={() => {
                setIndex((s) => (s != images.length - 1 ? s + 1 : s));
                resetTransform();
                setTimeout(() => centerView(1, 1, 'linear'), 100);
              }}
              className="transition-all z-[80] absolute right-0 md:right-8 top-1/2 -translate-y-1/2 md:bg-white text-white md:text-black grid place-items-center rounded-full md:w-12 w-16 h-32 md:h-12 md:hover:bg-black md:hover:text-white"
            >
              <PiCaretRightBold />
            </button>
            {/* toolbar */}
            <div className="absolute left-1/2 z-[80] top-7 bg-white rounded-3xl -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={() => zoomIn()}
                className="transition-all  text-xl  bg-white text-black grid place-items-center rounded-full w-12  h-12 hover:bg-black hover:text-white"
              >
                <BiZoomIn />
              </button>
              <div className="px-5 flex">
                <input
                  onChange={(e) => {
                    setVal(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    console.log(e.code);
                    if (e.code === 'Enter' || e.code == 'NumpadEnter') {
                      let val = e.currentTarget.value === '' ? 0 : Number(e.currentTarget.value);
                      if (val > 0 && val <= images.length && !Number.isNaN(val)) {
                        setIndex(val - 1);
                      } else {
                        setVal((Index + 1).toString());
                      }
                    }
                  }}
                  onBlur={(e) => {
                    let val = e.target.value === '' ? 0 : Number(e.target.value);
                    if (val > 0 && val <= images.length && !Number.isNaN(val)) {
                      setIndex(val - 1);
                    } else {
                      setVal((Index + 1).toString());
                    }
                  }}
                  className={'w-7'}
                  value={val}
                ></input>
                {`/${images.length}`}
              </div>
              <button
                onClick={() => zoomOut()}
                className="transition-all  text-xl  bg-white text-black grid place-items-center rounded-full w-12  h-12 hover:bg-black hover:text-white"
              >
                <BiZoomOut />
              </button>
            </div>
            <div
              className={`absolute transition-all top-1/2 z-[70] left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                state ? 'scale-100' : 'scale-0'
              }`}
            >
              <div className="h-[calc(90vh-7rem)] mt-5 w-screen md:w-[90vw]  overflow-hidden grid place-items-center">
                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                  <img
                    onLoad={() => {
                      resetTransform();
                      setTimeout(() => centerView(1, 1, 'linear'), 100);
                    }}
                    className={'h-[calc(90vh-7rem)] w-screen md:w-[90vw] object-contain'}
                    src={images[Index]}
                    alt=""
                  />
                </TransformComponent>
              </div>
              <div className={`h-16 overflow-x-hidden  mt-5 flex w-full`}>
                <div
                  style={{
                    transform: `translateX(-${Index * 4.5 + 2.5}rem)`,
                  }}
                  className="absolute transition-transform left-1/2 flex gap-2 shrink-0 basis-[4rem] ov"
                >
                  {images.map((url, index) => {
                    return (
                      <div key={index} className="h-16 w-16 cursor-pointer">
                        <Image
                          height={64}
                          width={64}
                          onClick={() => {
                            setIndex(index);
                            resetTransform();
                            setTimeout(() => centerView(1, 1, 'linear'), 100);
                          }}
                          className={`h-full w-full object-cover rounded-md hover:brightness-75 ${
                            index === Index ? 'ring-4 ring-blue-400' : ''
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
          </>
        )}
      </TransformWrapper>
    </Modal>
  );
};

const HOC = () => {};
export default ImageViewer;

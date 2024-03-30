'use client';

import React, { useState } from 'react';
import Styles from '@/app/styles/ImageGrid.module.css';
import Image from 'next/image';
import ImageViewer from './ImageViewer';
type props = {
  images: string[];
  layoutID: number;
};
const ImageGrid = ({ images, layoutID }: props) => {
  let imgs: string[] = [];
  let layout = layoutID;
  if (!layoutID) {
    if (images.length >= 2 && images.length <= 5) {
      layout = 8 - images.length; // shortcut: if (images.length -> layoutID) then 2 -> 6, 3 -> 5, 4 -> 4, ...
    } else if (images.length > 5) {
      layout = 1;
    }
  }
  switch (layout) {
    case 1:
      imgs = images.slice(1, 6);
      break;
    case 2:
    case 3:
      imgs = images.slice(1, 5);
      break;
    case 4:
      imgs = images.slice(1, 4);
      break;
    case 5:
      imgs = images.slice(1, 3);
      break;
    case 6:
      imgs = images.slice(1, 2);
      break;
  }
  const [imageViewerState, setImageViewerState] = useState<boolean>(false);
  const [initIndex, setInitIndex] = useState<number>(0);
  return (
    <>
      {' '}
      <div className={Styles.cont + ' ' + Styles['l' + layout]}>
        {imgs.map((url, index) => {
          return (
            <a
              className={Styles.img + ' ' + Styles['i' + (index + 1)]}
              onClick={() => {
                setImageViewerState(true);
                setInitIndex(index + 1);
              }}
              key={index}
            >
              <Image
                width={780}
                height={780}
                className={Styles['i' + (index + 1)]}
                src={url}
                alt=""
              />
            </a>
          );
        })}
      </div>
      <div className="text-right font-medium hover:underline hover:text-blue-500 cursor-pointer mr-1 text-stone-500  mt-1">
        <button
          onClick={() => {
            setImageViewerState(true);
          }}
        >
          ... View More Images
        </button>
      </div>
      <ImageViewer
        close={() => {
          setImageViewerState(false);
          setInitIndex(0);
        }}
        images={images}
        state={imageViewerState}
        initIndex={initIndex}
      />
    </>
  );
};

export default ImageGrid;

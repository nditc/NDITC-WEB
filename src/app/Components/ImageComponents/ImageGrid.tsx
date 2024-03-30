'use client';

import React, { useState } from 'react';
import Styles from '@/app/styles/ImageGrid.module.css';
import Image from 'next/image';
import ImageViewer from './ImageViewer';
type props = {
  images: string[];
  layout: number;
};
const ImageGrid = ({ images, layout }: props) => {
  let imgs: string[] = [];
  if (layout === 1) {
    imgs = images.slice(1, 6);
  } else if (layout === 2 || layout === 3) {
    imgs = images.slice(1, 5);
  } else if (layout === 4) {
    imgs = images.slice(1, 4);
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

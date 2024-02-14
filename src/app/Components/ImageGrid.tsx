import React from 'react';
import Styles from '@/app/styles/ImageGrid.module.css';
type props = {
  images: string[];
  layout: '1' | '2' | '3' | '4' | '5';
};

const ImageGrid = ({ images, layout }: props) => {
  let imgs: string[] = [];
  if (layout == '1') {
    imgs = images.slice(1, 6);
  }
  return (
    <div className={Styles.cont + ' ' + Styles.l1}>
      {imgs.map((url, index) => {
        return <img key={index} className={Styles['i' + (index + 1)]} src={url} alt="" />;
      })}
    </div>
  );
};

export default ImageGrid;

'use client';
import React, { useEffect, useState, useRef } from 'react';
import '../styles/snapScroller.css';

interface Props {
  baseSize: number;
  gap: number;
  duration?: number;
  children: React.ReactNode;
}

const SnapScroller = ({ baseSize, children, gap, duration }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(baseSize);
  const [scrollLeft, setscrollLeft] = useState<number>(0);
  const previous = () => {
    scrollRef.current?.scrollTo(scrollRef.current?.scrollLeft - size + gap, 0);
  };
  const after = () => {
    scrollRef.current?.scrollTo(scrollRef.current?.scrollLeft + size + gap, 0);
  };
  useEffect(() => {
    const intID = setInterval(() => {
      if (
        scrollLeft + (scrollRef.current?.offsetWidth || 0) <=
        (scrollRef.current?.scrollWidth || 0) - 25
      ) {
        scrollRef.current?.scrollTo(scrollRef.current?.scrollLeft + size + gap, 0);
      } else {
        scrollRef.current?.scrollTo(0, 0);
      }
    }, duration || 3000);
    return () => {
      clearInterval(intID);
    };
  }, [size, scrollLeft, gap, duration]);
  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollTo(0, 0), 250);
    const sizeHandler = () => {
      let w = scrollRef.current?.clientWidth || 0;
      let n = Math.floor(w / baseSize);
      if (n > 1) {
        setSize((w + gap) / n - gap);
      } else {
        setSize(w);
      }
    };
    window.addEventListener('resize', sizeHandler);
    sizeHandler();

    return () => {
      window.removeEventListener('resize', sizeHandler);
    };
  }, [baseSize, gap]);

  return (
    <div className="relative w-full">
      {' '}
      <div
        onScroll={(e) => {
          setscrollLeft(e.currentTarget.scrollLeft);
        }}
        ref={scrollRef}
        style={{
          gridAutoColumns: size.toString() + 'px',
          gap: gap + 'px',
        }}
        className={`justify-center snap-scroller pb-12 pt-5 md:pt-8  w-full`}
      >
        {children}
      </div>
      {scrollLeft >= 25 ? (
        <button
          onClick={previous}
          className="absolute -left-3 md:-left-6 top-1/2  -translate-y-1/2 p-2 rounded-full transition-colors  bg-blue-500 shadow-lg hover:bg-blue-600 active:bg-blue-700"
        >
          <img className="w-8 h-8 invert " src="/image/lc.svg" alt="" />
        </button>
      ) : (
        ''
      )}
      {scrollLeft + (scrollRef.current?.offsetWidth || 0) <=
      (scrollRef.current?.scrollWidth || 2500) - 25 ? (
        <button
          onClick={after}
          className="absolute -right-3 md:-right-6  rotate-180 top-1/2 p-2 -translate-y-1/2 rounded-full transition-colors  bg-blue-500 shadow-lg hover:bg-blue-600 active:bg-blue-700"
        >
          <img className="w-8 h-8 invert " src="/image/lc.svg" alt="" />
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default SnapScroller;

'use client';
import React, { useEffect, useState, useRef } from 'react';
import BlogPost from './BlogPost';

interface BlogPost {
  title: string;
  date: string;
}

const BlogPostsCont = () => {
  const blogPosts: BlogPost[] = [
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '21h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '25h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '27h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '30h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '35h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '55h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '80h ago',
    },
    {
      title: 'AMD Ryzen is G.O.A.T. I obviously use Ryzen 5700G',
      date: '18h ago',
    },
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(0);
  const [scrollLeft, setscrollLeft] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollTo(0, 0), 100);
    const sizeHandler = () => {
      let w = scrollRef.current?.clientWidth || 0;
      setSize((w + 16) / Math.floor(w / 250) - 16);
    };
    window.onresize = sizeHandler;
    sizeHandler();

    return () => {
      window.onresize = null;
    };
  }, []);
  return (
    <>
      {' '}
      <div
        onScroll={(e) => {
          setscrollLeft(e.currentTarget.scrollLeft);
        }}
        ref={scrollRef}
        style={{
          gridAutoColumns: size.toString() + 'px',
        }}
        className=" justify-center snap-scroller py-5"
      >
        {blogPosts.map((e, i) => {
          return <BlogPost title={e.title} date={e.date} index={i} key={i} />;
        })}
      </div>
      {scrollLeft !== 0 ? (
        <button
          onClick={() => {
            scrollRef.current?.scrollTo(scrollRef.current?.scrollLeft - size + 16, 0);
          }}
          className="absolute -left-5 top-[17.5rem] p-2 rounded-full transition-colors  bg-blue-500 shadow-lg hover:bg-blue-600 active:bg-blue-700"
        >
          <img className="w-8 h-8 invert " src="/image/lc.svg" alt="" />
        </button>
      ) : (
        ''
      )}
      {scrollLeft + (scrollRef.current?.offsetWidth || 0) !== scrollRef.current?.scrollWidth ? (
        <button
          onClick={() => {
            scrollRef.current?.scrollTo(scrollRef.current?.scrollLeft + size + 16, 0);
          }}
          className="absolute -right-5  rotate-180 top-[17.5rem] p-2 rounded-full transition-colors  bg-blue-500 shadow-lg hover:bg-blue-600 active:bg-blue-700"
        >
          <img className="w-8 h-8 invert " src="/image/lc.svg" alt="" />
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogPostsCont;

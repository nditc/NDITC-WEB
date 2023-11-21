const SideBar = () => {
  return (
    <div className="fixed right-0 z-50 top-[50%] translate-y-[-50%]">
      <div className="h-32 w-8 rounded-full mr-1 flex flex-col bg-white items-center gap-3 justify-evenly shadow-2xl">
        <a
          href=""
          className="mix-blend-difference mt-2 hover:scale-125 transition-all"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 20"
          >
            <path d="M18.012 13.453c-.219-1.173-2.163-1.416-2.6-3.76l-.041-.217c0 .006 0-.005-.007-.038v.021l-.017-.09-.005-.025v-.006l-.265-1.418a5.406 5.406 0 0 0-5.051-4.408.973.973 0 0 0 0-.108L9.6 1.082a1 1 0 0 0-1.967.367l.434 2.325a.863.863 0 0 0 .039.1A5.409 5.409 0 0 0 4.992 9.81l.266 1.418c0-.012 0 0 .007.037v-.007l.006.032.009.046v-.01l.007.038.04.215c.439 2.345-1.286 3.275-1.067 4.447.11.586.22 1.173.749 1.074l12.7-2.377c.523-.098.413-.684.303-1.27ZM1.917 9.191h-.074a1 1 0 0 1-.924-1.07 9.446 9.446 0 0 1 2.426-5.648 1 1 0 1 1 1.482 1.343 7.466 7.466 0 0 0-1.914 4.449 1 1 0 0 1-.996.926Zm5.339 8.545A3.438 3.438 0 0 0 10 19.1a3.478 3.478 0 0 0 3.334-2.5l-6.078 1.136Z" />
          </svg>
        </a>

        <a
          href="https://www.youtube.com/@nditcofficial"
          className="mix-blend-difference hover:scale-125 transition-all"
          target="_blank"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path
              fill-rule="evenodd"
              d="M19.7 3.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.84c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.84A4.225 4.225 0 0 0 .3 3.038a30.148 30.148 0 0 0-.2 3.206v1.5c.01 1.071.076 2.142.2 3.206.094.712.363 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.15 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965c.124-1.064.19-2.135.2-3.206V6.243a30.672 30.672 0 0 0-.202-3.206ZM8.008 9.59V3.97l5.4 2.819-5.4 2.8Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>

        <a
          href="https://www.facebook.com/nditc.official"
          target="_blank"
          className="mix-blend-difference mb-2 hover:scale-125 transition-all"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 8 19"
          >
            <path
              fill-rule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SideBar;

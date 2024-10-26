'use client';

const CurrentYear = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <span className="md:text-xs text-zinc-700 text-xs sm:text-center mt-7 dark:text-zinc-400 absolute bottom-3 left-3">
      © {currentYear}{' '}
      <a href="/" className="hover:underline">
        NDITC™
      </a>
      . All Rights Reserved.
    </span>
  );
};

export default CurrentYear;

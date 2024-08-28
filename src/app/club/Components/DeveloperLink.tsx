import Link from 'next/link';
import { IoCodeSlash } from 'react-icons/io5';

const DeveloperLink = () => {
  return (
    <Link
      href="/developer"
      className="fixed right-3  bottom-6 bg-secondary text-white  rounded-full shadow-[-5px_5px_20px_10px_#00000024] flex items-end justify-end"
    >
      <IoCodeSlash className="w-6 h-6 m-3 hover:rotate-90 transition" />
    </Link>
  );
};

export default DeveloperLink;

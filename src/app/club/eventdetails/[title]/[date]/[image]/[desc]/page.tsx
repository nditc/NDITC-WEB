import { initAdmin } from "@/config/firebaseAdmin";

const page = async ({
  params,
}: {
  params: {
    title: string;
    date: string;
    image: string;
    desc: string;
  };
}) => {
  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <div className="container py-[81px]"></div>
    </main>
  );
};

export default page;

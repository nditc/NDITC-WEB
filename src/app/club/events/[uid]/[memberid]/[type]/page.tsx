import { createDecipheriv } from "crypto";

const page = ({ params }: { params: { uid: string; type: string } }) => {
  const encryption_key = "kjfofvdhjHjgrmgherTtyLJfVbshJbvQ"; // Must be 32 characters
  const initialization_vector = "X05IGQ5qdBnIqAWD"; // Must be 16 characters

  function decrypt(text: any) {
    const decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector),
    );
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      <div className="container py-[81px]">
        <h1 className="container mt-8 text-5xl">
          <span className="text-primary">ONGOING</span> EVENTS
        </h1>
      </div>
    </main>
  );
};

export default page;

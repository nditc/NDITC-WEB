import React from "react";

const InfoBox = ({
  icon,
  title,
  children,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  type?: "warning" | undefined;
}) => {
  return (
    <p
      className={`my-4 rounded-xl p-5 ${type === "warning" ? "bg-yellow-100 text-yellow-950" : "bg-zinc-100 text-zinc-950"}`}
    >
      <b className="flex items-center gap-1">
        {icon}
        {title}:
      </b>
      {children}
    </p>
  );
};

export default InfoBox;

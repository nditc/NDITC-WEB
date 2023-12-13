//import { useSearchParams } from "next/navigation";

import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { url: string } }
) => {
  const res = await fetch(params.url || "");
  if (!res.ok) {
    return NextResponse.json({ description: "No Description", notFound: true });
  } else {
    const data = await res.json();
    return NextResponse.json(data);
  }
};

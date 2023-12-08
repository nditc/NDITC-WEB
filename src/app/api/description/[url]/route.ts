//import { useSearchParams } from "next/navigation";

export const GET = async (
  req: Request,
  { params }: { params: { url: string } }
) => {
  const res = await fetch(params.url || "");
  if (!res.ok) {
    return Response.json({ description: "No Description" });
  } else {
    const data = await res.json();
    //console.log(data);
    return Response.json(data);
  }
};

//import { useSearchParams } from "next/navigation";

import { NextResponse } from 'next/server';

export const GET = async (req: Request, props: { params: Promise<{ url: string }> }) => {
  const params = await props.params;
  const res = await fetch(params.url || '', { cache: 'no-store' });
  if (!res.ok) {
    return NextResponse.json({ description: 'No Description', notFound: true });
  } else {
    const data = await res.json();
    return NextResponse.json(data);
  }
};

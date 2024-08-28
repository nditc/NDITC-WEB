import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const ids = process.env.ADMIN_IDS?.split(',');
  const data = await req.json();
  if (ids?.includes(data.id)) {
    return NextResponse.json({ auth: true });
  } else {
    return NextResponse.json({ auth: false });
  }
}

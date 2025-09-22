import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { path } = await req.json();
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true });
    }
    return NextResponse.json({ error: 'Missing path to revalidate' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}

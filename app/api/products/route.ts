import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();
    const category = searchParams.get('category')?.trim();
    const limit = Math.min(Number(searchParams.get('limit') || 24), 50);

    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
      take: Number.isFinite(limit) ? limit : 24,
    });

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: 'Unable to load products.' }, { status: 500 });
  }
}

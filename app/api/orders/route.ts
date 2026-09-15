import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];
    const address = typeof body.address === 'string' ? body.address.trim() : '';
    if (!items.length || !address) return NextResponse.json({ error: 'Items and delivery address are required.' }, { status: 400 });

    const ids = items.map((item: { productId?: string }) => item.productId).filter(Boolean);
    const products = await prisma.product.findMany({ where: { id: { in: ids }, active: true } });
    const productMap = new Map(products.map((product) => [product.id, product]));
    const orderItems = items.map((item: { productId?: string; quantity?: number }) => {
      const product = item.productId ? productMap.get(item.productId) : undefined;
      const quantity = Math.max(1, Math.floor(Number(item.quantity || 1)));
      if (!product || product.stock < quantity) throw new Error('PRODUCT_UNAVAILABLE');
      return { productId: product.id, quantity, price: product.price };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal >= 499 ? 0 : 39;
    const order = await prisma.order.create({ data: { address, subtotal, deliveryFee, total: subtotal + deliveryFee, items: { create: orderItems } }, include: { items: true } });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'PRODUCT_UNAVAILABLE') return NextResponse.json({ error: 'One or more products are unavailable.' }, { status: 409 });
    return NextResponse.json({ error: 'Unable to create order.' }, { status: 500 });
  }
}

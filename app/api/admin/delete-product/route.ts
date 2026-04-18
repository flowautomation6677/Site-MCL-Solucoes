import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Temporary admin endpoint — remove after use

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        const all = await prisma.product.findMany({ select: { slug: true, name: true } });
        return NextResponse.json({ count: all.length, products: all });
    }

    const product = await prisma.product.findUnique({ where: { slug } });
    return NextResponse.json({ found: !!product, product });
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    const product = await prisma.product.create({ data: body });

    return NextResponse.json({ message: 'Product created successfully', product });
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { slug } });

    if (!product) {
        return NextResponse.json({ error: 'Product not found', slug }, { status: 404 });
    }

    await prisma.product.delete({ where: { slug } });

    return NextResponse.json({ message: 'Product deleted successfully', deleted: product.name });
}

import { create, getAll } from "@/lib/transactions";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: getAll() });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTransaction = create(body);
  return NextResponse.json({ data: newTransaction }, { status: 201 });
}

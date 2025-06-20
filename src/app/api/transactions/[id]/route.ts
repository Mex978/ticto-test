import { NextRequest, NextResponse } from "next/server";
import { remove } from "@/lib/transactions";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = remove(id);

  if (!success) {
    return NextResponse.json(
      { error: "Transação não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

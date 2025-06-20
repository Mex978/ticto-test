import { NextResponse } from "next/server";
import { remove } from "@/lib/transactions";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const success = remove(params.id);

  if (!success) {
    return NextResponse.json(
      { error: "Transação não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

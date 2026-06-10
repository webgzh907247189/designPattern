import { NextResponse, NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  console.log("outer--outer--outer--outer--outer--outer--outer");

  return NextResponse.next();
}

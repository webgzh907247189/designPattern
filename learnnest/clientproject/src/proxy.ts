import { NextResponse, NextRequest } from "next/server";
// import type { NextRequest } from 'next/request'

export function proxy(request: NextRequest) {
  console.log("inner--inner--inner--inner--inner--inner--inner");
  return NextResponse.next();
}

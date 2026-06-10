import { NextResponse } from 'next/server';

export async function GET() {
  const data = { name: '张三', age: 25 };
  
  return NextResponse.json(data);
}
// src/app/api/auth/logout/route.ts
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  // Cria um cookie que expira no passado para removê-lo
  const serializedCookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1, // Expira imediatamente
    path: '/',
  });

  return new Response(JSON.stringify({ message: 'Logout bem-sucedido.' }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
}
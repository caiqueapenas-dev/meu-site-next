// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Guarde esta chave em um local seguro! Idealmente, no seu .env.local
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-deve-ser-longa-e-segura';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Suas credenciais. Em um projeto real, isso viria de um banco de dados.
    const correct_username = 'admin';
    const correct_password = '$r0ot_PHP/h0m3'; // Use sua senha segura aqui

    if (username === correct_username && password === correct_password) {
      // Credenciais corretas, crie o token
      const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: '1h', // Token expira em 1 hora
      });

      // Serializa o cookie para ser enviado no cabeçalho da resposta
      const serializedCookie = serialize('authToken', token, {
        httpOnly: true, // Impede acesso via JavaScript no cliente (mais seguro)
        secure: process.env.NODE_ENV !== 'development', // Use secure em produção
        maxAge: 60 * 60, // 1 hora
        path: '/',
      });

      return new Response(JSON.stringify({ message: 'Login bem-sucedido!' }), {
        status: 200,
        headers: { 'Set-Cookie': serializedCookie },
      });
    } else {
      // Credenciais incorretas
      return NextResponse.json({ message: 'Nome de usuário ou senha incorretos.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Erro no servidor.' }, { status: 500 });
  }
}
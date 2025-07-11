// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o token do cookie da requisição
  const token = request.cookies.get('authToken')?.value;

  // Se o usuário está tentando acessar o dashboard sem um token,
  // redireciona para a página de login.
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário está logado e tenta acessar a página de login,
  // redireciona para o dashboard.
  if (token && request.nextUrl.pathname.startsWith('/login')) {
     return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Define quais rotas serão protegidas pelo middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
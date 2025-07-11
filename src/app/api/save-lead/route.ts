import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, instagram, field, lgpdAccepted } = body;

    // Aqui você adicionaria a lógica para salvar os dados no seu banco de dados
    // Por exemplo, usando o mysql2 que você já tem como dependência.
    console.log('Recebido para salvar:', { name, email, phone, instagram, field, lgpdAccepted });

    // Simulação de sucesso
    return NextResponse.json({ message: 'Lead salvo com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro na API:', error);
    // Verificando se o erro tem uma propriedade 'message'
    const errorMessage = error instanceof Error ? error.message : 'Erro interno no servidor.';
    return NextResponse.json({ message: 'Erro ao salvar o lead.', error: errorMessage }, { status: 500 });
  }
}
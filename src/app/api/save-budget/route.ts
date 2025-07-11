import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, budgetDetails } = body;

    // Ação: Aqui você colocaria a lógica para salvar o orçamento no banco de dados.
    // Por enquanto, vamos apenas registrar no console para confirmar o recebimento.
    console.log(`Orçamento recebido para o e-mail: ${email}`);
    console.log('Detalhes:', budgetDetails);

    // Simula uma resposta de sucesso para o front-end
    return NextResponse.json({ message: 'Orçamento salvo com sucesso no servidor!' }, { status: 200 });

  } catch (error) {
    console.error('Erro na API /api/save-budget:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro interno no servidor.';

    return NextResponse.json({ message: 'Erro ao salvar o orçamento.', error: errorMessage }, { status: 500 });
  }
}
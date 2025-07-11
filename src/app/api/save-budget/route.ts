// src/app/api/save-budget/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Importa a conexão do banco

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, budgetDetails } = body;

    if (!email || !budgetDetails) {
      return NextResponse.json({ message: 'Dados do orçamento incompletos.' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    // Query para inserir o orçamento.
    const [result] = await connection.execute(
          'INSERT INTO budgets (user_email, budget_details) VALUES (?, ?)', // [!code ++]
          [email, budgetDetails]
        );

    connection.release();

    return NextResponse.json({ message: 'Orçamento salvo com sucesso!', budgetId: (result as any).insertId }, { status: 201 });

  } catch (error) {
    console.error('Erro na API /api/save-budget:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro interno no servidor.';
    return NextResponse.json({ message: 'Erro ao salvar o orçamento.', error: errorMessage }, { status: 500 });
  }
}
// src/app/api/save-lead/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Importa a conexão do banco

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, instagram, field } = body;

    // Validação simples para garantir que os dados essenciais existem
    if (!name || !email || !phone || !field) {
      return NextResponse.json({ message: 'Dados incompletos.' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    // Query para inserir o novo lead. O uso de '?' previne SQL Injection.
    const [result] = await connection.execute(
      'INSERT INTO leads (name, email, phone, instagram, field) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, instagram || null, field] // Usa null se o instagram não for preenchido
    ) as [{ insertId: number }, unknown];

    connection.release(); // Libera a conexão de volta para o pool

    return NextResponse.json({ message: 'Lead salvo com sucesso!', leadId: result.insertId }, { status: 201 });

  } catch (error) {
    console.error('Erro na API /api/save-lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro interno no servidor.';
    return NextResponse.json({ message: 'Erro ao salvar o lead.', error: errorMessage }, { status: 500 });
  }
}
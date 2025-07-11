import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(
  request: Request,
  context: { params: { id: string } } // Altere o nome do segundo argumento para 'context'
) {
  const id = context.params.id; // Acesse o id a partir de context.params
  // ... o resto da função permanece igual ...
  if (!id) {
    return NextResponse.json({ message: 'ID do lead não fornecido.' }, { status: 400 });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute('SELECT email FROM leads WHERE id = ?', [id]) as [Array<{ email: string }>, unknown];

    if (rows.length === 0) {
      await connection.rollback();
      connection.release();
      return NextResponse.json({ message: 'Lead não encontrado.' }, { status: 404 });
    }

    const email = rows[0].email;

    await connection.execute('DELETE FROM leads WHERE id = ?', [id]);
    await connection.execute('DELETE FROM budgets WHERE user_email = ?', [email]);

    await connection.commit();

    connection.release();
    return NextResponse.json({ message: 'Lead e orçamentos associados foram excluídos com sucesso.' });

  } catch (error) {
    await connection.rollback();
    connection.release();

    console.error('Erro ao deletar o lead:', error);
    return NextResponse.json({ message: 'Erro ao deletar o lead.' }, { status: 500 });
  }
}

// Função para lidar com requisições PUT (Update)
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  try {
    const body = await request.json();
    const { name, email, phone, instagram, field } = body;

    // Validação simples
    if (!id || !name || !email || !field) {
      return NextResponse.json({ message: 'Dados incompletos.' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    const query = `
      UPDATE leads 
      SET name = ?, email = ?, phone = ?, instagram = ?, field = ? 
      WHERE id = ?
    `;

    await connection.execute(query, [name, email, phone, instagram, field, id]);
    connection.release();

    return NextResponse.json({ message: 'Lead atualizado com sucesso!' });

  } catch (error) {
    console.error(`Erro ao atualizar o lead ${id}:`, error);
    return NextResponse.json({ message: 'Erro ao atualizar o lead.' }, { status: 500 });
  }
}
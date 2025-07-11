// src/app/api/leads/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Importa nossa conexão

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // Esta é a mesma query poderosa do seu dashboard.php
    const query = `
      SELECT 
        l.id, l.name, l.email, l.phone, l.instagram, l.field,
        GROUP_CONCAT(b.budget_details ORDER BY b.created_at DESC SEPARATOR '|||') as all_budgets,
        GROUP_CONCAT(b.created_at ORDER BY b.created_at DESC SEPARATOR '|||') as all_dates
      FROM 
        leads l
      LEFT JOIN 
        budgets b ON l.email = b.user_email
      GROUP BY
        l.email
      ORDER BY 
        MAX(l.id) DESC
    `;

    const [rows] = await connection.query(query);
    connection.release();

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json({ message: "Erro ao buscar dados do servidor." }, { status: 500 });
  }
}
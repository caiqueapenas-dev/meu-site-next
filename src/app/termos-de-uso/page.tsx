import React from 'react';

const TermosDeUso: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Termos de Uso</h1>
        <div className="space-y-4 text-slate-400">
          <p>Bem-vindo ao nosso site. Se você continuar a navegar e usar este site, você concorda em cumprir e se vincular aos seguintes termos e condições de uso, que juntamente com nossa política de privacidade regem o relacionamento do nosso site com você em relação a este site.</p>
          <h2 className="text-xl font-semibold text-white pt-4">Uso do Site</h2>
          <p>O conteúdo das páginas deste site é para sua informação geral e uso apenas. Ele está sujeito a alterações sem aviso prévio.</p>
          <p>Nem nós nem terceiros fornecemos qualquer garantia ou garantia quanto à precisão, pontualidade, desempenho, integridade ou adequação das informações e materiais encontrados ou oferecidos neste site para qualquer finalidade específica. Você reconhece que tais informações e materiais могут conter imprecisões ou erros e nós expressamente excluímos a responsabilidade por quaisquer imprecisões ou erros na máxima extensão permitida por lei.</p>
          <h2 className="text-xl font-semibold text-white pt-4">Propriedade Intelectual</h2>
          <p>Este site contém material que é de nossa propriedade ou licenciado para nós. Este material inclui, mas não está limitado a, design, layout, aparência, aparência e gráficos. A reprodução é proibida, exceto de acordo com o aviso de direitos autorais, que faz parte destes termos e condições.</p>
        </div>
      </div>
    </div>
  );
};

export default TermosDeUso;
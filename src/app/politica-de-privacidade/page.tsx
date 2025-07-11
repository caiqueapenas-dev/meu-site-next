import React from 'react';

const PoliticaDePrivacidade: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidade</h1>
        <div className="space-y-4 text-slate-400">
          <p>Esta página informa sobre nossas políticas em relação à coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço e as opções que você associou a esses dados.</p>
          <h2 className="text-xl font-semibold text-white pt-4">Coleta e Uso de Informações</h2>
          <p>Coletamos vários tipos de informações para diversos fins, para fornecer e melhorar nosso Serviço para você.</p>
          <h3 className="text-lg font-semibold text-white pt-2">Tipos de Dados Coletados</h3>
          <p><strong>Dados Pessoais:</strong> Ao usar nosso Serviço, podemos solicitar que você nos forneça algumas informações de identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo ("Dados Pessoais"). As informações pessoalmente identificáveis podem incluir, mas não estão limitadas a: Nome, E-mail, Telefone, Instagram e Área de Atuação.</p>
          <h2 className="text-xl font-semibold text-white pt-4">Uso de Dados</h2>
          <p>O site usa os dados coletados para vários fins: Para fornecer e manter nosso Serviço; Para notificá-lo sobre alterações em nosso Serviço; Para permitir que você participe de recursos interativos de nosso Serviço quando optar por fazê-lo; Para fornecer suporte ao cliente; Para coletar análises ou informações valiosas para que possamos melhorar nosso Serviço; Para monitorar o uso de nosso Serviço; Para detectar, prevenir e resolver problemas técnicos.</p>
          <h2 className="text-xl font-semibold text-white pt-4">Segurança dos Dados</h2>
          <p>A segurança de seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.</p>
        </div>
      </div>
    </div>
  );
};

export default PoliticaDePrivacidade;
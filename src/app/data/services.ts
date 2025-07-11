import { ServiceCategory } from '../types';

export const services: ServiceCategory[] = [
  {
    category: 'Social media',
    description: 'Crie conexões com sua audiência e fortaleça sua marca com um gerenciamento estratégico e consistente das suas redes sociais.',
    items: [
      {
        id: 'sm_publicacao',
        name: 'Publicação Automática',
        price: 449.10,
        type: 'checkbox',
        billing: 'monthly',
        description: 'Agendamento e publicação dos posts no seu perfil.',
        unit: '',
        deliverables: [
          'Publicação de 3 posts por semana',
          'Relatório de desempenho mensal',
          'Suporte via WhatsApp'
        ]
      },
      {
        id: 'sm_configuracao',
         name: 'Otimização de Perfil (Instagram)',
         price: 299.40,
         type: 'checkbox',
         billing: 'once',
         description: 'Ajuste completo de bio, destaques, links e segurança.',
         unit: '',
         deliverables: [
          'Análise completa do perfil atual',
          'Criação de 5 destaques estratégicos',
          'Configuração de segurança (2FA)'
        ]
      },
      {
        id: 'sm_engajamento',
        name: 'Engajamento com Audiência',
        price: 748.50,
        type: 'checkbox',
        billing: 'monthly',
        description: 'Resposta a comentários e interações dos seguidores.',
        unit: '',
        deliverables: [
          'Respostas a todos os comentários em até 24h',
          'Interação com 10 perfis estratégicos por dia',
          'Não inclui resposta a DMs'
        ]
      }
    ]
  },
  {
    category: 'Criação de artes gráficas',
    description: 'Capture a atenção com um design que fala pelo seu negócio e diferencia sua marca no mercado.',
    items: [
      {
        id: 'card_carrossel',
        name: 'Carrossel',
        price: 80,
        type: 'quantity',
        billing: 'once',
        description: 'Criação de arte para post em formato carrossel com até 10 slides.',
        unit: '/unidade',
        deliverables: [
          'Design de até 10 slides',
          'Uso de identidade visual da marca',
          'Entrega em formato PNG'
        ]
      },
      {
        id: 'card_feed',
        name: 'Post para feed',
        price: 40,
        type: 'quantity',
        billing: 'once',
        description: 'Criação de arte para post de imagem única no feed.',
        unit: '/unidade',
        deliverables: [
          'Design de imagem única (1080x1350) vertical',
          'Uso de identidade visual da marca',
          'Entrega em formato PNG'
        ]
      },
      {
        id: 'card_story',
        name: 'Post para story',
        price: 40,
        type: 'quantity',
        billing: 'once',
        description: 'Criação de arte para stories, ideal para avisos, agendas e comunicados.',
        unit: '/unidade',
        deliverables: [
          'Design de imagem única (1080x1920) story',
          'Uso de identidade visual da marca',
          'Entrega em formato PNG'
        ]
      }
    ]
  },
  {
    category: 'Edição de vídeo',
    description: 'Converta vídeos brutos em histórias que engajam e prendem a atenção do início ao fim.',
    items: [
      {
        id: 'video_30s',
        name: 'Vídeo até 30s',
        price: 60,
        type: 'quantity',
        billing: 'once',
        description: 'Edição completa com legendas, música e efeitos.',
        unit: '/unidade',
        deliverables: [
          'Cortes e transições dinâmicas',
          'Legendas animadas',
          'Trilha sonora livre de direitos autorais'
        ]
      },
      {
        id: 'video_60s',
        name: 'Vídeo até 60s',
        price: 100,
        type: 'quantity',
        billing: 'once',
        description: 'Edição completa com legendas, música e efeitos.',
        unit: '/unidade',
        deliverables: [
          'Tudo do plano anterior',
          'Tratamento de cor e luz básico',
          'Melhoria de áudio'
        ]
      },
      {
        id: 'video_3min',
        name: 'Vídeo até 3min',
        price: 280,
        type: 'quantity',
        billing: 'once',
        description: 'Edição completa com legendas, música e efeitos.',
        unit: '/unidade',
        deliverables: [
          'Tudo do plano anterior',
          'Animações gráficas simples',
          'Introdução e finalização (intro/outro)'
        ]
      },
      {
        id: 'video_15min',
        name: 'Vídeo até 15min',
        price: 400,
        type: 'quantity',
        billing: 'once',
        description: 'Edição completa com legendas, música e efeitos.',
        unit: '/unidade',
        deliverables: [
          'Tudo do plano anterior',
          'Múltiplos ângulos de câmera (se fornecido)',
          'Qualidade de exportação em até 4k'
        ]
      }
    ]
  },
  {
    category: 'Tráfego pago',
    description: 'Alcance, dentro da sua cidade, as pessoas certas no momento certo com campanhas otimizadas para gerar leads, visibilidade e vendas.',
    items: [
      {
        id: 'trafego_gestao',
        name: 'Gestão de Tráfego',
        price: 997,
        type: 'fixed',
        billing: 'monthly',
        description: 'Serviço completo de gestão de anúncios, estratégia e otimização.',
        unit: '/mês',
        deliverables: [
          'Criação e gestão de campanhas',
          'Otimização diária de anúncios',
          'Relatório de resultados quinzenal',
          'Reunião estratégica mensal'
        ]
      }
    ]
  },
  {
     category: 'Google Meu Negócio (GMN)',
     description: 'Apareça no topo das pesquisas do Google, seja a primeira opção para clientes na sua região e domine as buscas locais.',
     items: [
       {
         id: 'gmn_setup',
         name: 'Configuração inicial do GMN',
         price: 997,
         type: 'fixed',
         billing: 'once',
         description: 'Criação, configuração e otimização completa do seu perfil.',
         unit: '',
                  deliverables: [
           'Criação e verificação do perfil',
           'Otimização de SEO local',
           'Cadastro de 10 produtos/serviços iniciais'
         ]
       },
       {
         id: 'gmn_mensal',
         name: 'Gestão mensal do GMN',
         price: 349,
         type: 'fixed',
         billing: 'monthly',
         description: 'Gerenciamento contínuo do seu perfil, postagens e avaliações.',
         unit: '/mês',
         deliverables: [
          '4 postagens mensais',
          'Resposta a todas as avaliações',
          'Atualização de horário e informações'
        ]
      }
    ]
  },
  {
    category: 'Criação de site',
    description: 'Desenvolvemos sites institucionais e landing pages de alta conversão para fortalecer sua presença online.',
    items: [
      {
        id: 'site_institucional',
        name: 'Criação de site',
        price: 0,
        type: 'fixed',
        billing: 'once',
        description: 'Serviço disponível em breve.',
        unit: '',
        deliverables: [],
        status: 'soon'
      }
    ]
  }
];
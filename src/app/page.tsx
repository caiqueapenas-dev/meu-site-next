"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Users2, Palette, Film, MousePointerClick, MapPin, MonitorSmartphone, ShieldCheck, Target, Rocket, Plus, Minus } from 'lucide-react';

// Componente para o Acordeão do FAQ
const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-300 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-[#022b3a]"
            >
                <span>{question}</span>
                {isOpen ? <Minus className="w-5 h-5 text-[#0496ff]" /> : <Plus className="w-5 h-5 text-gray-500" />}
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="pt-4 text-gray-700 leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Componente para o Carrossel de Estatísticas
const StatsCarousel: React.FC = () => {
    const stats = [
        { value: "+26", label: "Clientes Atendidos" },
        { value: "+R$70 mil", label: "Gerenciados em Anúncios" },
        { value: "100%", label: "Conforme as Normas (CFM, CRN, CRO, etc.)" },
        { value: "Aluno", label: "Pedro Sobral (Subido)" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
                setIsFading(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, [stats.length]);

    return (
        <div className={`text-center text-[#022b3a] transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-3xl font-bold">{stats[currentIndex].value}</p>
            <p className="text-sm">{stats[currentIndex].label}</p>
        </div>
    );
};


// Componente Principal da LandingPage - agora é a Home Page
export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const budgetLink = "/marketing-budget";

    const handleMenuLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-[#e1e5f2]">
            <header className="bg-[#022b3a] text-[#ffffff] shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="#home" className="text-2xl font-bold">Carlos Henrique</Link>
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link href="#servicos" className="hover:text-[#0496ff] transition-colors duration-300">Serviços</Link>
                        <Link href="#metodologia" className="hover:text-[#0496ff] transition-colors duration-300">Meu Método</Link>
                        <Link href="#sobre" className="hover:text-[#0496ff] transition-colors duration-300">Sobre Mim</Link>
                        <Link href="#faq" className="hover:text-[#0496ff] transition-colors duration-300">FAQ</Link>
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-2 px-5 rounded-lg cta-button">
                            Fazer Orçamento
                        </Link>
                    </nav>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white focus:outline-none">
                        <Menu size={24} />
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-[#022b3a] px-6 pb-4">
                        <Link href="#servicos" onClick={handleMenuLinkClick} className="block py-2 text-white hover:text-[#0496ff]">Serviços</Link>
                        <Link href="#metodologia" onClick={handleMenuLinkClick} className="block py-2 text-white hover:text-[#0496ff]">Meu Método</Link>
                        <Link href="#sobre" onClick={handleMenuLinkClick} className="block py-2 text-white hover:text-[#0496ff]">Sobre Mim</Link>
                        <Link href="#faq" onClick={handleMenuLinkClick} className="block py-2 text-white hover:text-[#0496ff]">FAQ</Link>
                        <Link href={budgetLink} onClick={handleMenuLinkClick} className="block mt-2 text-center bg-[#0496ff] text-white font-bold py-2 px-5 rounded-lg cta-button">
                            Fazer Orçamento
                        </Link>
                    </div>
                )}
            </header>

            <main>
                <section id="home" className="bg-[#022b3a] text-white py-20 md:py-32">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Encontre o especialista certo para o seu marketing digital</h2>
                        <p className="text-lg md:text-xl text-[#e1e5f2] max-w-3xl mx-auto mb-8">Monte o seu próprio orçamento de marketing digital – rápido e sem complicação.</p>
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-4 px-10 rounded-lg text-lg inline-block cta-button">
                            Faça seu orçamento em menos de 1 minuto
                        </Link>
                    </div>
                </section>
                
                <section id="confianca" className="bg-slate-50 py-8">
                    <div className="container mx-auto px-6 h-16 flex justify-center items-center">
                        <StatsCarousel />
                    </div>
                    <div className="text-center mt-12">
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-3 px-8 rounded-lg text-lg inline-block cta-button">
                            Personalize os serviços e veja o preço
                        </Link>
                    </div>
                </section>

                <section id="servicos" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-bold text-[#022b3a]">Soluções para as Dores do seu Marketing</h3>
                            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">Com foco em clínicas e profissionais de saúde, ofereço um ecossistema completo para que você se preocupe menos com divulgação e mais com seus pacientes.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#a5be00] service-card transition-all duration-300"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#e1e5f2] mx-auto mb-5"><Users2 size={32} strokeWidth={2} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold text-[#022b3a] mb-3">Social Media</h4><p className="text-gray-700 font-semibold mb-2 text-left">Ideal para quem:</p><ul className="text-sm text-gray-600 list-disc list-inside text-left space-y-1"><li>Tem pouco tempo para gerenciar as redes</li><li>Percebe o baixo engajamento e crescimento lento</li><li>Possui dificuldade em criar conteúdo relevante</li></ul></div>
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#a5be00] service-card transition-all duration-300"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#e1e5f2] mx-auto mb-5"><Palette size={32} strokeWidth={2} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold text-[#022b3a] mb-3">Artes Gráficas</h4><p className="text-gray-700 font-semibold mb-2 text-left">Ideal para quem:</p><ul className="text-sm text-gray-600 list-disc list-inside text-left space-y-1"><li>Sente que a imagem da marca é amadora</li><li>Tem dificuldade em transmitir a mensagem certa</li><li>Perde tempo tentando criar artes sem habilidade</li></ul></div>
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#a5be00] service-card transition-all duration-300"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#e1e5f2] mx-auto mb-5"><Film size={32} strokeWidth={2} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold text-[#022b3a] mb-3">Edição de Vídeo</h4><p className="text-gray-700 font-semibold mb-2 text-left">Ideal para quem:</p><ul className="text-sm text-gray-600 list-disc list-inside text-left space-y-1"><li>Gravou muitos vídeos mas não sabe como editar</li><li>Perde a atenção do público com vídeos sem impacto</li><li>Não domina softwares de edição</li></ul></div>
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#a5be00] service-card transition-all duration-300"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#e1e5f2] mx-auto mb-5"><MousePointerClick size={32} strokeWidth={2} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold text-[#022b3a] mb-3">Tráfego Pago</h4><p className="text-gray-700 font-semibold mb-2 text-left">Ideal para quem:</p><ul className="text-sm text-gray-600 list-disc list-inside text-left space-y-1"><li>Não sabe anunciar de forma eficiente</li><li>Perde dinheiro com campanhas mal configuradas</li><li>Tem baixa geração de leads e vendas</li></ul></div>
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#a5be00] service-card transition-all duration-300"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#e1e5f2] mx-auto mb-5"><MapPin size={32} strokeWidth={2} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold text-[#022b3a] mb-3">Google Meu Negócio</h4><p className="text-gray-700 font-semibold mb-2 text-left">Ideal para quem:</p><ul className="text-sm text-gray-600 list-disc list-inside text-left space-y-1"><li>Está invisível nas buscas locais</li><li>Tem um perfil desatualizado ou mal otimizado</li><li>Perde clientes para concorrentes próximos</li></ul></div>
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#a5be00] service-card transition-all duration-300"><div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#e1e5f2] mx-auto mb-5"><MonitorSmartphone size={32} strokeWidth={2} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold text-[#022b3a] mb-3">Criação de Sites</h4><p className="text-gray-700">Desenvolvemos sites e landing pages de alta conversão para fortalecer sua presença online e centralizar suas vendas.</p></div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-3 px-8 rounded-lg text-lg inline-block cta-button">
                            Veja o preço em poucos cliques
                        </Link>
                    </div>
                </section>
                
                <section id="diferenciais" className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-bold text-[#022b3a]">Chega de ser apenas mais um número.</h3>
                            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">Enquanto agências atendem dezenas de clientes com a mesma fórmula, eu ofereço uma parceria profunda, personalizada e focada no seu resultado.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-md"><h4 className="font-bold text-xl text-[#022b3a] mb-2">Parceria Estratégica</h4><p className="text-gray-700">Você não terá um 'gerente de contas'. Você terá a mim, Carlos, um estrategista que mergulha no seu negócio, entende sua história e respeita seu tempo e investimento.</p></div>
                            <div className="bg-white p-6 rounded-lg shadow-md"><h4 className="font-bold text-xl text-[#022b3a] mb-2">Conformidade e Ética</h4><p className="text-gray-700">Atuo com total conhecimento das normas de publicidade para a área da saúde (CFM, CRO,  CFP, CRN, etc). Sua comunicação estará sempre ética, profissional e segura.</p></div>
                            <div className="bg-white p-6 rounded-lg shadow-md"><h4 className="font-bold text-xl text-[#022b3a] mb-2">Eficiência e Organização</h4><p className="text-gray-700">Minha filosofia é clara: organização gera produtividade. Otimizamos processos e eliminamos reuniões desnecessárias, para que seu tempo seja usado no que realmente importa.</p></div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-3 px-8 rounded-lg text-lg inline-block cta-button">
                            Descubra o valor na hora
                        </Link>
                    </div>
                </section>

                <section id="metodologia" className="py-20 bg-[#022b3a] text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-bold">Meu Método: O Jogo Completo para Vencer no Digital</h3>
                            <p className="text-[#e1e5f2] mt-3 max-w-3xl mx-auto">Encaro o marketing como uma partida de futebol, onde cada setor tem uma função vital para a vitória.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                            <div className="text-center"><div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#a5be00] mx-auto mb-5"><ShieldCheck size={40} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold mb-3">Defesa: Conteúdo de Valor</h4><p className="text-[#e1e5f2]">Construímos uma base sólida com conteúdo que educa, engaja e fortalece sua autoridade, atraindo o público certo e protegendo sua marca de ser esquecida.</p></div>
                            <div className="text-center"><div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#a5be00] mx-auto mb-5"><Target size={40} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold mb-3">Meio de Campo: Distribuição Inteligente</h4><p className="text-[#e1e5f2]">Com tráfego pago estratégico (Meta Ads), distribuímos seu conteúdo para as pessoas certas, no momento certo, garantindo que sua mensagem chegue a quem realmente importa.</p></div>
                            <div className="text-center"><div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#a5be00] mx-auto mb-5"><Rocket size={40} className="text-[#022b3a]" /></div><h4 className="text-2xl font-bold mb-3">Ataque: Conversão e Vendas</h4><p className="text-[#e1e5f2]">No ataque, convertemos a visibilidade em ação. Usando anúncios &quot;camuflados&quot; e chamadas eficazes, transformamos seguidores e visitantes em pacientes agendados.</p>
</div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-3 px-8 rounded-lg text-lg inline-block cta-button">
                            Monte seu orçamento em segundos
                        </Link>
                    </div>
                </section>

                <section id="sobre" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="flex justify-center">
                                {/* As imagens na pasta public são servidas a partir da raiz */}
                                <Image src="/IMG_3875.jpg" alt="Foto de Carlos Henrique" width={400} height={400} className="rounded-lg shadow-xl w-full max-w-sm object-cover"/>
                            </div>
                            <div className="text-[#022b3a]">
                                <h3 className="text-3xl font-bold mb-4">Mais que um prestador de serviços, um parceiro de negócio.</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">Olá! Sou o Carlos. Minha paixão não é apenas marketing, é a causa da saúde. Me inspira ver como meu trabalho conecta informações valiosas de bem-estar a quem precisa, fortalecendo a relação entre clínicas, profissionais e seus pacientes.</p>
                                <p className="text-gray-700 leading-relaxed mb-4">Como autodidata, minha bagagem em programação, filmmaking e música me deu uma visão 360º do mercado. Isso, somado a um estilo de vida focado em alta performance, me permite criar estratégias que funcionam de verdade.</p>
                                <p className="font-semibold text-[#022b3a]">Minha filosofia é clara: respeito pelo seu tempo, dinheiro e história. Por isso, cada ação é pensada para ser direta e trazer resultados reais.</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-3 px-8 rounded-lg text-lg inline-block cta-button">
                            Simule o preço online
                        </Link>
                    </div>
                </section>

                <section id="faq" className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-12">
                             <h3 className="text-3xl md:text-4xl font-bold text-[#022b3a]">Ainda tem Dúvidas?</h3>
                             <p className="text-gray-600 mt-2">Respondi abaixo as perguntas mais comuns para te ajudar a decidir com segurança.</p>
                        </div>
                         <div className="space-y-4">
                            <FaqItem question="Tenho medo de investir e não ver retorno. Como vocês lidam com isso?" answer="Esse é o principal medo, e eu o levo a sério. Por isso, meu foco não é em métricas de vaidade, mas em resultados que impactam seu faturamento, como mensagens de pacientes qualificados. Eu garanto que você receberá contatos de público interessado; a conversão final dependerá do seu time comercial, mas o fluxo de oportunidades, eu garanto."/>
                            <FaqItem question="Meu maior problema é a falta de tempo. Como seu serviço me ajuda?" answer="Meu processo é desenhado para otimizar seu tempo. Com o método de produção em lote, resolvemos meses de conteúdo em poucas sessões. Você se concentra em gravar vídeos (com minha orientação), e eu cuido de todo o resto: edição, design e publicação. O objetivo é que você ganhe constância e tempo livre."/>
                            <FaqItem question="Já tive uma experiência ruim com outra agência. Qual o seu diferencial?" answer="Meu principal diferencial é o atendimento de boutique e a parceria estratégica. Você não será mais um número. Eu, Carlos, estarei diretamente envolvido no seu projeto, garantindo atenção total e estratégias que respeitam seu investimento e as normas de publicidade da área da saúde."/>
                            <FaqItem question="Em quanto tempo eu começo a ver os resultados?" answer="Resultados de engajamento e visibilidade podem ser notados já no primeiro mês. Resultados sólidos em agendamentos e vendas geralmente se consolidam a partir do terceiro mês, dependendo do seu mercado e do investimento em anúncios."/>
                            <FaqItem question="O serviço inclui a criação dos textos e das artes?" answer="Sim. Meu serviço de Social Media é completo. Ele inclui todo o processo: da estratégia e planejamento à criação dos textos (copywriting) e do design dos posts, sempre alinhado com a identidade visual da sua marca."/>
                         </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link href={budgetLink} className="bg-[#0496ff] text-white font-bold py-3 px-8 rounded-lg text-lg inline-block cta-button">
                            Calcule seu orçamento agora
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="bg-[#022b3a] border-t border-gray-700 text-[#e1e5f2] py-8">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; {new Date().getFullYear()} Carlos Henrique. Todos os direitos reservados.</p>
                    <p className="text-sm mt-2">Marketing Digital de alta performance para a área da saúde.</p>
                    <div className="mt-4">
                        <Link href="/politica-de-privacidade" className="text-sm text-slate-400 hover:text-white transition-colors duration-300 mx-2">
                            Política de Privacidade
                        </Link>
                        <span className="text-slate-500">|</span>
                        <Link href="/termos-de-uso" className="text-sm text-slate-400 hover:text-white transition-colors duration-300 mx-2">
                            Termos de Uso
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
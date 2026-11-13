import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pcxPhoto from "@/assets/aptos-pcx-real-tratada-2026.webp";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TimelineCNH from "@/components/TimelineCNH";
import ProcessoHabilitacao from "@/components/ProcessoHabilitacao";
import PromoSection from "@/components/PromoSection";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import GoogleReviews from "@/components/GoogleReviews";
import HomeFAQ from "@/components/HomeFAQ";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmartAssistant from "@/components/SmartAssistant";
import MobileStickyBar from "@/components/MobileStickyBar";
import RelatedLinks from "@/components/RelatedLinks";
import SEO from "@/components/SEO";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { track } from "@/lib/analytics";

export const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://autoescolaaptos.com.br/#website",
        url: "https://autoescolaaptos.com.br/",
        name: "Autoescola APTOS",
        publisher: { "@id": "https://autoescolaaptos.com.br/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://autoescolaaptos.com.br/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://autoescolaaptos.com.br/#org",
        name: "Autoescola APTOS",
        url: "https://autoescolaaptos.com.br/",
        logo: "https://autoescolaaptos.com.br/og-image.png",
        sameAs: [
          "https://www.instagram.com/autoescola_aptos/",
          "https://www.facebook.com/cfcAutoescolaAPTOS/",
          "https://www.google.com/maps/search/?api=1&query=Autoescola%20Aptos%20Sao%20Jose%20dos%20Pinhais&query_place_id=ChIJbXhF6g763JQR9TTJ4hS7wwM",
        ],
      },
      {
        "@type": "DrivingSchool",
        "@id": "https://autoescolaaptos.com.br/#drivingschool",
        name: "Autoescola APTOS",
        telephone: "+554133833627",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "São José dos Pinhais",
          addressRegion: "PR",
          addressCountry: "BR",
        },
        areaServed: { "@type": "City", name: "São José dos Pinhais" },
      },
    ],
  };

const Index = () => {
  useScrollTracking();
  const [campaignActive, setCampaignActive] = useState(() => Date.now() < Date.parse("2026-12-01T00:00:00-03:00"));
  useEffect(() => {
    const checkDeadline = window.setInterval(() => setCampaignActive(Date.now() < Date.parse("2026-12-01T00:00:00-03:00")), 60000);
    return () => window.clearInterval(checkDeadline);
  }, []);


  const homeRelated = [
    {
      title: "Inclusão de categoria A — moto manual ou automática",
      href: "/inclusao-moto",
      description: "Inclusão da categoria A com PCX ou Fan 160. Consulte a validade das ofertas e as condições atuais.",
    },
    {
      title: "Aulas em carro automático",
      href: "/carro-automatico",
      description: "Conheça a opção de carro automático nas aulas práticas da APTOS.",
    },
    {
      title: "Autoescola em São José dos Pinhais",
      href: "/autoescola-sao-jose-dos-pinhais",
      description: "Tudo sobre a APTOS na sua cidade.",
    },
    {
      title: "Primeira Habilitação",
      href: "/primeira-habilitacao",
      description: "Processo completo com as regras da Resolução 1020/2025.",
    },
    {
      title: "Aulas Práticas",
      href: "/aulas-praticas",
      description: "Carros novos com direção elétrica e instrutores pacientes.",
    },
    {
      title: "Inclusão de Categoria (A ou B)",
      href: "/inclusao-categoria",
      description: "Já tem CNH? Adicione a A ou a B.",
    },
    {
      title: "Curso de Reciclagem",
      href: "/reciclagem-cnh",
      description: "Consulte as modalidades autorizadas e a disponibilidade do curso de reciclagem.",
    },
    {
      title: "Reteste Prático",
      href: "/reteste-pratico",
      description: "Aulas focadas no que reprovou. Volte preparado.",
    },
    {
      title: "Perguntas Frequentes",
      href: "/perguntas-frequentes",
      description: "Dúvidas frequentes sobre CNH e serviços no Paraná.",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-clip">
      <SEO
        title="Autoescola em São José dos Pinhais | APTOS — CNH, Aulas e Reciclagem"
        description="Autoescola APTOS em São José dos Pinhais: primeira habilitação, inclusão de categoria, reciclagem, reteste e aulas práticas. Solicite seu orçamento."
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <Hero />

      <section
        aria-label="Novidade: aulas em carro automático"
        className="border-y border-primary/20 bg-primary/5"
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
              Novidade APTOS
            </p>
            <p className="mt-1 text-lg font-heading font-bold text-foreground md:text-xl">
              Agora também com aulas práticas em carro automático.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Conheça a nova opção sem sair da estrutura completa da Autoescola APTOS.
            </p>
          </div>
          <Link
            to="/carro-automatico"
            data-component="HomeAutomaticoCallout"
            data-intent="internal"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-smooth transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            Conhecer carro automático →
          </Link>
        </div>
      </section>

      <section aria-label="Campanha de inclusão de categoria A" className="border-y border-amber-300/30 bg-zinc-950 text-white">
        <div className="container mx-auto grid items-center gap-5 px-4 py-7 sm:grid-cols-[1fr_auto] md:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-yellow-300 motion-safe:animate-pulse">{campaignActive ? "Por tempo limitado · Até 30/11/2026" : "Campanha encerrada · Inclusão de moto"}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
              Categoria A: <span className="text-yellow-300">PCX automática</span> ou Fan 160 manual
            </h2>
            <p className="mt-2 text-sm text-zinc-200 md:text-base">
              {campaignActive ? <><strong className="text-yellow-300">R$ 750 à vista</strong> até 30/11/2026 · taxas do DETRAN não inclusas (média estimada de R$ 299).</> : "A condição promocional foi encerrada em 30/11/2026. Consulte novas condições disponíveis."}
            </p>
            <Link to="/inclusao-moto" data-component="HomeMotoCallout" data-intent="internal"
              onClick={() => track("campaign_cta_click", { campaign: "inclusao_categoria_a_moto", source: "home_moto_callout" })}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 sm:w-auto">
              {campaignActive ? "Aproveitar a campanha" : "Consultar plano de moto"} <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>
          <img
            src={pcxPhoto}
            alt="Honda PCX automática da Autoescola APTOS em imagem tratada"
            loading="lazy" decoding="async"
            className="mx-auto aspect-[3/2] w-full max-w-sm rounded-2xl border border-zinc-700 object-cover shadow-lg sm:w-[260px] md:w-[320px]"
          />
        </div>
      </section>

      <TimelineCNH />
      <ProcessoHabilitacao />
      <PromoSection />
      <Services />
      <Differentials />
      <GoogleReviews />
      <About />
      <HomeFAQ />
      <Contact />
      <RelatedLinks title="Explore a APTOS" links={homeRelated} />
      <Footer />
      <FloatingWhatsApp />
      <SmartAssistant />
      <MobileStickyBar />
    </main>
  );
};

export default Index;

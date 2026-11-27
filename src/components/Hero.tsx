import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle, Award, Users, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useVariant, trackExperimentConversion } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

// Import slide images
import heroSlide1 from "@/assets/hero-slide-1.webp";
import heroSlide2 from "@/assets/hero-slide-2.webp";
import heroSlide3 from "@/assets/hero-slide-3.webp";
import heroImage from "@/assets/hero-image.webp";
import poloAutomatico from "@/assets/aptos-polo-automatico-pagina.webp";

const slides = [
  { image: poloAutomatico, alt: "Polo automático da Autoescola APTOS", automatico: true },
  {
    image: heroSlide1,
    alt: "Aluna feliz com CNH conquistada na Autoescola APTOS",
  },
  {
    image: heroImage,
    alt: "Autoescola APTOS - Formação de condutores em São José dos Pinhais",
  },
  {
    image: heroSlide2,
    alt: "Aula prática de direção com instrutor da Autoescola APTOS",
  },
  {
    image: heroSlide3,
    alt: "Aluna aprovada celebrando com sua CNH",
  },
];

const Hero = () => {
  const { trackEnrollmentClick, trackEvent } = useAnalytics();
  // A/B do CTA principal do Hero — exposição/conversão registradas no dataLayer.
  const ctaVariant = useVariant("hero_cta", ["controle", "urgencia"] as const);
  const ctaLabel =
    ctaVariant === "urgencia" ? "Quero minha CNH agora" : "Simular meu Orçamento";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobilePlaying, setMobilePlaying] = useState(false);
  const [mobileRef, mobileApi] = useEmblaCarousel({ loop: true, watchDrag: true });
  const mobileSelect = useCallback(() => {
    if (mobileApi) setMobileIndex(mobileApi.selectedScrollSnap());
  }, [mobileApi]);
  useEffect(() => {
    if (!mobileApi) return;
    mobileSelect();
    mobileApi.on("select", mobileSelect);
    return () => { mobileApi.off("select", mobileSelect); };
  }, [mobileApi, mobileSelect]);
  useEffect(() => {
    if (!mobilePlaying || !mobileApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMobilePlaying(false);
      return;
    }
    const timer = window.setInterval(() => mobileApi.scrollNext(), 8000);
    return () => window.clearInterval(timer);
  }, [mobilePlaying, mobileApi]);

  
  // A fotografia é escolhida pelo visitante; a oferta principal permanece estável.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleBudget = () => {
    trackEnrollmentClick();
    trackExperimentConversion("hero_cta", "cta_click");
  };

  const stats = [
    { icon: Award, value: "+15", label: "Anos de Experiência" },
    { icon: Users, value: "Equipe", label: "Atendimento humano" },
    { icon: CheckCircle, value: "+5000", label: "Alunos Formados" },
  ];

  return (
    <div id="inicio" className="contents">
    <section id="inicio-mobile" data-component="MobileHero" className="relative md:hidden bg-slate-950 text-white pt-20 pb-5">
      <div className="mx-auto max-w-lg">
        <h1 className="px-4 pt-5 text-[clamp(1.75rem,7vw,2.4rem)] font-heading font-black leading-tight tracking-tight text-white">Seu próximo passo para a <span className="text-yellow-300">CNH</span> começa na APTOS</h1>
        <div className="px-4 mt-3 mb-3 space-y-3">
          <p className="text-sm text-slate-200 leading-relaxed">Primeira habilitação, inclusão de categoria e aulas práticas em São José dos Pinhais.</p>
          <Link to="/orcamento" data-component="HeroMobileBudgetCTA" data-intent="orcamento" onClick={handleBudget} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />{ctaLabel}
          </Link>
          <a href="#servicos" onClick={() => trackEvent("view_services", { source: "hero" })} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">Ver cursos e serviços <ChevronRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <div data-component="HeroMobileControls" className="relative z-10 flex min-h-14 items-center justify-between gap-2 px-4 py-2 bg-slate-950" aria-label="Controles dos banners">
          <span className="text-xs text-slate-200 tabular-nums" aria-live="polite">{mobileIndex + 1} / {slides.length}</span>
          <span className="hidden min-[390px]:inline text-[11px] text-slate-300">Deslize para navegar</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => mobileApi?.scrollPrev(window.matchMedia("(prefers-reduced-motion: reduce)").matches)} aria-label="Banner anterior" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => { if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMobilePlaying(p => !p); }} aria-label={mobilePlaying ? "Pausar banners" : "Reproduzir banners"} aria-pressed={mobilePlaying} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300">{mobilePlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
            <button type="button" onClick={() => mobileApi?.scrollNext(window.matchMedia("(prefers-reduced-motion: reduce)").matches)} aria-label="Próximo banner" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div ref={mobileRef} className="overflow-hidden touch-pan-y" aria-label="Banners da Autoescola APTOS" aria-roledescription="carrossel">
          <div className="flex">
            {slides.map((slide, index) => (
              <article key={slide.alt} className="min-w-0 flex-[0_0_100%] px-3" aria-roledescription="slide" aria-hidden={index !== mobileIndex} aria-label={`Banner ${index + 1} de ${slides.length}`}>
                <div className="rounded-xl overflow-hidden border border-white/15 bg-slate-900">
                  <div className="relative bg-slate-900 flex items-center justify-center">
                    <img src={slide.image} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" className="block w-full h-auto max-h-[42svh] object-contain" />
                  </div>
                  <div className="px-4 py-5 space-y-3">
                    <p className="text-xs uppercase tracking-widest font-bold text-amber-300">{index === 0 ? "Novidade · Polo automático" : "Autoescola APTOS · São José dos Pinhais"}</p>
                    <h2 className="text-2xl leading-tight font-black">{index === 0 ? "Seu próximo passo é no automático" : "Conquiste sua CNH com confiança"}</h2>
                    <p className="text-sm leading-relaxed text-slate-200">{index === 0 ? "Conheça as aulas práticas com o Polo automático da APTOS." : "Formação de condutores com opções de carro e moto. Conheça nossos serviços."}</p>
                    <Link to={index === 0 ? "/carro-automatico" : "/orcamento"} data-component="HeroMobilePrimaryCTA" tabIndex={index === mobileIndex ? 0 : -1} onClick={() => index === 0 ? trackEvent("hero_automatico_click", { source: "hero_mobile" }) : handleBudget()} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                      {index === 0 ? "Conhecer o carro automático" : ctaLabel}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
    <section id="inicio-desktop" className="relative hidden md:flex bg-slate-950 text-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0">
            <p className="mb-5 inline-flex items-center gap-2 border-b border-red-500/60 pb-2 text-xs font-semibold uppercase tracking-[.16em] text-slate-200">
              <Award className="w-4 h-4 text-red-400" aria-hidden="true" /> Autoescola em São José dos Pinhais
            </p>
            <h1 className="max-w-[15ch] text-[clamp(2.5rem,4.8vw,4.5rem)] font-heading font-black leading-[1.08] tracking-tight">
              Conquiste sua <span className="text-yellow-300">CNH</span> com confiança
            </h1>
            <p className="mt-5 max-w-[53ch] text-lg leading-relaxed text-slate-200">
              Autoescola APTOS — referência em São José dos Pinhais. Agora com moto e carro automático, curso online e atendimento rápido para tirar sua CNH sem complicação.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="lg" className="min-h-12 bg-red-600 hover:bg-red-700 text-white px-6 transition-colors font-bold" asChild>
                <Link to="/orcamento" data-component="HeroBudgetCTA" data-intent="orcamento" onClick={handleBudget}>
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> {ctaLabel}
                </Link>
              </Button>
              <a href="#servicos" onClick={() => trackEvent("view_services", { source: "hero" })} className="inline-flex min-h-12 items-center gap-2 border border-white/30 rounded-lg px-5 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                Ver Serviços <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-7 grid gap-3 text-sm text-slate-200">
              {[
                "Instrutores credenciados pelo DETRAN-PR",
                "Promoções especiais e parcelamento facilitado",
                "Aulas práticas com opções de carro manual e automático",
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 w-4 h-4 shrink-0 text-yellow-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-slate-900">
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-slate-200">Conheça a APTOS</p>
              <span aria-live="polite" className="text-xs font-medium tabular-nums text-slate-300">{selectedIndex + 1} / {slides.length}</span>
            </div>
            <div className="overflow-hidden touch-pan-y" ref={emblaRef} aria-label="Fotos da Autoescola APTOS" aria-roledescription="carrossel">
              <div className="flex">
                {slides.map((slide, index) => (
                  <article key={slide.alt} className="min-w-0 flex-[0_0_100%] relative aspect-[4/3] bg-slate-950" aria-roledescription="slide" aria-hidden={index !== selectedIndex} aria-label={`Foto ${index + 1} de ${slides.length}`}>
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      {...({ fetchpriority: index === 0 ? "high" : "auto" } as Record<string, string>)}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    {slide.automatico && <Link to="/carro-automatico" tabIndex={index === selectedIndex ? 0 : -1} aria-label="Conhecer as aulas no Polo automático da APTOS" data-component="HeroPoloSlideLink" data-intent="internal" onClick={() => trackEvent("hero_automatico_click", { source: "hero_slide_image" })} className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-400" />}
                  </article>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10">
              <p className="min-w-0 flex-1 text-sm text-slate-200">{slides[selectedIndex].alt}</p>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={scrollPrev} aria-label="Slide anterior" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"><ChevronLeft className="w-5 h-5" aria-hidden="true" /></button>
                <button type="button" onClick={scrollNext} aria-label="Próximo slide" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"><ChevronRight className="w-5 h-5" aria-hidden="true" /></button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 px-4 pb-2" aria-label="Escolher foto">
              {slides.map((_, index) => (
                <button type="button" key={index} onClick={() => scrollTo(index)} aria-label={`Ir para slide ${index + 1}`} aria-current={index === selectedIndex ? "true" : undefined} className="grid h-11 w-11 place-items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
                  <span aria-hidden="true" className={`h-1.5 w-6 rounded-full transition-colors ${index === selectedIndex ? "bg-red-400" : "bg-white/25"}`} />
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 px-5 py-4">
              <Link to="/carro-automatico" data-component="HeroPoloAutomaticoCTA" data-intent="internal" onClick={() => trackEvent("hero_automatico_click", { source: "hero_slide_0" })} className="inline-flex min-h-11 items-center gap-2 font-bold text-yellow-300 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
                Conhecer o carro automático <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-3 divide-x divide-white/15 border-y border-white/15">
          {stats.map(stat => (
            <div key={stat.label} className="flex items-center gap-3 py-5 px-4 lg:px-6">
              <stat.icon className="w-5 h-5 shrink-0 text-red-400" aria-hidden="true" />
              <div className="min-w-0"><dt className="text-xl lg:text-2xl font-heading font-black">{stat.value}</dt><dd className="text-xs leading-snug text-slate-300">{stat.label}</dd></div>
            </div>
          ))}
        </dl>
      </div>
    </section>
    </div>
  );
};

export default Hero;
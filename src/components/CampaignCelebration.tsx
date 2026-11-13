import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, PartyPopper, Sparkles, Volume2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const POPUP_SEEN_KEY = "aptos-inclusao-moto-campanha-20261130-v1";
const COLORS = ["#facc15", "#ef4444", "#ffffff", "#fb923c", "#f43f5e"];

function CelebrationParticles({ burst }: { burst: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div key={burst} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 28 }, (_, index) => {
        const column = index % 7;
        const row = Math.floor(index / 7);
        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/3 h-3 w-2 rounded-sm"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: (column - 3) * (24 + row * 11),
              y: 90 + row * 45,
              opacity: 0,
              rotate: (index % 2 ? 1 : -1) * (180 + index * 27),
              scale: 0.5,
            }}
            transition={{ duration: 1.45, delay: (index % 5) * 0.04, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

function playCelebrationSound() {
  if (typeof window === "undefined" || !window.AudioContext) return;
  try {
    const audio = new window.AudioContext();
    void audio.resume();
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const start = audio.currentTime + index * 0.12;
      const oscillator = audio.createOscillator();
      const volume = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      volume.gain.setValueAtTime(0.0001, start);
      volume.gain.exponentialRampToValueAtTime(0.045, start + 0.025);
      volume.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);
      oscillator.connect(volume);
      volume.connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.4);
    });
    window.setTimeout(() => void audio.close(), 1400);
  } catch {
    // O áudio é opcional; a navegação e o funil nunca dependem dele.
  }
}

export function CampaignCountdown({ remainingMs }: { remainingMs: number }) {
  const total = Math.max(0, Math.floor(remainingMs / 1000));
  const units = [
    { label: "dias", value: Math.floor(total / 86400) },
    { label: "horas", value: Math.floor((total % 86400) / 3600) },
    { label: "min", value: Math.floor((total % 3600) / 60) },
    { label: "seg", value: total % 60 },
  ];

  return (
    <div role="timer" aria-label="Tempo restante até o fim da campanha em 30 de novembro de 2026" aria-live="off" className="grid grid-cols-4 gap-2">
      {units.map((unit) => (
        <div key={unit.label} className="rounded-xl border border-yellow-300/30 bg-black/35 px-2 py-2 text-center">
          <p className="text-xl font-black tabular-nums text-yellow-300 sm:text-2xl">{String(unit.value).padStart(2, "0")}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-200">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}

type CampaignCelebrationProps = {
  active: boolean;
  remainingMs: number;
  triagem: string;
  onFunnel: () => void;
};

export default function CampaignCelebration({ active, remainingMs, triagem, onFunnel }: CampaignCelebrationProps) {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) {
      setOpen(false);
      return;
    }

    try {
      if (window.sessionStorage.getItem(POPUP_SEEN_KEY) === "seen") return;
    } catch {
      // Navegação privada pode bloquear sessionStorage.
    }
    const timeout = window.setTimeout(() => {
      setOpen(true);
      try {
        window.sessionStorage.setItem(POPUP_SEEN_KEY, "seen");
      } catch {
        // A campanha continua utilizável sem armazenamento.
      }
    }, 1800);
    return () => window.clearTimeout(timeout);
  }, [active]);

  if (!active) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border-yellow-300/40 bg-gradient-to-br from-zinc-950 via-red-950 to-zinc-950 p-0 text-white shadow-2xl sm:rounded-3xl">
        <div className="relative isolate overflow-hidden px-5 pb-6 pt-8 text-center sm:px-8 sm:pb-8">
          <CelebrationParticles burst={burst} />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="relative z-10"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-yellow-300/50 bg-yellow-300/15 text-yellow-300 shadow-lg">
              <PartyPopper aria-hidden className="h-8 w-8" />
            </span>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-300/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-yellow-300">
              <Sparkles aria-hidden className="h-4 w-4" /> Campanha por tempo limitado
            </p>
            <DialogTitle className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              Sua categoria A está te esperando!
            </DialogTitle>
            <DialogDescription className="mt-3 text-base leading-relaxed text-zinc-200">
              Aproveite a condição especial de inclusão de moto com a APTOS até <strong className="text-white">30/11/2026</strong>.
              Vagas limitadas, com disponibilidade confirmada pela equipe.
            </DialogDescription>
            <p className="mt-5 text-4xl font-black text-yellow-300">
              R$ 750<span className="text-xl">,00 à vista</span>
            </p>
            <p className="mt-1 text-xs text-zinc-200">Taxas DETRAN-PR à parte · estimativa de R$ 299,00</p>
            <div className="mt-5">
              <p className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-100">
                <CalendarClock aria-hidden className="h-4 w-4" /> A oferta termina em
              </p>
              <CampaignCountdown remainingMs={remainingMs} />
            </div>
            <Link
              to={triagem}
              onClick={onFunnel}
              data-intent="triagem"
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-yellow-300 px-5 py-3 text-center text-base font-black text-zinc-950 transition hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
            >
              Quero aproveitar a campanha <ArrowRight aria-hidden className="ml-2 h-5 w-5" />
            </Link>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <button type="button" onClick={() => { playCelebrationSound(); setBurst((value) => value + 1); }} className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-200 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300">
                <Volume2 aria-hidden className="h-4 w-4" /> Som e confetes
              </button>
              <button type="button" onClick={() => setOpen(false)} className="text-xs text-zinc-300 underline underline-offset-4 hover:text-white">
                Continuar explorando
              </button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { createFileRoute, redirect } from '@tanstack/react-router';

// Compatibilidade com links antigos: simulador foi retirado do portal.
export const Route = createFileRoute('/simulado-detran-pr')({
  beforeLoad: () => { throw redirect({ to: '/formas-estudo-teorico', replace: true }); },
});

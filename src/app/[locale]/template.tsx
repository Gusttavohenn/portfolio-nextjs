// Fade de entrada a cada página (antes era framer-motion; agora só CSS, sem JavaScript extra).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

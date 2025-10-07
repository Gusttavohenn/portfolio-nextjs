"use client";

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Define o estado inicial da animação (antes de começar)
      initial={{ y: 20, opacity: 0 }}
      // Define o estado final da animação (como ela deve terminar)
      animate={{ y: 0, opacity: 1 }}
      // Define a duração e o tipo de transição
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
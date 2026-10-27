import { notFound } from 'next/navigation';

// Qualquer rota que não existe cai aqui e mostra o 404 personalizado (com o mascote)
export default function CatchAll() {
  notFound();
}

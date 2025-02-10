'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const ideas = [
    "Un resto où tu ne choisis pas ton plat, c’est l’algorithme qui décide!",
    "Une application qui te génère une excuse parfaite pour annuler tes plans!",
    "Un frigo connecté qui te parle et te juge sur tes choix alimentaires!",
    "Un site de rencontres où seuls les gens qui détestent la même chose se matchent!",
    "Un vélo avec une corne de licorne qui joue de la musique à chaque coup de pédale!",
    "Un casque de VR qui te met directement dans un monde en pixels des années 90!",
    "Un chatbot qui te parle comme un vieux sage et te donne des conseils absurdes!",
    "Un réveil-matin qui envoie un SMS d’excuse à ton boss si tu snoozes trop!",
  ];

  const [idea, setIdea] = useState(ideas[0]);

  const generateIdea = () => {
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setIdea(randomIdea);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Clicket Paf! 🎉
      </motion.h1>

      <motion.p
        key={idea}
        className="text-lg text-center bg-gray-800 p-4 rounded-lg shadow-lg max-w-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {idea}
      </motion.p>

      <motion.button
        onClick={generateIdea}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition"
        whileTap={{ scale: 0.9 }}
      >
        Paf! Génère une idée 🎭
      </motion.button>
    </div>
  );
}
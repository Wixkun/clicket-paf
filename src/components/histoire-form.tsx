'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Genre } from '@/types/genre';

export function HistoireForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    auteur: '',
    slug: '',
  });
  const [blob, setBlob] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
  });

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data, error } = await supabase.from('genres').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'titre' && {
        slug: value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim(),
      }),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBlob(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedGenres.length === 0) {
      alert('Veuillez sélectionner au moins un genre');
      return;
    }

    if (!blob) {
      alert('Veuillez sélectionner une image');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('histoires')
        .insert({
          titre: formData.titre,
          contenu: formData.contenu,
          auteur: user?.user_metadata?.username,
          slug: formData.slug,
        })
        .select()
        .single();

      if (error) throw error;

      const { error: storageError } = await supabase.storage.from('histoires').upload(`public/${data.id}`, blob, {
        cacheControl: '3600',
        upsert: true,
        contentType: blob.type,
      });

      if (storageError) throw storageError;

      const { error: genresError } = await supabase.from('histoires_genres').insert(
        selectedGenres.map((genre) => ({
          histoire_id: data.id,
          genre_id: genre.id,
        }))
      );

      if (genresError) throw genresError;

      alert('Histoire créée avec succès!');

      setFormData({
        titre: '',
        contenu: '',
        auteur: '',
        slug: '',
      });
      setBlob(null);
      setPreview(null);
      setSelectedGenres([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la création de l'histoire");
    }
  };

  return (
    <main className={`max-w-md mx-auto p-6 ${className}`} {...props}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Histoire</h1>
        <p className="text-gray-300">Entrez votre Histoire !</p>
      </header>
      <section>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire d'histoire">
          <div>
            <label htmlFor="image" className="block text-gray-300 font-medium">
              Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              id="image"
              name="image"
              required
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Aperçu" className="max-w-full h-auto rounded-md" style={{ maxHeight: '200px' }} />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="titre" className="block text-gray-300 font-medium">
              Titre
            </label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="contenu" className="block text-gray-300 font-medium">
              Contenu
            </label>
            <textarea
              id="contenu"
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="genres" className="block text-gray-300 font-medium">
              Genres
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {genres?.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => {
                    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g.id !== genre.id) : [...prev, genre]));
                  }}
                  className={`px-4 py-2 rounded-md text-sm transition border ${
                    selectedGenres.includes(genre) ? 'bg-violet-600 text-white border-violet-600' : 'bg-black/30 text-white border-gray-600'
                  }`}
                >
                  {genre.nom}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition">
            Soumettre
          </button>
        </form>
      </section>
    </main>
  );
}

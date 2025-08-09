'use client';

import { useState } from 'react';
import { estimatePrice } from '@/lib/estimate';

export default function Estimation({ goHome }: { goHome: () => void }) {
  const [form, setForm] = useState({
    location: '',
    type: '',
    surface: '',
    bedrooms: '',
    bathrooms: '',
    year: '',
    condition: '',
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = estimatePrice(form);
    setEstimatedPrice(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full space-y-6"
      >
        <button
          type="button"
          onClick={goHome}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Retour à l'accueil
        </button>

        <h1 className="text-3xl font-bold text-blue-600 text-center">Estimation Immobilière</h1>

        {/* 📍 Localisation */}
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Localisation"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* 🏠 Type de bien */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Type de bien</option>
          <option value="appartement">Appartement</option>
          <option value="maison">Maison</option>
          <option value="terrain">Terrain</option>
        </select>

        {/* 📐 Surface */}
        <input
          type="number"
          name="surface"
          value={form.surface}
          onChange={handleChange}
          placeholder="Surface en m²"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* 🛏️ Chambres */}
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          placeholder="Nombre de chambres"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* 🛁 Salles de bain */}
        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          placeholder="Nombre de salles de bain"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* 🏗️ Année de construction */}
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Année de construction"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* 🧱 État du bien */}
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">État du bien</option>
          <option value="neuf">Neuf</option>
          <option value="bon">Bon état</option>
          <option value="à rénover">À rénover</option>
        </select>

        {/* 📊 Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Obtenir une estimation
        </button>

        {/* 💰 Résultat */}
        {estimatedPrice !== null && (
          <div className="mt-6 text-center text-xl font-bold text-green-600">
            Estimation : {estimatedPrice.toLocaleString()} €
          </div>
        )}
      </form>
    </div>
  );
}

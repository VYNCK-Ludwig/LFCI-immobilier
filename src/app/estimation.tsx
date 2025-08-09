'use client';

import { useState } from 'react';
import { estimatePrice } from '@/lib/estimate'; // adapte le chemin si nécessaire

export default function EstimationPage() {
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
        <h1 className="text-3xl font-bold text-blue-600 text-center">Estimation Immobilière</h1>

        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Choisissez un département</option>
          <option value="Allier">Allier</option>
          <option value="Creuse">Creuse</option>
          <option value="Corrèze">Corrèze</option>
          <option value="Haute-Vienne">Haute-Vienne</option>
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Type de bien</option>
          <option value="maison">Maison</option>
          <option value="appartement">Appartement</option>
          <option value="terrain">Terrain</option>
        </select>

        <input
          type="number"
          name="surface"
          value={form.surface}
          onChange={handleChange}
          placeholder="Surface habitable (m²)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          placeholder="Nombre de chambres"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          placeholder="Nombre de salles de bain"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Année de construction"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">État du bien</option>
          <option value="neuf">Neuf</option>
          <option value="bon">Bon état</option>
          <option value="à rénover">À rénover</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Obtenir une estimation
        </button>

        {estimatedPrice !== null && (
          <div className="mt-6 text-center text-xl font-bold text-green-600">
            Estimation : {estimatedPrice.toLocaleString()} €
          </div>
        )}
      </form>
    </div>
  );
}

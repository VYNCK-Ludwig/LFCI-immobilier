'use client';

import { useState } from 'react';
import { estimatePrice } from '@/lib/estimate';

type Props = {
  goHome: () => void;
};

export default function EstimationPage({ goHome }: Props) {
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

        {/* ... le reste de ton formulaire ... */}

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

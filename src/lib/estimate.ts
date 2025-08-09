// lib/estimate.ts

import { pricePerM2ByDepartment } from './priceData';

export function estimatePrice(form: {
  location: string;
  surface: string;
  condition: string;
}) {
  const department = form.location.trim();
  const basePrice = pricePerM2ByDepartment[department] || 1200;
  const surface = parseFloat(form.surface);
  const conditionMultiplier =
    form.condition === 'neuf' ? 1.2 :
    form.condition === 'bon' ? 1 :
    form.condition === 'à rénover' ? 0.8 : 1;

  return Math.round(basePrice * surface * conditionMultiplier);
}

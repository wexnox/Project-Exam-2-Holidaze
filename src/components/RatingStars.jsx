// Displays a 0–5 rating with stars and an accessible label
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// TODO: Add jsdoc
/**
 *
 * @param rating
 * @param size
 * @param className
 * @returns {Element}
 * @constructor
 */
export default function RatingStars({ rating, size = 14, className = '' }) {
  const value = typeof rating === 'number' && rating >= 0 ? Math.min(5, Math.max(0, rating)) : 0;
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5 && value < 5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className={`inline-flex items-center gap-1 ${className}`} aria-label={`Rating: ${value.toFixed(1)} out of 5`}>
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={`full-${i}`} size={size} className="text-amber-400" />
        ))}
        {hasHalf && <FaStarHalfAlt size={size} className="text-amber-400" />}
        {Array.from({ length: empty }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={size} className="text-amber-400" />
        ))}
      </div>
      <span className="text-xs text-slate-600 font-medium">{value.toFixed(1)}</span>
    </div>
  );
}

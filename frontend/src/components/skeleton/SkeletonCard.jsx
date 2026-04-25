import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* El div superior imita a la imagen */}
      <div className="skeleton-image shimmer"></div>
      
      <div className="skeleton-info">
        {/* Imitamos los textos (título, categoría, descripción, precio y botón) */}
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-category shimmer"></div>
        
        <div className="skeleton-desc shimmer"></div>
        <div className="skeleton-desc shimmer short"></div>
        
        <div className="skeleton-price shimmer"></div>
        <div className="skeleton-button shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
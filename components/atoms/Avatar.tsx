import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`avatar avatar-${size} ${className}`}
    />
  );
};
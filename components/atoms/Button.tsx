import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', icon: Icon, fullWidth, className = '', ...props
}) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? "btn-full" : "";

  return (
    <button
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </button>
  );
};
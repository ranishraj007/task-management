// src/components/common/Button.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', as: Component = 'button', ...props }) => {
  return (
    <Component
      className={`px-4 py-2 rounded text-white font-medium ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
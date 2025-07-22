// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <Button as={Link} to="/" className="bg-blue-500 hover:bg-blue-600">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
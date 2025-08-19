import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const NotFound: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // If you have a /tasks route with search support, pass via querystring:
    navigate(`/tasks?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center w-full max-w-lg">
        <div className="text-6xl mb-2">🧭</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has moved.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex gap-2 justify-center mb-4"
        >
          <input
            type="text"
            placeholder="Search tasks..."
            className="border px-3 py-2 rounded w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tasks"
          />
          <Button type="submit" className="bg-gray-800 hover:bg-black">
            Search
          </Button>
        </form>

        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button className="bg-blue-500 hover:bg-blue-600">
              Go to Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => alert("Thanks! We'll look into this issue.")}
            className="bg-red-500 hover:bg-red-600"
          >
            Report Issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

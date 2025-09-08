import React from "react";

export default function ProductionOutagePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Alert Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 
              9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>

          {/* Title */}
          <h1 className="text-2xl font-bold text-red-700">
            🚨 Production Outage
          </h1>

          {/* Message */}
          <p className="text-gray-600">
            Our production environment is currently <b className="text-red-600">DOWN</b>.
            Engineers are investigating. Please check back later.
          </p>

          {/* Status Badge */}
          <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full font-medium mt-4">
            Status: Outage
          </span>
        </div>
      </div>
    </div>
  );
}

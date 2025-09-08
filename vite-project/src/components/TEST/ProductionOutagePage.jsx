import React from "react";

export default function ProductionMaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-red-200">
        <div className="flex flex-col items-center gap-5">
          {/* Warning Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* Title */}
          <h1 className="text-2xl font-bold text-red-700">
            🚨 Production Outage
          </h1>

          {/* Main Message */}
          <p className="text-gray-700 leading-relaxed">
            Our production environment is currently{" "}
            <span className="font-semibold text-red-600">DOWN</span>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-orange-600">
              Maintenance is underway
            </span>{" "}
            and our engineers are actively working to restore services.
          </p>

          {/* Status Badge */}
          <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full font-medium mt-4">
            Status: Outage • Maintenance in Progress
          </span>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 mt-4">
            We appreciate your patience. Please check back for updates.
          </p>
        </div>
      </div>
    </div>
  );
}

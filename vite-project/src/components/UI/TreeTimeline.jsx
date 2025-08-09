const events = [
  { year: 2022, title: "First 100 Trees", desc: "Kickoff in Brazil rainforest.", icon: "🌱" },
  { year: 2023, title: "10,000 Milestone", desc: "Reforestation projects expanded to 6 countries.", icon: "🌿" },
  { year: 2024, title: "Community Driven", desc: "Over 500 volunteers contributing monthly.", icon: "🌳" },
];

const TreeTimeline = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-green-200 via-green-100 to-green-200 rounded-lg mb-16">
      <h2 className="text-3xl font-extrabold text-green-800 mb-10 text-center">
        🌍 Our Global Journey
      </h2>
      <div className="relative border-l-4 border-green-400 pl-8">
        {events.map((e, idx) => (
          <div key={idx} className="mb-12 relative">
            <div className="absolute -left-[22px] top-1 w-10 h-10 flex items-center justify-center bg-white border-4 border-green-400 rounded-full shadow-md text-2xl animate-pulse">
              {e.icon}
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-green-800">{e.year} – {e.title}</h3>
              <p className="text-gray-700 text-sm mt-1">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeTimeline;

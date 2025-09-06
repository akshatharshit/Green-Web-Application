import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubmissions,
  deleteSubmission,
} from "../../slices/submissionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCrown,
  FaLeaf,
  FaMedal,
  FaGift,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { submissions, loading } = useSelector((state) => state.submission);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllSubmissions());
  }, [dispatch]);

  const grouped = (submissions || []).reduce((acc, s) => {
    const name = s.name;
    const cleanName = name.replace(/["']/g, "").replace(/\s+/g, " ").trim();
    acc[cleanName] = acc[cleanName] || [];
    acc[cleanName].push(s);
    return acc;
  }, {});

  const sorted = Object.entries(grouped)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5);

  return (
    <div className="mt-16 px-4 mb-20">
      {/* Leaderboard Card */}
      <div className="p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto bg-gradient-to-br from-green-100 via-white to-green-100 border border-green-200 glass-card relative">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaCrown className="text-yellow-500 text-5xl animate-bounce" />
          <h2 className="text-4xl font-extrabold text-green-700 drop-shadow">
            Leaderboard
          </h2>
          <FaLeaf className="text-green-500 text-4xl animate-spin-slow" />
        </div>
        <div className="w-32 h-1 bg-green-400 rounded-full mx-auto mb-10" />

        {/* Loading */}
        {loading && (
          <p className="text-center text-green-700 font-semibold animate-pulse">
            Loading...
          </p>
        )}

        {/* Leaderboard Entries */}
        <div className="space-y-6">
          {sorted.map(([user, entries], idx) => (
            <div
              key={user}
              className="border border-green-200 bg-white/80 backdrop-blur-md rounded-xl p-5 flex justify-between items-center shadow hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Profile Icon */}
                <FaUserCircle
                  className={`text-4xl ${
                    idx === 0
                      ? "text-yellow-500"
                      : idx === 1
                      ? "text-gray-400"
                      : idx === 2
                      ? "text-orange-400"
                      : "text-green-400"
                  }`}
                />

                {/* User Info */}
                <div>
                  <p className="text-xl text-gray-800 font-bold flex items-center gap-2">
                    {idx === 0 && <FaMedal className="text-yellow-500" />}
                    {idx === 1 && <FaMedal className="text-gray-400" />}
                    {idx === 2 && <FaMedal className="text-orange-400" />}
                    {idx + 1}. {user}
                  </p>
                  <p className="text-green-600 font-semibold flex items-center gap-1">
                    <FaLeaf className="inline" /> {entries.length} Mint Coins
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-x-3 flex">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="text-blue-600 font-medium px-3 py-1 rounded-lg hover:bg-blue-100 transition"
                >
                  See All
                </button>
                <button
                  onClick={() => {
                    if (entries.length >= 5) {
                      const link = document.createElement("a");
                      link.href =
                        "https://png.pngtree.com/template/20210303/ourlarge/pngtree-white-simple-watercolor-plant-style-certificate-image_493719.jpg";
                      link.download = "GreenTokenReward.png";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      toast.success(`${user} received the reward! 🌱`);
                    } else {
                      toast.info(
                        `${user} needs at least 5 Mint Coins to claim the reward.`
                      );
                    }
                  }}
                  className="flex items-center gap-1 text-yellow-700 font-medium px-3 py-1 rounded-lg hover:bg-yellow-100 transition"
                >
                  <FaGift /> Reward
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Submissions Modal */}
      {selectedUser && (
        <div className="mt-16 p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto bg-white/95 border border-green-300 glass-card animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-green-700 flex items-center gap-2">
              <FaUserCircle className="text-green-500" />
              Submissions by {selectedUser}
            </h3>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-gray-400 hover:text-red-500 text-xl"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {(grouped[selectedUser] || []).map((sub) => (
              <div
                key={sub._id}
                className="flex items-center justify-between bg-green-50 p-4 rounded-xl shadow hover:shadow-md transition-all"
              >
                <img
                  src={sub.imageUrl}
                  alt="tree"
                  className="w-24 h-24 object-cover rounded-xl border border-green-200"
                />
                <button
                  onClick={() => dispatch(deleteSubmission(sub._id))}
                  className="text-red-600 font-medium ml-4 px-2 py-1 rounded-lg hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Animations & Glassmorphism */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-in-out;
          }
          .glass-card {
            background: rgba(255,255,255,0.75);
            backdrop-filter: blur(10px);
            border-radius: 20px;
          }
          .animate-spin-slow {
            animation: spin 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSubmissions, deleteSubmission } from '../../slices/submissionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCrown, FaLeaf, FaMedal, FaGift, FaUserCircle, FaTimes } from "react-icons/fa";

export default function Leaderboard() {
    const dispatch = useDispatch();
    const { submissions, loading } = useSelector(state => state.submission);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        dispatch(fetchAllSubmissions());
    }, [dispatch]);

    const grouped = (submissions || []).reduce((acc, s) => {
        const name = s.name;
        const cleanName = name.replace(/["']/g, '').replace(/\s+/g, ' ').trim();
        acc[cleanName] = acc[cleanName] || [];
        acc[cleanName].push(s);
        return acc;
    }, {});

    const sorted = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length).slice(0, 5);

    return (
        <div className="mt-16 px-4 mb-16">
            <div className="p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto bg-gradient-to-r from-green-200 via-green-100 to-green-200 border border-green-300 relative glass-card">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <FaCrown className="text-yellow-500 text-4xl animate-bounce" />
                    <h2 className="text-4xl font-extrabold text-green-700 drop-shadow">Leaderboard</h2>
                    <FaLeaf className="text-green-500 text-3xl animate-spin-slow" />
                </div>
                <div className="w-24 h-1 bg-green-300 rounded-full mx-auto mb-8" />
                {loading && <p className="text-center text-green-700 font-semibold">Loading...</p>}
                <div className="space-y-6">
                    {sorted.map(([user, entries], idx) => (
                        <div key={user} className="border-b pb-6 flex justify-between items-center bg-white/70 rounded-xl shadow hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4">
                                <FaUserCircle className={`text-3xl ${idx === 0 ? "text-yellow-500" : "text-green-400"}`} />
                                <div>
                                    <p className="text-xl text-gray-700 font-bold flex items-center gap-2">
                                        {idx === 0 && <FaMedal className="text-yellow-500" />}
                                        {idx + 1}. {user}
                                    </p>
                                    <p className="text-green-600 font-semibold flex items-center gap-1">
                                        <FaLeaf className="inline" /> {entries.length} Mint Coins
                                    </p>
                                </div>
                            </div>
                            <div className="space-x-4">
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="text-blue-600 hover:underline font-medium px-3 py-1 rounded hover:bg-blue-50 transition"
                                >
                                    See All
                                </button>
                                <button
                                    onClick={() => {
                                        if (entries.length >= 5) {
                                            const link = document.createElement('a');
                                            link.href = 'https://png.pngtree.com/template/20210303/ourlarge/pngtree-white-simple-watercolor-plant-style-certificate-image_493719.jpg';
                                            link.download = 'GreenTokenReward.png';
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            toast.success(`${user} received the reward! 🌱`);
                                        } else {
                                            toast.info(`${user} needs at least 5 Mint Coins to claim the reward.`);
                                        }
                                    }}
                                    className="text-yellow-600 font-medium px-3 py-1 rounded hover:bg-yellow-50 transition flex items-center gap-1"
                                >
                                    <FaGift className="inline" /> Reward
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedUser && (
                <div className="mt-16 p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto bg-white/90 border border-green-200 glass-card animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold text-green-700 flex items-center gap-2">
                            <FaUserCircle className="text-green-500" />
                            Submissions by {selectedUser}
                        </h3>
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="text-gray-400 hover:text-green-700 text-xl"
                            title="Close"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {(grouped[selectedUser] || []).map((sub) => (
                            <div
                                key={sub._id}
                                className="flex items-center justify-between bg-green-50 p-4 rounded-xl shadow hover:shadow-lg transition-all"
                            >
                                <img
                                    src={`${sub.imageUrl}`}
                                    alt="tree"
                                    className="w-24 h-24 object-cover rounded-xl border border-green-200"
                                />
                                <button
                                    onClick={() => dispatch(deleteSubmission(sub._id))}
                                    className="text-red-600 hover:underline ml-4 px-2 py-1 rounded hover:bg-red-50 transition"
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
                    animation: fade-in 0.7s;
                }
                .glass-card {
                    background: rgba(255,255,255,0.7);
                    backdrop-filter: blur(8px);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
                    border: 1px solid rgba(255,255,255,0.18);
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                `}
            </style>
        </div>
    );
}

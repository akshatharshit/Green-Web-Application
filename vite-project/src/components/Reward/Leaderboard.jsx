import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSubmissions, deleteSubmission } from '../../slices/submissionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <div className="p-8  rounded-2xl shadow-lg max-w-6xl mx-auto bg-gradient-to-r from-green-200 via-green-100 to-green-200 ">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-700">🏆 Leaderboard</h2>
                {loading && <p className="text-center">Loading...</p>}
                <div className="space-y-4">
                    {sorted.map(([user, entries], idx) => (
                        <div key={user} className="border-b pb-4 flex justify-between items-center">
                            <div>
                                <p className="text-lg text-gray-700 font-semibold">{idx + 1}. {user}</p>
                                <p className="text-green-500">{entries.length} Mint Coins</p>
                            </div>
                            <div className="space-x-4">
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="text-blue-600 hover:underline font-medium"
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
                                    className="text-yellow-600 font-medium"
                                >
                                    🎁 Reward
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedUser && (
                <div className="mt-16 p-6  rounded-2xl shadow-md max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                        Submissions by {selectedUser}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {(grouped[selectedUser] || []).map((sub) => (
                            <div
                                key={sub._id}
                                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                            >
                                <img
                                    src={`${sub.imageUrl}`}
                                    alt="tree"
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <button
                                    onClick={() => dispatch(deleteSubmission(sub._id))}
                                    className="text-red-600 hover:underline ml-4"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="text-gray-400 underline text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

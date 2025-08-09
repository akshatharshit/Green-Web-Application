import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUPI, deleteUPI } from '../../slices/upiSlice';

const UpiList = () => {
  const dispatch = useDispatch();
  const { upiList, loading } = useSelector((state) => state.upi);

  useEffect(() => {
    dispatch(fetchUPI());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this UPI entry?')) {
      dispatch(deleteUPI(id));
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Your UPI Entries</h2>
      {upiList.length === 0 ? (
        <p className="text-gray-500 text-center">No UPI details found.</p>
      ) : (
        <ul className="space-y-4">
          {upiList.map((upi) => (
            <li key={upi._id} className="p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow flex justify-between items-center space-x-4">
              <div className="flex flex-col items-start space-y-1">
                <p className="text-lg font-semibold text-gray-400"><strong>UPI ID:</strong> {upi.upiId}</p>
                <img
                  src={upi.qrImage}
                  alt="QR Code"
                  className="mt-2 w-24 h-24 object-cover border rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => handleDelete(upi._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpiList;

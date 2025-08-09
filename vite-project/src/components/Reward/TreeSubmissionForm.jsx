import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadSubmission } from '../../slices/submissionSlice';
import { useDropzone } from 'react-dropzone';
import NavBar from '../NavBar';
import Footer from '../Footer';

export default function TreeSubmissionForm() {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("Please enter your name.");
            return;
        }
        if (!image) {
            alert("Please upload an image.");
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        dispatch(uploadSubmission(formData));
        setName('');
        setImage(null);
    };

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <>
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-10">
                <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">🌱 Submit Tree Proof Your Name Is Required</h2>

                {/* Two Sections: Image Upload & Form */}
                <div className="flex space-x-8">
                    {/* Image Section */}
                    <div className="flex-1 p-6 bg-green-50 rounded-lg">
                        <div
                            {...getRootProps()}
                            className="flex justify-center items-center h-64 border-2 border-dashed border-green-500 rounded-lg bg-green-100 text-center cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <p className="text-green-600 font-semibold">Drag & Drop an Image Here or Click to Upload</p>
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 p-6 bg-green-50 rounded-lg">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

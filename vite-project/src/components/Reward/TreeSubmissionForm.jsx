// src/components/TreeSubmissionForm.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadSubmission } from "../../slices/submissionSlice";
import { useDropzone } from "react-dropzone";
import { Upload, User, CheckCircle } from "lucide-react";

export default function TreeSubmissionForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
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
    formData.append("name", name);
    formData.append("image", image);
    dispatch(uploadSubmission(formData));
    setName("");
    setImage(null);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 2500); // hide success after 2.5s
  };

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl max-w-3xl mx-auto mt-12 border border-green-100">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        🌱 Submit Your Tree Proof
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Upload Section */}
          <div className="flex-1 p-6 bg-green-50 rounded-xl border border-green-200">
            <div
              {...getRootProps()}
              className="flex justify-center items-center h-64 border-2 border-dashed border-green-400 rounded-xl bg-green-100 cursor-pointer hover:bg-green-200 transition"
            >
              <input {...getInputProps()} />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center text-green-600">
                  <Upload size={36} />
                  <p className="mt-2 font-semibold">
                    Drag & Drop or Click to Upload
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Name + Submit Section */}
          <div className="flex-1 flex flex-col justify-between p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 mb-4 bg-white">
              <User className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Success Message */}
      {submitted && (
        <div className="mt-6 flex items-center justify-center text-green-600 font-semibold">
          <CheckCircle className="mr-2" /> Submission Successful!
        </div>
      )}
    </div>
  );
}

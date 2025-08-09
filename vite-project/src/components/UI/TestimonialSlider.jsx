import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, deleteTestimonial } from '../../slices/testimonialSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const TestimonialSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector((state) => state.testimonial);

  // Fetch from backend
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // Fallback testimonials if nothing comes from DB
  const fallbackTestimonials = [
    { name: 'John Doe', message: 'This is an amazing website! 🌱', img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg' },
    { name: 'Jane Smith', message: 'I love the tree-planting feature, so rewarding! 🌿', img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg' },
    { name: 'Alice Johnson', message: 'A wonderful platform to help the environment! 🌍', img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg' },
  ];

  const displayTestimonials = testimonials?.length ? testimonials : fallbackTestimonials;

  if (loading) return <p className="text-center mt-8">Loading testimonials...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

  const fallbackImg = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg';

  // Handle testimonial deletion
  const handleDelete = (testimonialId) => {
    dispatch(deleteTestimonial(testimonialId)); // Dispatch the delete action with the testimonial ID
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-8 ">
      {/* Left - Swiper */}
      <div className="w-full md:w-2/3">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="rounded-2xl"
        >
          {displayTestimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-l shadow-lg p-8 flex items-center text-center h-full bg-white">
                {/* Rectangular image */}
                <div className="w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-full mb-6 shadow-lg mx-auto">
                  <img
                    src={t.img?.trim() || fallbackImg}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-green-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                  <p className="text-green-800 text-base md:text-lg italic mb-4 px-4 leading-relaxed">
                    “{t.message}”
                  </p>
                  <h4 className="text-green-900 font-semibold text-md md:text-lg mt-2">
                    — {t.name}
                  </h4>
                  <button
                    onClick={() => handleDelete(t._id)} // Call handleDelete on button click
                    className="mt-4 text-red-500 text-sm hover:text-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right - Info + Button */}
      <div className="w-full md:w-1/3  rounded-2xl shadow-lg p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">🌳 Your Story Matters</h2>
          <p className="text-gray-200 text-md leading-relaxed mb-6">
            Every tree you plant makes a difference. <br />
            Share your journey and inspire others to protect our planet.
          </p>
        </div>
        <button
          onClick={() => navigate('/testimonial')}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Add Your Testimonial
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;

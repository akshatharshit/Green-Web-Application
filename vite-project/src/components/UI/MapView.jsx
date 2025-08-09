import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icons
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [16, 16],
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
  iconSize: [32, 32],
});

const locations = [
  { id: 1, name: "Amazon Forest", lat: -3.4653, lng: -62.2159, user: "Carlos" },
  { id: 2, name: "Kenya Highlands", lat: 0.0236, lng: 37.9062, user: "Amina" },
  { id: 3, name: "Nepal Hills", lat: 28.3949, lng: 84.1240, user: "Ravi" },
  { id: 4, name: "Congo Rainforest", lat: -1.0000, lng: 15.0000, user: "Liam" },
  { id: 5, name: "Great Barrier Reef", lat: -18.2871, lng: 147.6992, user: "Olivia" },
  { id: 6, name: "Borneo Rainforest", lat: 4.1654, lng: 114.7221, user: "Noah" },
  { id: 7, name: "Sundarbans Forest", lat: 22.0167, lng: 89.5000, user: "Sophia" },
  { id: 8, name: "Tian Shan Mountains", lat: 42.8333, lng: 78.0000, user: "Emma" },
  { id: 9, name: "Madagascar Rainforest", lat: -13.0000, lng: 49.0000, user: "Lucas" },
  { id: 10, name: "Yosemite National Park", lat: 37.8651, lng: -119.5383, user: "Isabella" },
  { id: 11, name: "Serengeti National Park", lat: -2.3333, lng: 34.8333, user: "James" },
  { id: 12, name: "Gobi Desert", lat: 42.5000, lng: 105.0000, user: "Mia" },
  { id: 13, name: "Black Forest", lat: 48.0000, lng: 8.0000, user: "Benjamin" },
  { id: 14, name: "Banff National Park", lat: 51.4968, lng: -115.9281, user: "Charlotte" },
  { id: 15, name: "Kruger National Park", lat: -24.0000, lng: 31.0000, user: "Ethan" },
  { id: 16, name: "Mount Everest", lat: 27.9881, lng: 86.9250, user: "Amelia" },
  { id: 17, name: "Mount Kilimanjaro", lat: -3.0674, lng: 37.3522, user: "Alexander" },
  { id: 18, name: "Yellowstone National Park", lat: 44.4280, lng: -110.5885, user: "Harper" },
  { id: 19, name: "Chilean Patagonia", lat: -49.0000, lng: -72.0000, user: "Elijah" },
  { id: 20, name: "Chernobyl Exclusion Zone", lat: 51.2760, lng: 30.2210, user: "Grace" },
  { id: 21, name: "Mount Fuji", lat: 35.3606, lng: 138.7274, user: "Daniel" },
  { id: 22, name: "Galapagos Islands", lat: -0.9538, lng: -90.9656, user: "Zoe" },
  { id: 23, name: "Himalayas", lat: 28.5940, lng: 81.6125, user: "Jack" },
  { id: 24, name: "Cascades Mountains", lat: 44.0000, lng: -121.0000, user: "Lily" },
  { id: 25, name: "Everglades National Park", lat: 25.2866, lng: -80.8987, user: "Jackson" },
  { id: 26, name: "Grand Canyon", lat: 36.1069, lng: -112.1129, user: "Samuel" },
  { id: 27, name: "Alaska Wildlife Refuge", lat: 68.1234, lng: -146.7223, user: "Liam" },
  { id: 28, name: "Lake Baikal", lat: 53.5587, lng: 108.1650, user: "Ava" },
  { id: 29, name: "Angel Falls", lat: 5.9670, lng: -62.5360, user: "Luca" },
  { id: 30, name: "Rockies", lat: 39.5501, lng: -105.7821, user: "Sophia" },
  { id: 31, name: "Sahara Desert", lat: 23.4162, lng: 25.6628, user: "Daniel" },
  { id: 32, name: "Machu Picchu", lat: -13.1631, lng: -72.5450, user: "Mia" },
  { id: 33, name: "Mount Rainer", lat: 46.8523, lng: -121.7603, user: "Olivia" },
  { id: 34, name: "Mount Fuji", lat: 35.3606, lng: 138.7274, user: "Ethan" },
  { id: 35, name: "Great Smoky Mountains", lat: 35.6118, lng: -83.4895, user: "James" },
  { id: 36, name: "Zion National Park", lat: 37.2982, lng: -113.0263, user: "Grace" },
  { id: 37, name: "Torres del Paine", lat: -51.2545, lng: -73.4920, user: "Elijah" },
  { id: 38, name: "Mount Kilimanjaro", lat: -3.0674, lng: 37.3522, user: "Harper" },
  { id: 39, name: "Victoria Falls", lat: -17.9244, lng: 25.8567, user: "Zoe" },
  { id: 40, name: "Lake Titicaca", lat: -15.7653, lng: -69.5318, user: "Zoe" },
  { id: 41, name: "Mount Denali", lat: 63.0695, lng: -151.0068, user: "Samuel" },
  { id: 42, name: "Yosemite National Park", lat: 37.8651, lng: -119.5383, user: "Ava" },
  { id: 43, name: "Cinque Terre", lat: 44.1150, lng: 9.6558, user: "Benjamin" },
  { id: 44, name: "Lake Ontario", lat: 43.6532, lng: -79.3832, user: "Noah" },
  { id: 45, name: "Lake Victoria", lat: -1.0000, lng: 33.0000, user: "Ravi" },
  { id: 46, name: "Great Wall of China", lat: 40.4319, lng: 116.5704, user: "Sofia" },
  { id: 47, name: "Dead Sea", lat: 31.5590, lng: 35.4732, user: "Amelia" },
  { id: 48, name: "Amazon Rainforest", lat: -3.0000, lng: -60.0000, user: "Carlos" },
  { id: 49, name: "Greenland", lat: 71.7069, lng: -42.6043, user: "Liam" },
  { id: 50, name: "Pacific Ocean", lat: -1.0000, lng: -150.0000, user: "Olivia" },
  { id: 51, name: "Bermuda Triangle", lat: 25.0000, lng: -71.0000, user: "Ethan" },
  { id: 52, name: "Hawaii Volcanoes", lat: 19.4194, lng: -155.2813, user: "Ravi" },
  { id: 53, name: "Falkland Islands", lat: -51.7000, lng: -59.0000, user: "Sophia" },
  { id: 54, name: "Amazon River", lat: -3.4653, lng: -62.2159, user: "Zoe" },
  { id: 55, name: "Salar de Uyuni", lat: -20.1333, lng: -66.8333, user: "James" },
  { id: 56, name: "Mount Elbrus", lat: 43.3499, lng: 42.4450, user: "Zoe" },
  { id: 57, name: "Lake Baikal", lat: 53.5587, lng: 108.1650, user: "Noah" },
  { id: 58, name: "Ganges River", lat: 25.3100, lng: 78.8000, user: "Mia" },
  { id: 59, name: "Tibetan Plateau", lat: 33.0000, lng: 91.0000, user: "Lucas" },
  { id: 60, name: "Angkor Wat", lat: 13.4125, lng: 103.8667, user: "Charlotte" },
  { id: 61, name: "Victoria Falls", lat: -17.9244, lng: 25.8567, user: "Isabella" },
  { id: 62, name: "Niagara Falls", lat: 43.0962, lng: -79.0377, user: "Benjamin" },
  { id: 63, name: "Alps Mountains", lat: 45.8320, lng: 7.8699, user: "Daniel" },
  { id: 64, name: "Chichen Itza", lat: 20.6829, lng: -88.5686, user: "Emma" },
  { id: 65, name: "The Everglades", lat: 25.2866, lng: -80.8987, user: "Sophia" },
  { id: 66, name: "Grand Canyon", lat: 36.1069, lng: -112.1129, user: "Ravi" },
  { id: 67, name: "Victoria Falls", lat: -17.9244, lng: 25.8567, user: "Amelia" },
  { id: 68, name: "Mount Everest", lat: 27.9881, lng: 86.9250, user: "Olivia" },
  { id: 69, name: "Machu Picchu", lat: -13.1631, lng: -72.5450, user: "Zoe" },
  { id: 70, name: "Yosemite", lat: 37.8651, lng: -119.5383, user: "Harper" },
  { id: 71, name: "Kilimanjaro", lat: -3.0674, lng: 37.3522, user: "Emma" },
  { id: 72, name: "Serengeti", lat: -2.3333, lng: 34.8333, user: "Carlos" },
  { id: 73, name: "Himalayas", lat: 28.5940, lng: 81.6125, user: "Ava" },
  { id: 74, name: "Oasis of Mara", lat: -1.2444, lng: 36.6894, user: "Isabella" },
  { id: 75, name: "Congo Basin", lat: -1.0000, lng: 15.0000, user: "Noah" },
  { id: 76, name: "Amazon Basin", lat: -3.4653, lng: -62.2159, user: "Zoe" },
  { id: 77, name: "Namib Desert", lat: -24.0000, lng: 16.0000, user: "Lucas" },
  { id: 78, name: "Moscow", lat: 55.7558, lng: 37.6173, user: "Ava" },
  { id: 79, name: "Paris", lat: 48.8566, lng: 2.3522, user: "Ethan" },
  { id: 80, name: "London", lat: 51.5074, lng: -0.1278, user: "Harper" },
  { id: 81, name: "Sydney", lat: -33.8688, lng: 151.2093, user: "Isabella" },
  { id: 82, name: "New York", lat: 40.7128, lng: -74.0060, user: "Benjamin" },
  { id: 83, name: "Rome", lat: 41.9028, lng: 12.4964, user: "Charlotte" },
  { id: 84, name: "Tokyo", lat: 35.6762, lng: 139.6503, user: "Daniel" },
  { id: 85, name: "Los Angeles", lat: 34.0522, lng: -118.2437, user: "Mia" },
  { id: 86, name: "Berlin", lat: 52.5200, lng: 13.4050, user: "Ravi" },
  { id: 87, name: "Dubai", lat: 25.276987, lng: 55.296249, user: "Zoe" },
  { id: 88, name: "Shanghai", lat: 31.2304, lng: 121.4737, user: "Sophia" },
  { id: 89, name: "Istanbul", lat: 41.0082, lng: 28.9784, user: "Olivia" },
  { id: 90, name: "Cairo", lat: 30.0444, lng: 31.2357, user: "Amelia" },
  { id: 91, name: "Los Angeles", lat: 34.0522, lng: -118.2437, user: "Benjamin" },
  { id: 92, name: "Sydney", lat: -33.8688, lng: 151.2093, user: "Ravi" },
  { id: 93, name: "London", lat: 51.5074, lng: -0.1278, user: "Charlotte" },
  { id: 94, name: "Paris", lat: 48.8566, lng: 2.3522, user: "Zoe" },
  { id: 95, name: "New York", lat: 40.7128, lng: -74.0060, user: "Sophia" },
  { id: 96, name: "Berlin", lat: 52.5200, lng: 13.4050, user: "Zoe" },
  { id: 97, name: "Rome", lat: 41.9028, lng: 12.4964, user: "Olivia" },
  { id: 98, name: "Tokyo", lat: 35.6762, lng: 139.6503, user: "Amelia" },
  { id: 99, name: "Dubai", lat: 25.276987, lng: 55.296249, user: "Sophia" },
  { id: 100, name: "Shanghai", lat: 31.2304, lng: 121.4737, user: "Daniel" }
];


const MapView = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userLocation");
    if (stored) {
      setUserLocation(JSON.parse(stored));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem("userLocation", JSON.stringify(coords));
          setUserLocation(coords);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  return (
    <>
      <h2 className="mt-16 text-2xl font-bold text-green-600 mb-6 text-center">Map &#x1F5FA;</h2>
      <div className="flex justify-center items-center py-12 px-4 mb-16">
        <div className="h-[400px] w-full max-w-[800px] rounded-lg overflow-hidden shadow-2xl border border-green-300 bg-white">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={false}
            className="h-full w-full rounded-lg"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {locations.map(loc => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                <Popup>
                  <strong>{loc.name}</strong><br />
                  Planted by {loc.user}
                </Popup>
              </Marker>
            ))}

            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <strong>Your Location</strong><br />
                  You are here 🌍
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapView;

import { Camera, Brain } from "lucide-react"
import { useNavigate } from "react-router-dom"
import heroImage from "../assets/farmer.jpg"

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative h-screen w-full overflow-hidden -mt-20">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-green/60 via-red-900/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
                    AI-Powered Farming Intelligence
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                    Smart crop disease detection, precision fertilizer recommendations, and data-driven planting decisions for sustainable agriculture.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* First button — glowing green */}
                    <button
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-green-500/50 transition-transform duration-200 hover:bg-green-700 hover:scale-105"
                        onClick={() => navigate("/disease")}
                    >
                        <Camera className="h-5 w-5" />
                        Scan for Diseases
                    </button>

                    {/* Second button — outlined style */}
                    <button
                        className="flex items-center gap-2 border-2 border-green-400 text-green-200 px-6 py-3 rounded-2xl font-semibold transition-colors duration-200 hover:bg-green-400/20"
                        onClick={() =>
                            document.getElementById("ai-prediction-cards")?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        <Brain className="h-5 w-5" />
                        Get AI Recommendations
                    </button>

                </div>
            </div>
        </section>
    )
}

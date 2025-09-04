import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bug, Droplets, Sprout, ArrowRight, Shield, Zap, Target, 
  Sparkles, Lock, Star, TrendingUp, Brain, Eye, Settings,
  ChevronDown, ChevronUp, ExternalLink, Crown
} from 'lucide-react';

function AIPredictionCards() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const predictionCards = [
    {
      title: "Crop Disease Prediction",
      subtitle: "AI-Powered Plant Health",
      description: "Advanced computer vision detects diseases before they spread. Get instant diagnosis with 95% accuracy.",
      icon: <Bug className="h-8 w-8" />,
      features: ["Real-time image analysis", "Treatment protocols", "Prevention strategies", "Expert consultations"],
      secretFeatures: ["Disease progression modeling", "Weather correlation analysis", "Pesticide resistance tracking"],
      route: "/disease",
      gradient: "from-red-500 via-pink-500 to-rose-500",
      bgGradient: "from-red-50 via-pink-50 to-rose-50",
      accentColor: "text-red-600",
      badge: "Popular",
      accuracy: "95%",
      secretLevel: 1
    },
    {
      title: "Fertilizer Optimization",
      subtitle: "Smart Nutrient Management",
      description: "Machine learning algorithms analyze soil composition and recommend optimal fertilizer blends for maximum yield.",
      icon: <Droplets className="h-8 w-8" />,
      features: ["Soil composition analysis", "Nutrient deficiency detection", "Custom fertilizer recipes", "Cost optimization"],
      secretFeatures: ["Micro-nutrient analysis", "Seasonal adjustment algorithms", "Environmental impact scoring"],
      route: "/FertilizerPredictor",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-50 via-cyan-50 to-teal-50",
      accentColor: "text-blue-600",
      badge: "Advanced",
      accuracy: "92%",
      secretLevel: 2
    },
    {
      title: "Crop Yield Prediction",
      subtitle: "Future Harvest Intelligence",
      description: "Predict crop yields using satellite data, weather patterns, and soil conditions. Plan your harvest with confidence.",
      icon: <Sprout className="h-8 w-8" />,
      features: ["Satellite imagery analysis", "Weather pattern integration", "Yield forecasting", "Market price predictions"],
      secretFeatures: ["Climate change adaptation", "Genetic optimization suggestions", "Supply chain optimization"],
      route: "/crop",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgGradient: "from-green-50 via-emerald-50 to-teal-50",
      accentColor: "text-green-600",
      badge: "Premium",
      accuracy: "88%",
      secretLevel: 3
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
    if (!secretUnlocked && index === 2) {
      setSecretUnlocked(true);
    }
  };

  return (
    <div className="py-12 px-4 mb-16  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-400 to-blue-400 bg-clip-text text-transparent">
              AI Agriculture Suite
            </h2>
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI technology transforming agriculture with precision, intelligence, and sustainability.
          </p>
          {secretUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center justify-center gap-2 text-yellow-400"
            >
              <Crown className="h-5 w-5" />
              <span className="text-sm font-semibold">Secret Features Unlocked!</span>
            </motion.div>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictionCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative"
            >
              {/* Card Container */}
              <div 
                className={`relative bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-3xl hover:border-white/40`}
                onClick={() => toggleExpanded(index)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-white/20 backdrop-blur-sm ${card.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                        {card.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                            {card.title}
                          </h3>
                          {card.secretLevel > 1 && (
                            <Lock className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{card.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${card.accentColor} bg-white/50`}>
                        {card.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <TrendingUp className="h-3 w-3" />
                        {card.accuracy}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Features Preview */}
                  <div className="space-y-2 mb-4">
                    {card.features.slice(0, 2).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Expand Button */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(card.route);
                      }}
                      className={`px-4 py-2 bg-gradient-to-r ${card.gradient} text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Launch AI
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                    >
                      {expandedCard === index ? 
                        <ChevronUp className="h-4 w-4 text-gray-600" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      }
                    </motion.button>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            Advanced Features
                          </h4>
                          {card.features.slice(2).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-xs text-gray-600">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                          
                          {/* Secret Features */}
                          {secretUnlocked && card.secretFeatures && (
                            <div className="mt-3 pt-3 border-t border-yellow-200/30">
                              <h5 className="text-xs font-bold text-yellow-600 flex items-center gap-1 mb-2">
                                <Crown className="h-3 w-3" />
                                Secret Features
                              </h5>
                              {card.secretFeatures.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-2 text-xs text-yellow-700">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Agriculture?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of farmers already using AI to increase yields, reduce costs, and build sustainable farming practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/ai')}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Settings className="h-5 w-5" />
                Explore All Tools
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Get Expert Help
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AIPredictionCards;

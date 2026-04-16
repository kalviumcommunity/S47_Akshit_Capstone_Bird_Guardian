import React from 'react';
import { BookOpen, Droplet, Shield, Heart, Leaf, Utensils } from 'lucide-react';

const modules = [
  {
    title: "Providing Fresh Water",
    description: "Especially during hot summers, putting out a shallow earthen pot or birdbath with clean water can save lives. Change the water daily to prevent mosquitoes and diseases.",
    icon: <Droplet className="w-8 h-8 text-blue-400" />,
    color: "from-blue-500/20 to-blue-500/0",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "Setting Up Feeders",
    description: "Place feeders in a quiet, shaded area. Use mixed seeds, grains, or suet. Keep feeders clean and place them away from large glass windows to prevent bird strikes.",
    icon: <Utensils className="w-8 h-8 text-amber-400" />,
    color: "from-amber-500/20 to-amber-500/0",
    border: "group-hover:border-amber-500/50"
  },
  {
    title: "Reporting Injured Birds",
    description: "If you find a hurt bird, carefully place it in a dark, quiet, well-ventilated cardboard box. Do NOT force-feed it water or food. Contact local wildlife rescue immediately.",
    icon: <Heart className="w-8 h-8 text-rose-400" />,
    color: "from-rose-500/20 to-rose-500/0",
    border: "group-hover:border-rose-500/50"
  },
  {
    title: "Why Conservation Matters",
    description: "Birds are crucial indicators of ecological health. They control pests, pollinate flowers, and distribute seeds. Protecting them means protecting our local ecosystems.",
    icon: <Shield className="w-8 h-8 text-orange-400" />,
    color: "from-orange-500/20 to-orange-500/0",
    border: "group-hover:border-orange-500/50"
  },
  {
    title: "Backyard Sanctuaries",
    description: "Create a safe haven in your garden or balcony by planting native shrubs and placing nesting boxes. Avoid using harsh chemical pesticides that poison their food sources.",
    icon: <Leaf className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/20 to-emerald-500/0",
    border: "group-hover:border-emerald-500/50"
  },
  {
    title: "Keeping Birds Cool",
    description: "In extreme heat waves, birds suffer from heatstroke. Providing deep shade and multiple hydration stations across your terrace or garden makes a massive difference.",
    icon: <BookOpen className="w-8 h-8 text-purple-400" />,
    color: "from-purple-500/20 to-purple-500/0",
    border: "group-hover:border-purple-500/50"
  }
];

const Learn = () => {
  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden pt-32 pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-xl mb-6">
            <BookOpen className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Avian Care <span className="bg-gradient-to-r from-orange-400 to-amber-600 text-transparent bg-clip-text">Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
            Discover simple, actionable ways to help the birds in your local neighborhood thrive. Every small effort counts.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className={`group relative bg-neutral-900/50 backdrop-blur-xl rounded-3xl border border-neutral-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden ${module.border}`}
            >
              {/* Subtle top gradient glow */}
              <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${module.color} pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100`} />
              
              <div className="relative z-10">
                <div className="bg-neutral-950/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-neutral-800/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{module.title}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Learn;
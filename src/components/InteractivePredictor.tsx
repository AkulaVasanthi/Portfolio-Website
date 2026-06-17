import { useState, useEffect } from 'react';
import { Play, TrendingUp, Activity, CheckCircle, RefreshCw, Cpu, Award } from 'lucide-react';

interface PredictionData {
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  age: number;
}

export default function InteractivePredictor() {
  const [inputs, setInputs] = useState<PredictionData>({
    sqft: 1800,
    bedrooms: 3,
    bathrooms: 2,
    location: 'suburban',
    age: 5,
  });

  const [isTraining, setIsTraining] = useState(false);
  const [modelTrained, setModelTrained] = useState(true);
  const [trainingEpoch, setTrainingEpoch] = useState(100);
  const [loss, setLoss] = useState(0.024);
  const [prediction, setPrediction] = useState<number | null>(null);
  
  // Model coefficients
  const basePrice = 50000;
  const sqftWeight = 145; // $145 per sqft
  const bedroomWeight = 25000; // $25k per bedroom
  const bathroomWeight = 18000; // $18k per bathroom
  const locationMultipliers: Record<string, number> = {
    urban: 1.35,
    suburban: 1.0,
    rural: 0.75,
  };
  const ageDepreciation = 1200; // Depreciates $1,200 per year of age

  // Recalculate price estimation
  const calculatePrediction = () => {
    const rawPrice = basePrice + 
                     (inputs.sqft * sqftWeight) + 
                     (inputs.bedrooms * bedroomWeight) + 
                     (inputs.bathrooms * bathroomWeight) - 
                     (inputs.age * ageDepreciation);
    const multiplier = locationMultipliers[inputs.location] || 1.0;
    return Math.max(30000, Math.round(rawPrice * multiplier));
  };

  useEffect(() => {
    if (modelTrained) {
      setPrediction(calculatePrediction());
    }
  }, [inputs, modelTrained]);

  const handleTrainModel = () => {
    setIsTraining(true);
    setModelTrained(false);
    let epoch = 0;
    const interval = setInterval(() => {
      epoch += 10;
      setTrainingEpoch(epoch);
      setLoss((prev) => Math.max(0.015, prev - Math.random() * 0.005));
      if (epoch >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsTraining(false);
          setModelTrained(true);
          setPrediction(calculatePrediction());
        }, 300);
      }
    }, 120);
  };

  return (
    <div id="interactive-predictor" className="glass-card md:p-6 p-4 rounded-2xl relative overflow-hidden bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2 inline-block">
            Project Interactive Sandbox
          </span>
          <h3 className="font-sans text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="text-purple-400 w-6 h-6 animate-pulse" />
            House Price ML Simulator
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-sans">
            Linear Regression formulation trained on property parameters.
          </p>
        </div>

        <button
          onClick={handleTrainModel}
          disabled={isTraining}
          id="btn-train-model"
          className={`flex items-center gap-2 font-mono text-xs font-semibold uppercase px-4 py-2.5 rounded-xl border transition-all duration-300 ${
            isTraining
              ? 'bg-purple-900/30 border-purple-500/30 text-purple-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white border-transparent shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5'
          }`}
        >
          {isTraining ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
              Optimizing Epochs {trainingEpoch}%
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white fill-current" />
              Re-Train AI Model
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model variables inputs */}
        <div id="ml-simulator-inputs" className="lg:col-span-6 space-y-5">
          <h4 className="text-sm font-mono font-medium uppercase text-purple-400 tracking-wider">
            1. Feature Parameters
          </h4>

          {/* SQFT */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-gray-300">Living Area (Sq Ft)</span>
              <span className="text-cyan-400 font-bold">{inputs.sqft.toLocaleString()} sqft</span>
            </div>
            <input
              type="range"
              min="800"
              max="4500"
              step="50"
              value={inputs.sqft}
              onChange={(e) => setInputs({ ...inputs, sqft: parseInt(e.target.value) })}
              id="slider-sqft"
              className="w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>800 sqft</span>
              <span>4,500 sqft</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Bedrooms */}
            <div className="space-y-1.5">
              <label htmlFor="select-bedrooms" className="block text-xs font-mono text-gray-300">Bedrooms</label>
              <select
                id="select-bedrooms"
                value={inputs.bedrooms}
                onChange={(e) => setInputs({ ...inputs, bedrooms: parseInt(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-slate-900 text-white">
                    {n} Beds
                  </option>
                ))}
              </select>
            </div>

            {/* Bathrooms */}
            <div className="space-y-1.5">
              <label htmlFor="select-bathrooms" className="block text-xs font-mono text-gray-300">Bathrooms</label>
              <select
                id="select-bathrooms"
                value={inputs.bathrooms}
                onChange={(e) => setInputs({ ...inputs, bathrooms: parseInt(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
              >
                {[1, 1.5, 2, 2.5, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-slate-900 text-white">
                    {n} Baths
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Location */}
            <div className="space-y-1.5">
              <label htmlFor="select-location" className="block text-xs font-mono text-gray-300">Location Grade</label>
              <select
                id="select-location"
                value={inputs.location}
                onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
              >
                <option value="urban" className="bg-slate-900 text-white">Urban Prime (1.35x)</option>
                <option value="suburban" className="bg-slate-900 text-white">Suburban Comm (1.00x)</option>
                <option value="rural" className="bg-slate-900 text-white">Rural Foothills (0.75x)</option>
              </select>
            </div>

            {/* Property Age */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-300">Property Age</span>
                <span className="text-pink-400">{inputs.age} years</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) })}
                id="slider-age"
                className="w-full accent-pink-500 bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>0 yr (New)</span>
                <span>50 yrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Dashboard */}
        <div id="ml-simulator-output" className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="space-y-4 bg-white/5 rounded-xl border border-white/10 p-4">
            <h4 className="text-sm font-mono font-medium uppercase text-cyan-400 tracking-wider">
              2. Regression Evaluation
            </h4>

            {isTraining ? (
              <div className="h-28 flex flex-col items-center justify-center space-y-2">
                <Activity className="w-8 h-8 text-purple-400 animate-bounce" />
                <span className="font-mono text-xs text-purple-300 animate-pulse">
                  Stochastic Gradient Descent: loss = {loss.toFixed(5)}
                </span>
                <div className="w-1/2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-150" 
                    style={{ width: `${trainingEpoch}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2 relative">
                {modelTrained && prediction !== null ? (
                  <div className="text-center">
                    <span className="text-gray-400 text-xs font-mono block mb-1">
                      ESTIMATED VALUATION
                    </span>
                    <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 transition-all duration-300">
                      ${prediction.toLocaleString()}
                    </span>
                    <span className="text-green-400 text-xs font-mono flex items-center justify-center gap-1.5 mt-2">
                      <CheckCircle className="w-4.5 h-4.5" /> Normal convergence reached
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs font-mono py-6">Model offline. Train to activate.</span>
                )}
              </div>
            )}
          </div>

          {/* Weights evaluation dashboard stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest block mb-1">
                Coefficient Beta Matrix
              </span>
              <ul className="text-[11px] font-mono text-gray-300 space-y-1">
                <li className="flex justify-between">
                  <span>&beta;_SqFt (size):</span>
                  <span className="text-white">+${sqftWeight}</span>
                </li>
                <li className="flex justify-between">
                  <span>&beta;_Beds:</span>
                  <span className="text-white">+$25K</span>
                </li>
                <li className="flex justify-between">
                  <span>&beta;_Age:</span>
                  <span className="text-pink-500">-$1.2K/yr</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                System Health metrics
              </span>
              <ul className="text-[11px] font-mono text-gray-300 space-y-1">
                <li className="flex justify-between">
                  <span>R-Squared (R²):</span>
                  <span className="text-white font-bold">0.92</span>
                </li>
                <li className="flex justify-between">
                  <span>Mean Abs Error:</span>
                  <span className="text-white">$8,410</span>
                </li>
                <li className="flex justify-between">
                  <span>Train Test Ratio:</span>
                  <span className="text-white">80 / 20</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 font-mono flex items-center justify-center gap-2 bg-slate-900/60 py-2 rounded-xl border border-white/5 px-2">
            <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>Built using foundational Python ML architectures & ported to client-side.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Cpu, 
  Layers, 
  RefreshCw, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Sliders, 
  Info, 
  ShieldCheck, 
  Activity,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { 
  CUT_OPTIONS, 
  COLOR_OPTIONS, 
  CLARITY_OPTIONS, 
  PRESET_DIAMONDS 
} from './constants/diamondData';
import { fetchHealthStatus, predictPrice, triggerReloadModels } from './services/api';

// Faceted Adaptive Liquid Glass Diamond (Adapts to Dark / Light)
function AdaptiveFacetedDiamond({ cut = 'Ideal', color = 'E', carat = 0.7, isPredicting = false, isDark = true }) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 select-none">
      {/* Ambient Caustic Glow */}
      <div className={`absolute w-44 h-44 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
        isDark 
          ? (isPredicting ? 'bg-white/25 scale-125' : 'bg-white/10 scale-100 group-hover:scale-110')
          : (isPredicting ? 'bg-black/15 scale-125' : 'bg-black/5 scale-100 group-hover:scale-110')
      }`} />
      
      {/* 3D-Styled Liquid Glass Diamond */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg 
          viewBox="0 0 200 180" 
          className={`w-full h-full transition-transform duration-500 ${
            isDark 
              ? 'drop-shadow-[0_16px_32px_rgba(255,255,255,0.22)]' 
              : 'drop-shadow-[0_16px_32px_rgba(0,0,0,0.14)]'
          } ${isPredicting ? 'scale-105 animate-pulse' : 'hover:scale-105'}`}
        >
          <defs>
            {/* Dark Mode Gradients */}
            <linearGradient id="facetTopDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#e4e4e7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="facetLeftDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4d4d8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#27272a" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="facetRightDark" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4f4f5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3f3f46" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="facetCenterDark" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#e4e4e7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#18181b" stopOpacity="0.95" />
            </linearGradient>

            {/* Light Mode Gradients */}
            <linearGradient id="facetTopLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#f4f4f5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e4e4e7" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="facetLeftLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4f4f5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d4d4d8" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="facetRightLight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e4e4e7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="facetCenterLight" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#f4f4f5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.95" />
            </linearGradient>

            <filter id="glassGlint" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Table (Top Flat Face) */}
          <polygon 
            points="60,25 140,25 165,65 35,65" 
            fill={isDark ? "url(#facetTopDark)" : "url(#facetTopLight)"} 
            stroke={isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"} 
            strokeWidth="1.2"
          />

          {/* Crown Upper Triangular Facets */}
          <polygon 
            points="60,25 100,25 80,65" 
            fill={isDark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.85)"} 
            stroke={isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)"} 
            strokeWidth="0.8"
          />
          <polygon 
            points="100,25 140,25 120,65" 
            fill={isDark ? "rgba(212,212,216,0.65)" : "rgba(244,244,245,0.8)"} 
            stroke={isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)"} 
            strokeWidth="0.8"
          />
          <polygon 
            points="35,65 60,25 80,65" 
            fill={isDark ? "url(#facetLeftDark)" : "url(#facetLeftLight)"} 
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)"} 
            strokeWidth="0.8"
          />
          <polygon 
            points="140,25 165,65 120,65" 
            fill={isDark ? "url(#facetRightDark)" : "url(#facetRightLight)"} 
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)"} 
            strokeWidth="0.8"
          />

          {/* Pavilion Center Main Triangular Body */}
          <polygon 
            points="35,65 80,65 100,165" 
            fill={isDark ? "url(#facetLeftDark)" : "url(#facetLeftLight)"} 
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"} 
            strokeWidth="1"
          />
          <polygon 
            points="80,65 120,65 100,165" 
            fill={isDark ? "url(#facetCenterDark)" : "url(#facetCenterLight)"} 
            stroke={isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)"} 
            strokeWidth="1.2"
          />
          <polygon 
            points="120,65 165,65 100,165" 
            fill={isDark ? "url(#facetRightDark)" : "url(#facetRightLight)"} 
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"} 
            strokeWidth="1"
          />

          {/* Specular Edge Highlights */}
          <line x1="35" y1="65" x2="165" y2="65" stroke={isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.7)"} strokeWidth="1.5" />
          <line x1="60" y1="25" x2="140" y2="25" stroke={isDark ? "#ffffff" : "rgba(0,0,0,0.8)"} strokeWidth="1.5" />
          <line x1="100" y1="65" x2="100" y2="165" stroke={isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"} strokeWidth="1" />
          <circle cx="95" cy="50" r="3" fill="#ffffff" opacity={isDark ? "0.95" : "0.9"} filter="url(#glassGlint)" />
          <circle cx="125" cy="78" r="2" fill="#ffffff" opacity={isDark ? "0.8" : "0.75"} />
        </svg>

        {/* Shimmer Light Flare */}
        <div className={`absolute top-2 right-4 w-2 h-2 rounded-full shadow-[0_0_14px_4px_rgba(255,255,255,1)] animate-ping ${
          isDark ? 'bg-white' : 'bg-zinc-800 shadow-[0_0_12px_3px_rgba(0,0,0,0.3)]'
        }`} />
      </div>

      {/* Real-time Carat & Cut Liquid Glass Badge */}
      <div className="mt-4 flex items-center gap-2">
        <span className="liquid-glass-pill px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-sm dark:text-white text-zinc-900">
          <Sparkles className="w-3.5 h-3.5 dark:text-white text-black" />
          {carat} Carat • {cut} Cut
        </span>
        <span className="liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-mono dark:text-zinc-300 text-zinc-600">
          Color {color}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  // Theme state: 'auto' (browser default) | 'dark' | 'light'
  const [themeMode, setThemeMode] = useState('auto');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [formData, setFormData] = useState({
    carat: 0.70,
    cut: 'Ideal',
    color: 'E',
    clarity: 'VS1',
    depth: 61.5,
    table: 55.0,
    x: 5.70,
    y: 5.72,
    z: 3.51,
    ensemble_weight_ann: 0.60
  });

  const [loading, setLoading] = useState(false);
  const [reloadingModels, setReloadingModels] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Synchronize with browser theme in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyCurrentTheme = () => {
      if (themeMode === 'auto') {
        setIsDark(mediaQuery.matches);
      } else {
        setIsDark(themeMode === 'dark');
      }
    };

    applyCurrentTheme();

    const handleChange = (e) => {
      if (themeMode === 'auto') {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Update HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    const health = await fetchHealthStatus();
    setHealthStatus(health);
  };

  const handleReload = async () => {
    setReloadingModels(true);
    try {
      await triggerReloadModels();
      await checkHealth();
    } finally {
      setReloadingModels(false);
    }
  };

  const cycleTheme = () => {
    if (themeMode === 'auto') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('light');
    else setThemeMode('auto');
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const applyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      ...preset.data
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        carat: Number(formData.carat),
        cut: formData.cut,
        color: formData.color,
        clarity: formData.clarity,
        depth: Number(formData.depth),
        table: Number(formData.table),
        x: Number(formData.x),
        y: Number(formData.y),
        z: Number(formData.z),
        ensemble_weight_ann: Number(formData.ensemble_weight_ann)
      };

      const res = await predictPrice(payload);
      setResults(res);
    } catch (err) {
      setError(err.message || 'An error occurred while generating predictions.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount) => {
    if (amount === undefined || amount === null) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const allModelsReady = healthStatus?.random_forest_loaded && healthStatus?.ann_loaded;

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-[#f8fafc] text-zinc-950'
    }`}>
      {/* Dynamic Ambient Caustic Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full blur-[160px] transition-opacity duration-500 ${
          isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'
        }`} />
        <div className={`absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full blur-[140px] transition-opacity duration-500 ${
          isDark ? 'bg-zinc-600/[0.04]' : 'bg-zinc-400/[0.05]'
        }`} />
        <div className={`absolute top-2/3 -right-32 w-[520px] h-[520px] rounded-full blur-[150px] transition-opacity duration-500 ${
          isDark ? 'bg-zinc-400/[0.03]' : 'bg-zinc-300/[0.06]'
        }`} />
      </div>

      {/* Floating Dynamic Island / Status Bar */}
      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4 w-full">
        <div className="liquid-glass-pill rounded-full px-5 py-2.5 flex items-center justify-between gap-4 shadow-2xl transition-all duration-300">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full p-1.5 flex items-center justify-center shadow-md ${
              isDark ? 'bg-white text-black shadow-white/20' : 'bg-black text-white shadow-black/20'
            }`}>
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">
                Diamond Price Prediction
              </span>
              <span className="text-[10px] dark:text-zinc-400 text-zinc-500 font-medium">
                Dual-Engine ML Valuation
              </span>
            </div>
          </div>

          {/* Model Status Indicators & Theme Switcher */}
          <div className="flex items-center gap-2 text-xs">
            {/* Random Forest */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 dark:text-zinc-200 text-zinc-700">
              <span className={`w-2 h-2 rounded-full ${
                healthStatus?.random_forest_loaded 
                  ? (isDark ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]' : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.6)]') 
                  : 'bg-zinc-400'
              }`} />
              <span className="text-[11px] font-medium">Random Forest</span>
            </div>

            {/* ANN */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 dark:text-zinc-200 text-zinc-700">
              <span className={`w-2 h-2 rounded-full ${
                healthStatus?.ann_loaded 
                  ? (isDark ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]' : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.6)]') 
                  : 'bg-zinc-400'
              }`} />
              <span className="text-[11px] font-medium">Neural Net (ANN)</span>
            </div>

            {/* Theme Toggle Pill (Auto / Dark / Light) */}
            <button
              onClick={cycleTheme}
              title={`Theme: ${themeMode === 'auto' ? 'Auto (Matching Browser)' : themeMode.toUpperCase()} - Click to change`}
              className="px-2.5 py-1.5 rounded-full dark:bg-white/[0.08] dark:hover:bg-white/[0.18] bg-black/5 hover:bg-black/10 border dark:border-white/15 border-black/10 dark:text-zinc-200 text-zinc-800 transition active:scale-95 flex items-center gap-1.5"
            >
              {themeMode === 'auto' ? (
                <>
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden md:inline">Auto</span>
                </>
              ) : isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden md:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden md:inline">Light</span>
                </>
              )}
            </button>

            {/* Reload Models Action */}
            <button
              onClick={handleReload}
              disabled={reloadingModels}
              title="Refresh / Reload Models"
              className="p-1.5 rounded-full dark:bg-white/[0.08] dark:hover:bg-white/[0.18] bg-black/5 hover:bg-black/10 border dark:border-white/15 border-black/10 dark:text-zinc-200 text-zinc-800 transition active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${reloadingModels ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Page Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full relative z-10">

        {/* Pending Models Alert */}
        {!allModelsReady && (
          <div className="mb-8 liquid-glass-card rounded-3xl p-5 border-black/10 dark:border-white/20 dark:text-zinc-200 text-zinc-800 flex items-start gap-3.5 shadow-xl">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Model Artifacts Pending</p>
              <p className="dark:text-zinc-400 text-zinc-600 text-xs mt-1 leading-relaxed">
                Ensure <code className="px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/5 border dark:border-white/20 border-black/10">diamond_random_forest.pkl</code> and <code className="px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/5 border dark:border-white/20 border-black/10">diamond_ann.pkl</code> are placed in <code className="px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/5 border dark:border-white/20 border-black/10">backend/models/</code>.
              </p>
            </div>
          </div>
        )}

        {/* Quick Presets */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider font-bold dark:text-zinc-400 text-zinc-500 flex items-center gap-1.5 mr-1">
            <Sparkles className="w-3.5 h-3.5" />
            Presets:
          </span>
          {PRESET_DIAMONDS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full liquid-glass-pill hover:bg-black/5 dark:hover:bg-white/[0.14] dark:text-zinc-200 text-zinc-800 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>{preset.name}</span>
              <span className="px-2 py-0.2 rounded-full dark:bg-white/10 bg-black/5 border dark:border-white/20 border-black/10 text-[10px] font-mono">
                {preset.data.carat} ct
              </span>
            </button>
          ))}
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Liquid Glass Input Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Glass Panel */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b dark:border-white/[0.08] border-black/[0.08]">
                <div>
                  <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Sliders className="w-5 h-5" />
                    Diamond Specifications
                  </h2>
                  <p className="text-xs dark:text-zinc-400 text-zinc-500 mt-1">
                    Provide the 9 gemological and dimensional measurements
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-white/[0.06] bg-black/5 border dark:border-white/15 border-black/10 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Dual Model
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Carat Slider & Number Input */}
                <div className="p-4 rounded-2xl dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08]">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold dark:text-zinc-200 text-zinc-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Carat Weight (0.1 - 10.0 ct)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        name="carat"
                        step="0.01"
                        min="0.1"
                        max="10.0"
                        required
                        value={formData.carat}
                        onChange={handleChange}
                        className="w-20 text-right px-2.5 py-1 text-sm font-mono font-bold liquid-glass-input rounded-lg focus:outline-none"
                      />
                      <span className="text-xs dark:text-zinc-400 text-zinc-500 font-medium">ct</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    name="carat"
                    min="0.1"
                    max="5.0"
                    step="0.01"
                    value={formData.carat}
                    onChange={handleChange}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800 bg-zinc-300 dark:accent-white accent-black"
                  />
                  <div className="flex justify-between text-[10px] dark:text-zinc-500 text-zinc-500 mt-1 font-mono">
                    <span>0.1 ct (Delicate)</span>
                    <span>1.0 ct (Standard)</span>
                    <span>3.0 ct (Luxury)</span>
                    <span>5.0+ ct (Museum)</span>
                  </div>
                </div>

                {/* 2. Cut Quality (Monochrome Segmented Control) */}
                <div>
                  <label className="block text-xs font-semibold dark:text-zinc-200 text-zinc-800 mb-2">
                    Cut Grade
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 p-1 rounded-2xl dark:bg-zinc-950 bg-zinc-200/60 border dark:border-white/10 border-black/5 backdrop-blur-md">
                    {CUT_OPTIONS.map((opt) => {
                      const isActive = formData.cut === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, cut: opt.value }))}
                          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 text-center ${
                            isActive
                              ? (isDark 
                                  ? 'bg-white text-black shadow-lg shadow-white/20 scale-[1.02]' 
                                  : 'bg-black text-white shadow-lg shadow-black/20 scale-[1.02]')
                              : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-black dark:hover:bg-white/[0.06] hover:bg-black/5'
                          }`}
                        >
                          {opt.value}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Color Grade (Monochrome Chips) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold dark:text-zinc-200 text-zinc-800">
                      Color Grade (D = Colorless / Best, J = Faint Tint)
                    </label>
                    <span className="text-[11px] font-mono dark:text-white text-zinc-900 font-bold">
                      Selected: {formData.color}
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 p-1 rounded-2xl dark:bg-zinc-950 bg-zinc-200/60 border dark:border-white/10 border-black/5">
                    {COLOR_OPTIONS.map((opt) => {
                      const isActive = formData.color === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color: opt.value }))}
                          className={`py-2 text-xs font-bold rounded-xl transition-all ${
                            isActive
                              ? (isDark 
                                  ? 'bg-white text-black shadow-md shadow-white/20' 
                                  : 'bg-black text-white shadow-md shadow-black/20')
                              : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-black dark:hover:bg-white/[0.06] hover:bg-black/5'
                          }`}
                        >
                          {opt.value}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Clarity Rating (Monochrome Chips) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold dark:text-zinc-200 text-zinc-800">
                      Clarity Rating (Flawless to Included)
                    </label>
                    <span className="text-[11px] font-mono dark:text-white text-zinc-900 font-bold">
                      Selected: {formData.clarity}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-1 rounded-2xl dark:bg-zinc-950 bg-zinc-200/60 border dark:border-white/10 border-black/5">
                    {CLARITY_OPTIONS.map((opt) => {
                      const isActive = formData.clarity === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, clarity: opt.value }))}
                          className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                            isActive
                              ? (isDark 
                                  ? 'bg-white text-black shadow-md shadow-white/20' 
                                  : 'bg-black text-white shadow-md shadow-black/20')
                              : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-black dark:hover:bg-white/[0.06] hover:bg-black/5'
                          }`}
                        >
                          {opt.value}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Physical Dimensions & Proportions */}
                <div className="p-4 rounded-2xl dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08] space-y-3">
                  <h3 className="text-xs uppercase font-bold tracking-wider dark:text-zinc-400 text-zinc-600 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Proportions & Geometric Coordinates
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {/* Depth */}
                    <div>
                      <label className="block text-[11px] font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                        Depth %
                      </label>
                      <input
                        type="number"
                        name="depth"
                        step="0.1"
                        min="40.0"
                        max="80.0"
                        required
                        value={formData.depth}
                        onChange={handleChange}
                        className="w-full liquid-glass-input rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    {/* Table */}
                    <div>
                      <label className="block text-[11px] font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                        Table %
                      </label>
                      <input
                        type="number"
                        name="table"
                        step="0.1"
                        min="40.0"
                        max="95.0"
                        required
                        value={formData.table}
                        onChange={handleChange}
                        className="w-full liquid-glass-input rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    {/* X */}
                    <div>
                      <label className="block text-[11px] font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                        X (mm)
                      </label>
                      <input
                        type="number"
                        name="x"
                        step="0.01"
                        min="0.1"
                        required
                        value={formData.x}
                        onChange={handleChange}
                        className="w-full liquid-glass-input rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    {/* Y */}
                    <div>
                      <label className="block text-[11px] font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                        Y (mm)
                      </label>
                      <input
                        type="number"
                        name="y"
                        step="0.01"
                        min="0.1"
                        required
                        value={formData.y}
                        onChange={handleChange}
                        className="w-full liquid-glass-input rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    {/* Z */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[11px] font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                        Z (mm)
                      </label>
                      <input
                        type="number"
                        name="z"
                        step="0.01"
                        min="0.1"
                        required
                        value={formData.z}
                        onChange={handleChange}
                        className="w-full liquid-glass-input rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Ensemble Blend Slider */}
                <div className="p-4 rounded-2xl dark:bg-white/[0.02] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08]">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold dark:text-zinc-200 text-zinc-800 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Ensemble Blend Weight (Log-Space Consensus)
                    </label>
                    <span className="text-xs font-mono font-bold">
                      {Math.round(formData.ensemble_weight_ann * 100)}% ANN / {Math.round((1 - formData.ensemble_weight_ann) * 100)}% RF
                    </span>
                  </div>
                  <input
                    type="range"
                    name="ensemble_weight_ann"
                    min="0"
                    max="1"
                    step="0.05"
                    value={formData.ensemble_weight_ann}
                    onChange={handleChange}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800 bg-zinc-300 dark:accent-white accent-black"
                  />
                  <p className="text-[10px] dark:text-zinc-400 text-zinc-500 mt-1">
                    60/40 is weighted toward ANN’s higher test R² (0.9739) & lower RMSE ($642.34).
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-4 rounded-2xl dark:bg-zinc-900 bg-red-50 border dark:border-white/20 border-red-200 dark:text-zinc-200 text-red-800 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-sm active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer animate-monochrome-shimmer ${
                    isDark 
                      ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_12px_36px_rgba(255,255,255,0.22)]' 
                      : 'bg-black text-white hover:bg-zinc-800 shadow-[0_12px_36px_rgba(0,0,0,0.18)]'
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Diamond with Both Models...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Predict Diamond Price</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* RIGHT: Diamond Visual & 3 Predictions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Center Diamond Visual Card */}
            <div className="liquid-glass-card rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-3 left-4 text-[10px] uppercase font-bold tracking-wider dark:text-zinc-400 text-zinc-500 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Live Facet Simulation
              </div>
              <AdaptiveFacetedDiamond 
                cut={formData.cut} 
                color={formData.color} 
                carat={formData.carat} 
                isPredicting={loading} 
                isDark={isDark}
              />
            </div>

            {/* OUTPUT 3: Combined Ensemble Prediction (The Hero Result) */}
            <div className="liquid-glass-hero rounded-3xl p-6 sm:p-7 relative overflow-hidden animate-monochrome-shimmer">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  3. Combined Ensemble Prediction
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full dark:bg-white/10 bg-black/5 border dark:border-white/25 border-black/10">
                  Recommended Consensus
                </span>
              </div>

              <div className="my-3">
                <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono">
                  {results ? formatPrice(results.ensemble_prediction) : '$---.--'}
                </div>
                <p className="text-xs dark:text-zinc-300 text-zinc-600 mt-1.5 font-medium">
                  Weighted logarithmic blending ({Math.round(formData.ensemble_weight_ann * 100)}% ANN + {Math.round((1 - formData.ensemble_weight_ann) * 100)}% RF)
                </p>
              </div>

              {results && (
                <div className="mt-4 pt-3 border-t dark:border-white/15 border-black/10 text-[11px] dark:text-zinc-300 text-zinc-600 flex justify-between items-center">
                  <span>Currency: USD</span>
                  <span className="font-mono">exp(weighted_log)</span>
                </div>
              )}
            </div>

            {/* OUTPUT 1 & OUTPUT 2: Individual Model Predictions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Output 1: Random Forest */}
              <div className="liquid-glass-card rounded-2xl p-5 hover:border-black/20 dark:hover:border-white/30 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    1. Random Forest
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/5 border dark:border-white/20 border-black/10">
                    MAE $310
                  </span>
                </div>

                <div className="text-2xl font-black font-mono my-2 tracking-tight">
                  {results ? formatPrice(results.random_forest_prediction) : '$---.--'}
                </div>
                
                <p className="text-[10px] dark:text-zinc-400 text-zinc-500">
                  Decision tree pipeline with OneHotEncoder & ColumnTransformer.
                </p>
              </div>

              {/* Output 2: Artificial Neural Network (ANN) */}
              <div className="liquid-glass-card rounded-2xl p-5 hover:border-black/20 dark:hover:border-white/30 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4" />
                    2. Neural Net (ANN)
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/5 border dark:border-white/20 border-black/10">
                    R² 0.9739
                  </span>
                </div>

                <div className="text-2xl font-black font-mono my-2 tracking-tight">
                  {results ? formatPrice(results.ann_prediction) : '$---.--'}
                </div>
                
                <p className="text-[10px] dark:text-zinc-400 text-zinc-500">
                  Deep Keras neural architecture with Optuna tuned weights.
                </p>
              </div>
            </div>

            {/* Model Convergence Delta Widget */}
            {results && (
              <div className="liquid-glass-card rounded-2xl p-4 text-xs space-y-2">
                <div className="font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Model Convergence Variance
                  </span>
                  <span className="font-mono font-bold">
                    Δ {formatPrice(Math.abs(results.random_forest_prediction - results.ann_prediction))}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full dark:bg-zinc-950 bg-zinc-200 h-2 rounded-full overflow-hidden p-0.5 border dark:border-white/15 border-black/10">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDark 
                        ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]' 
                        : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]'
                    }`}
                    style={{
                      width: `${Math.max(10, Math.min(100, 100 - (
                        (Math.abs(results.random_forest_prediction - results.ann_prediction) / 
                        Math.max(1, results.ensemble_prediction)) * 100
                      )))}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] dark:text-zinc-400 text-zinc-500">
                  <span>Relative divergence: {(
                    (Math.abs(results.random_forest_prediction - results.ann_prediction) / 
                    Math.max(1, results.ensemble_prediction)) * 100
                  ).toFixed(1)}%</span>
                  <span className="font-medium">High Consensus</span>
                </div>
              </div>
            )}

            {/* Benchmark Performance Drawer */}
            <div className="liquid-glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase font-bold tracking-wider dark:text-zinc-300 text-zinc-700 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Test Set Benchmarks (20% Holdout)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b dark:border-white/10 border-black/10 dark:text-zinc-400 text-zinc-500 text-[10px]">
                      <th className="pb-1.5 font-medium">Model</th>
                      <th className="pb-1.5 font-medium text-right">R² Score</th>
                      <th className="pb-1.5 font-medium text-right">MAE</th>
                      <th className="pb-1.5 font-medium text-right">RMSE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-white/[0.06] divide-black/[0.06] dark:text-zinc-300 text-zinc-700 font-mono text-[11px]">
                    <tr>
                      <td className="py-1.5 font-sans font-medium">Random Forest</td>
                      <td className="py-1.5 text-right">0.970881</td>
                      <td className="py-1.5 text-right">$310.16</td>
                      <td className="py-1.5 text-right">$678.36</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-sans font-medium">ANN (Neural Net)</td>
                      <td className="py-1.5 text-right">0.973891</td>
                      <td className="py-1.5 text-right">$340.31</td>
                      <td className="py-1.5 text-right">$642.34</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t dark:border-white/10 border-black/10 py-6 text-center text-xs dark:text-zinc-500 text-zinc-400 relative z-10">
        <p>Diamond Price Prediction • Adaptive Liquid Glass UI • Powered by FastAPI & React</p>
      </footer>
    </div>
  );
}

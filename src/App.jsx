import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Trophy, Sparkles, Map, BookOpen, HelpCircle, Compass, Check, X, RotateCcw, Award, ChevronRight } from 'lucide-react';
import { ITALY_REGIONS_PATHS } from './italyPaths';

// Detailed data for each region's highest peak
const PEAKS_DATA = {
  "abruzzo": {
    name: "Abruzzo",
    peak: "Corno Grande (Vetta Occidentale)",
    massif: "Gran Sasso d'Italia",
    height: 2912,
    notes: "La vetta occidentale del Corno Grande è la cima più alta degli Appennini e dell'intera penisola italiana."
  },
  "basilicata": {
    name: "Basilicata",
    peak: "Monte Pollino",
    massif: "Massiccio del Pollino",
    height: 2248,
    notes: "Sebbene la Serra Dolcedorme sia più alta (2267m), la sua vetta si trova in Calabria. Il Monte Pollino è la cima più alta situata interamente in territorio lucano."
  },
  "calabria": {
    name: "Calabria",
    peak: "Serra Dolcedorme",
    massif: "Massiccio del Pollino",
    height: 2267,
    notes: "La cima più elevata dell'Appennino meridionale, situata sul confine calabro-lucano, con la vetta posta sul versante calabrese."
  },
  "campania": {
    name: "Campania",
    peak: "La Gallinola",
    massif: "Matese",
    height: 1923,
    notes: "È la seconda cima del massiccio del Matese, ma costituisce il punto più alto e la vetta principale della regione Campania."
  },
  "emilia": {
    name: "Emilia-Romagna",
    peak: "Monte Cimone",
    massif: "Appennino Tosco-Emiliano",
    height: 2165,
    notes: "Il monte più alto dell'Appennino settentrionale. Ospita una stazione meteorologica dell'Aeronautica Militare e un radiofaro CNR."
  },
  "friuli": {
    name: "Friuli-Venezia Giulia",
    peak: "Monte Coglians",
    massif: "Alpi Carniche",
    height: 2780,
    notes: "La vetta più alta delle Alpi Carniche e dell'intero Friuli, situata sul confine di stato tra l'Italia e l'Austria."
  },
  "lazio": {
    name: "Lazio",
    peak: "Monte Gorzano",
    massif: "Monti della Laga",
    height: 2458,
    notes: "La montagna più alta del Lazio, situata sul confine con l'Abruzzo all'interno del Parco Nazionale del Gran Sasso e Monti della Laga."
  },
  "liguria": {
    name: "Liguria",
    peak: "Monte Saccarello",
    massif: "Alpi del Marguareis",
    height: 2201,
    notes: "Posto sul confine italo-francese. Sulla sua anticima sorge un imponente monumento in bronzo dedicato al Redentore."
  },
  "lombardia": {
    name: "Lombardia",
    peak: "Punta Perrucchetti (La Spedla)",
    massif: "Massiccio del Bernina",
    height: 4020,
    notes: "Nota come la cima italiana del Bernina. La vetta principale del Bernina (4049m) è in Svizzera, rendendo la Perrucchetti la cima più alta della Lombardia."
  },
  "marche": {
    name: "Marche",
    peak: "Monte Vettore",
    massif: "Monti Sibillini",
    height: 2476,
    notes: "La vetta principale della regione e dei Sibillini. Custodisce nella sua conca glaciale il leggendario Lago di Pilato."
  },
  "molise": {
    name: "Molise",
    peak: "Monte a Mare",
    massif: "Monti della Meta",
    height: 2160,
    notes: "Il monte più alto il cui culmine ricade interamente nel territorio molisano. Fa parte del gruppo delle Mainarde."
  },
  "piemonte": {
    name: "Piemonte",
    peak: "Grenzgipfel",
    massif: "Massiccio del Monte Rosa",
    height: 4618,
    notes: "Il punto più alto del Piemonte e la vetta di confine più elevata d'Europa, situata lungo la cresta del massiccio del Monte Rosa."
  },
  "puglia": {
    name: "Puglia",
    peak: "Monte Cornacchia",
    massif: "Monti della Daunia",
    height: 1151,
    notes: "La vetta più alta della Puglia, situata nei monti della Daunia. Viene storicamente soprannominata 'il tetto della Puglia'."
  },
  "sardegna": {
    name: "Sardegna",
    peak: "Punta La Marmora",
    massif: "Gennargentu",
    height: 1834,
    notes: "La cima più alta dell'isola, situata nel massiccio del Gennargentu. Offre un panorama spettacolare su gran parte della Sardegna."
  },
  "sicilia": {
    name: "Sicilia",
    peak: "Etna",
    massif: "--- (Vulcano)",
    height: 3403,
    notes: "Il vulcano attivo più alto d'Europa e la montagna più elevata d'Italia a sud delle Alpi. L'altezza reale varia a causa delle frequenti eruzioni."
  },
  "toscana": {
    name: "Toscana",
    peak: "Monte Prado",
    massif: "Appennino Tosco-Emiliano",
    height: 2054,
    notes: "La montagna più alta della Toscana, situata sullo spartiacque appenninico principale sul confine con l'Emilia-Romagna."
  },
  "trentino": {
    name: "Trentino-Alto Adige",
    peak: "Ortles (Ortler)",
    massif: "Gruppo Ortles-Cevedale",
    height: 3905,
    notes: "La vetta più alta del gruppo Ortles-Cevedale, dell'Alto Adige e dell'intera regione storica del Tirolo."
  },
  "umbria": {
    name: "Umbria",
    peak: "Cima del Redentore",
    massif: "Monti Sibillini",
    height: 2448,
    notes: "La cima più alta dell'Umbria, affacciata sulla spettacolare piana di Castelluccio e situata nel massiccio dei Sibillini."
  },
  "aosta": {
    name: "Valle d'Aosta",
    peak: "Monte Bianco (Mont Blanc)",
    massif: "Massiccio del Monte Bianco",
    height: 4810,
    notes: "La montagna più alta d'Italia e d'Europa. La frontiera esatta sul culmine è oggetto di una storica disputa confinaria con la Francia."
  },
  "veneto": {
    name: "Veneto",
    peak: "Punta Penia",
    massif: "Marmolada",
    height: 3343,
    notes: "La cima regina delle Dolomiti, situata sul massiccio della Marmolada e ricoperta dal ghiacciaio omonimo."
  }
};

// Web Audio API Synthesizer for lightweight retro sounds
const playSynthSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      osc.frequency.setValueAtTime(783.99, now + 0.08); // G5
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'incorrect') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(196.00, now); // G3
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      
      osc.frequency.setValueAtTime(146.83, now + 0.08); // D3
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'victory') {
      osc.type = 'sine';
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
      
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5
      notes.forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      });
      
      gain.gain.setValueAtTime(0.1, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      osc.start(now);
      osc.stop(now + 1.3);
    }
  } catch (e) {
    console.warn("AudioContext blocked or unsupported:", e);
  }
};

export default function App() {
  const [mode, setMode] = useState('study'); // 'study' or 'quiz'
  const [selectedRegionId, setSelectedRegionId] = useState(null);

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredState, setAnsweredState] = useState(null); // 'correct', 'incorrect', or null
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  // Badge list based on score
  const getBadge = (finalScore) => {
    if (finalScore === 20) return { title: "Alpinista Leggendario", emoji: "👑", desc: "Hai conquistato tutte le vette d'Italia senza errori!" };
    if (finalScore >= 16) return { title: "Scalatore Esperto", emoji: "🧗", desc: "Hai una conoscenza eccellente delle vette italiane." };
    if (finalScore >= 11) return { title: "Escursionista Esperto", emoji: "🥾", desc: "Un'ottima base, pronto per esplorare sentieri d'alta quota." };
    if (finalScore >= 5) return { title: "Esploratore dei Boschi", emoji: "🌲", desc: "Conosci le vette principali, ma la strada per la cima è lunga." };
    return { title: "Camminatore di Vallata", emoji: "🚶", desc: "Ideale per passeggiate in collina, continua a studiare!" };
  };

  const startNewQuiz = () => {
    const keys = Object.keys(PEAKS_DATA);
    const shuffled = [...keys].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setAnsweredState(null);
    setSelectedAnswerId(null);
    setQuizStarted(true);
    playSynthSound('correct');
  };

  const handleRegionClick = (id) => {
    if (mode === 'study') {
      setSelectedRegionId(id);
    } else if (mode === 'quiz' && quizStarted && !quizFinished && answeredState === null) {
      if (selectedAnswerId !== id) {
        setSelectedAnswerId(id);
      } else {
        const correctAnswerId = questions[currentQuestionIndex];
        const isCorrect = id === correctAnswerId;

        if (isCorrect) {
          setScore(prev => prev + 1);
          setAnsweredState('correct');
          playSynthSound('correct');
        } else {
          setAnsweredState('incorrect');
          playSynthSound('incorrect');
        }
      }
    }
  };

  const nextQuestion = () => {
    setAnsweredState(null);
    setSelectedAnswerId(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      playSynthSound('victory');
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setMode('study');
    setSelectedRegionId(null);
  };

  const currentQuizRegionKey = quizStarted ? questions[currentQuestionIndex] : null;
  const currentQuizRegion = currentQuizRegionKey ? PEAKS_DATA[currentQuizRegionKey] : null;
  const selectedRegion = selectedRegionId ? PEAKS_DATA[selectedRegionId] : null;

  // Custom styling paths based on selection/game state
  const getPathClass = (regionId) => {
    const baseClass = "transition-all duration-300 stroke-[1px] stroke-stone-300 cursor-pointer outline-none ";

    if (mode === 'study') {
      if (selectedRegionId === regionId) {
        return baseClass + "fill-amber-200/80 stroke-amber-700 stroke-[1.5px]";
      }
      return baseClass + "fill-stone-100 hover:fill-amber-100/60";
    }

    if (mode === 'quiz') {
      if (!quizStarted || quizFinished) {
        return baseClass + "fill-stone-50";
      }

      const correctAnswerId = questions[currentQuestionIndex];

      if (answeredState !== null) {
        if (regionId === correctAnswerId) {
          return baseClass + "fill-emerald-100/90 stroke-emerald-600 stroke-[1.5px]";
        }
        if (selectedAnswerId === regionId && answeredState === 'incorrect') {
          return baseClass + "fill-rose-100/90 stroke-rose-600 stroke-[1.5px]";
        }
      }

      if (selectedAnswerId === regionId) {
        return baseClass + "fill-amber-200/80 stroke-amber-600 stroke-[1.5px]";
      }

      return baseClass + "fill-stone-100 hover:fill-amber-100/40";
    }

    return baseClass + "fill-stone-100";
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900 pb-4 text-stone-800">
      
      {/* Top Header */}
      <header className="glass-panel border-b border-stone-200 py-4 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 animate-float shadow-sm">
              <Mountain size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-stone-900 flex items-center gap-2">
                Vette d'Italia <span className="text-amber-800 font-semibold text-xs bg-amber-100/80 border border-amber-200 px-2 py-0.5 rounded-full">Summit Challenge</span>
              </h1>
              <p className="text-[10px] md:text-xs font-mono text-amber-800/80 tracking-widest uppercase">Esploratore delle Cime Regionali</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-1 bg-stone-100 border border-stone-200 p-1 rounded-lg">
            <button 
              onClick={() => { if (!quizStarted) { setMode('study'); setSelectedRegionId(null); } }}
              disabled={quizStarted}
              className={`px-4 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer
                ${mode === 'study' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-800 disabled:opacity-50'}`}
            >
              STUDY MAP
            </button>
            <button 
              onClick={() => { if (!quizStarted) { setMode('quiz'); } }}
              disabled={quizStarted}
              className={`px-4 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer
                ${mode === 'quiz' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-800 disabled:opacity-50'}`}
            >
              QUIZ TRAINING
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 py-6 flex-1 flex flex-col md:flex-row gap-6 items-stretch min-h-0">
        
        {/* Map Side */}
        <section className="flex-1 glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative min-h-[380px] md:min-h-0">
          <div className="w-full max-w-[380px] aspect-[560/663] relative">
            <svg 
              viewBox="0 0 560.512 663.114" 
              className="w-full h-full drop-shadow-[0_10px_25px_rgba(45,39,34,0.12)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="regions-map">
                {ITALY_REGIONS_PATHS.map((region) => (
                  <path
                    key={region.id}
                    d={region.d}
                    className={getPathClass(region.id)}
                    onClick={() => handleRegionClick(region.id)}
                    title={region.name}
                  />
                ))}
              </g>
            </svg>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur border border-stone-200 px-3 py-1.5 rounded-lg text-[10px] font-mono text-stone-600 flex items-center gap-1.5 shadow-sm">
            <Map size={11} /> 20 REGIONI D'ITALIA
          </div>
        </section>

        {/* Panel Side */}
        <section className="w-full md:w-[380px] flex flex-col">
          
          {/* Mobile view switcher for mode (shows only on mobile when not in active quiz) */}
          {!quizStarted && (
            <div className="flex md:hidden bg-stone-100 border border-stone-200 p-1 rounded-xl mb-4 gap-1">
              <button 
                onClick={() => setMode('study')}
                className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer
                  ${mode === 'study' ? 'bg-amber-700 text-white font-extrabold shadow-sm' : 'text-stone-500'}`}
              >
                STUDIA MAPPA
              </button>
              <button 
                onClick={() => setMode('quiz')}
                className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer
                  ${mode === 'quiz' ? 'bg-amber-700 text-white font-extrabold shadow-sm' : 'text-stone-500'}`}
              >
                SFIDA QUIZ
              </button>
            </div>
          )}

          {/* STUDY MODE PANEL */}
          {mode === 'study' && (
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between flex-1">
              <AnimatePresence mode="wait">
                {selectedRegion ? (
                  <motion.div
                    key={selectedRegionId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6 flex-1"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-amber-800 font-extrabold tracking-wider uppercase">Regione</span>
                      <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 mt-0.5">{selectedRegion.name}</h2>
                    </div>

                    <div className="space-y-4">
                      {/* Peak card */}
                      <div className="bg-amber-50/50 border border-amber-900/5 rounded-xl p-4 space-y-1">
                        <span className="text-[9px] font-mono text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                          <Mountain size={11} /> Cima Più Alta
                        </span>
                        <div className="text-xl font-extrabold text-amber-950">{selectedRegion.peak}</div>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3.5 space-y-0.5">
                          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">Massiccio</span>
                          <div className="text-xs font-bold text-stone-800 truncate">{selectedRegion.massif}</div>
                        </div>
                        <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3.5 space-y-0.5">
                          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">Altezza</span>
                          <div className="text-base font-extrabold font-mono text-amber-800">{selectedRegion.height.toLocaleString()} m</div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-stone-50/40 border border-stone-200/40 rounded-xl p-4 text-xs font-sans text-stone-600 leading-relaxed">
                        {selectedRegion.notes}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-16">
                    <div className="p-4 bg-amber-50 rounded-full border border-amber-200/50 text-amber-700/60 animate-pulse shadow-sm">
                      <Compass size={40} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-850">Esplora la Mappa</h3>
                      <p className="text-xs text-stone-500 mt-2 max-w-[220px] mx-auto leading-relaxed">
                        Tocca una regione sulla mappa d'Italia per scoprire la sua vetta più alta, la quota e le note geografiche.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              {selectedRegion && (
                <button
                  onClick={() => setSelectedRegionId(null)}
                  className="w-full mt-6 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-mono text-stone-500 hover:text-stone-850 hover:border-stone-300 transition-all cursor-pointer"
                >
                  Rilascia Selezione
                </button>
              )}
            </div>
          )}

          {/* QUIZ MODE PANEL */}
          {mode === 'quiz' && (
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between flex-1">
              
              {/* Ready to start quiz screen */}
              {!quizStarted && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-8">
                  <div className="p-4 bg-amber-50 rounded-full border border-amber-200 text-amber-700 shadow-sm">
                    <Trophy size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-stone-900">Pronto per la Sfida?</h3>
                    <p className="text-xs text-stone-500 mt-2 max-w-[240px] mx-auto leading-relaxed font-sans">
                      Ti verranno chieste le posizioni di tutte le 20 vette regionali più alte d'Italia. Cerca di totalizzare il punteggio massimo!
                    </p>
                  </div>

                  <button
                    onClick={startNewQuiz}
                    className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-amber-800 transition-all shadow-[0_4px_15px_rgba(180,83,9,0.15)] cursor-pointer"
                  >
                    Inizia Quiz
                  </button>
                </div>
              )}

              {/* Quiz in progress */}
              {quizStarted && !quizFinished && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Status bar */}
                    <div className="flex justify-between items-center font-mono text-[10px] text-stone-500 border-b border-stone-200 pb-3">
                      <span>DOMANDA {currentQuestionIndex + 1} / {questions.length}</span>
                      <span className="text-amber-800 font-bold">PUNTEGGIO: {score}</span>
                    </div>

                    {/* Question Card */}
                    <div className="space-y-4">
                      <div className="bg-amber-50 border-l-4 border-amber-700 p-4 rounded-r-xl space-y-2 shadow-sm">
                        <div className="text-[9px] font-mono text-amber-800 font-extrabold tracking-widest uppercase">Trova la regione di:</div>
                        <div className="text-xl font-extrabold text-stone-900">
                          {currentQuizRegion?.peak}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-stone-500 pt-1">
                          <span>Gruppo: <strong className="text-stone-700">{currentQuizRegion?.massif}</strong></span>
                          <span>Altezza: <strong className="text-amber-800">{currentQuizRegion?.height} m</strong></span>
                        </div>
                      </div>

                      {/* Map Prompt */}
                      {answeredState === null ? (
                        selectedAnswerId === null ? (
                          <div className="bg-stone-50 border border-dashed border-stone-300 p-6 rounded-xl text-center">
                            <p className="text-xs font-sans text-stone-500 animate-pulse">
                              Tocca sulla mappa la regione corretta!
                            </p>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-center space-y-2 shadow-sm">
                            <p className="text-xs font-sans text-stone-700">
                              Hai selezionato: <strong className="text-stone-900 font-extrabold">{PEAKS_DATA[selectedAnswerId]?.name}</strong>
                            </p>
                            <p className="text-[11px] font-medium text-amber-800 animate-pulse">
                              Tocca di nuovo la regione selezionata per confermare la risposta.
                            </p>
                          </div>
                        )
                      ) : (
                        <motion.div
                          initial={{ scale: 0.96, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`p-4 rounded-xl border flex items-start gap-3 ${
                            answeredState === 'correct' 
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-800' 
                              : 'border-rose-200 bg-rose-50 text-rose-800'
                          }`}
                        >
                          <div className="mt-0.5">
                            {answeredState === 'correct' ? <Check size={16} /> : <X size={16} />}
                          </div>
                          <div className="text-xs space-y-1 font-sans">
                            <div className="font-extrabold">
                              {answeredState === 'correct' ? 'Risposta Esatta!' : 'Risposta Errata!'}
                            </div>
                            <p className="text-stone-600 leading-relaxed text-[11px]">
                              {answeredState === 'correct' 
                                ? `Ottimo lavoro! Il ${currentQuizRegion?.peak} è proprio in ${currentQuizRegion?.name}.`
                                : `Hai selezionato ${PEAKS_DATA[selectedAnswerId]?.name || 'un\'altra regione'}. La cima si trova in ${currentQuizRegion?.name}.`
                              }
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {answeredState !== null && (
                    <button
                      onClick={nextQuestion}
                      className="w-full mt-6 bg-stone-800 text-white py-3 rounded-xl font-bold text-xs hover:bg-amber-700 transition-all cursor-pointer"
                    >
                      {currentQuestionIndex + 1 < questions.length ? 'Prossima Domanda' : 'Vedi Risultati'}
                    </button>
                  )}
                </div>
              )}

              {/* End of Quiz Screen */}
              {quizFinished && (
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-6 text-center">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-full inline-block text-amber-700 animate-bounce shadow-sm">
                      <Award size={48} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-stone-900">Quiz Completato!</h3>
                      <p className="text-xs font-mono text-amber-800/80 mt-1 uppercase tracking-wider">Analisi dei Risultati</p>
                    </div>

                    {/* Result table */}
                    <div className="grid grid-cols-2 gap-3 bg-stone-50 border border-stone-200 rounded-xl p-4">
                      <div>
                        <div className="text-[9px] font-mono text-stone-500">PUNTEGGIO</div>
                        <div className="text-xl font-bold text-stone-900">{score} / {questions.length}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-stone-500">PRECISIONE</div>
                        <div className={`text-xl font-bold ${score >= 16 ? 'text-emerald-700' : score >= 10 ? 'text-amber-700' : 'text-rose-700'}`}>
                          {Math.round((score / questions.length) * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* Unlock card */}
                    <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-1 text-center font-sans">
                      <div className="text-[10px] font-mono text-amber-800 uppercase tracking-widest font-black">Grado Raggiunto</div>
                      <div className="text-lg font-bold text-stone-900 mt-1">
                        {getBadge(score).emoji} {getBadge(score).title}
                      </div>
                      <p className="text-xs text-stone-500 pt-1 leading-relaxed">
                        {getBadge(score).desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="w-full mt-8 bg-amber-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-amber-800 transition-all shadow-[0_4px_15px_rgba(180,83,9,0.15)] cursor-pointer"
                  >
                    Torna alla Mappa
                  </button>
                </div>
              )}

            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 pt-4 border-t border-stone-200 text-center text-[10px] font-mono text-stone-400">
        SUMMIT QUEST &copy; {new Date().getFullYear()} &bull; MAPPA VETTORIALE INTERATTIVA DELLE MONTAGNE ITALIANE
      </footer>

    </div>
  );
}

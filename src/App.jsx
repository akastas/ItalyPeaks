import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Trophy, Sparkles, Map, BookOpen, HelpCircle, Compass, Check, X, RotateCcw, Award, ChevronRight, Waves, ChevronUp, ChevronDown } from 'lucide-react';
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

const RIVERS_DATA = [
  { name: "Po", length: 652, source: "Pian del Re (Monviso)", mouth: "Mar Adriatico (Delta)", desc: "Il fiume più lungo d'Italia, attraversa tutta la Pianura Padana prima di sfociare in un imponente delta nel Mar Adriatico." },
  { name: "Adige", length: 410, source: "Passo Resia (Alpi Retiche)", mouth: "Mar Adriatico", desc: "Il secondo fiume italiano per lunghezza. Nasce vicino al confine con l'Austria e attraversa l'Alto Adige, il Trentino e il Veneto." },
  { name: "Tevere", length: 405, source: "Monte Fumaiolo (Appennino)", mouth: "Mar Tirreno (Ostia)", desc: "Terzo fiume per lunghezza. Storico corso d'acqua di Roma, attraversa l'Appennino scorrendo attraverso Umbria e Lazio." },
  { name: "Adda", length: 313, source: "Alpi Retiche (Bormio)", mouth: "Fiume Po (tributario)", desc: "Il più lungo affluente del Po, attraversa la Valtellina ed entra nel Lago di Como prima di confluire nel Po nel cremonese." },
  { name: "Oglio", length: 280, source: "Corno dei Tre Signori (Alpi)", mouth: "Fiume Po (tributario)", desc: "Importante affluente di sinistra del Po, scorre attraverso la Val Camonica, forma il Lago d'Iseo e attraversa la pianura lombarda." }
];

const LAKES_DATA = [
  { name: "Lago di Garda (Benaco)", area: 370, depth: 346, regions: "Lombardia, Veneto, Trentino-A.A.", desc: "Il più grande lago d'Italia. Cerniera tra tre regioni, è un lago glaciale noto per il suo clima mite e i paesaggi mediterranei." },
  { name: "Lago Maggiore (Verbano)", area: 212, depth: 372, regions: "Piemonte, Lombardia (e Svizzera)", desc: "Secondo lago italiano per superficie, le sue sponde ospitano splendide isole barocche (Isole Borromee) e giardini botanici." },
  { name: "Lago di Como (Lario)", area: 146, depth: 410, regions: "Lombardia", desc: "Famoso per la sua caratteristica forma a 'Y' rovesciata. È il lago più profondo d'Italia (410m) e uno dei più profondi d'Europa." },
  { name: "Lago Trasimeno", area: 128, depth: 6, regions: "Umbria", desc: "Il lago più grande dell'Italia peninsulare. Molto esteso ma estremamente poco profondo (massimo 6 metri), situato tra colline toscane e umbre." },
  { name: "Lago di Bolsena", area: 113.5, depth: 151, regions: "Lazio", desc: "Il lago vulcanico più grande d'Europa. Si è formato nella caldera spenta dei monti Volsini ed è famoso per la limpidezza delle sue acque." }
];

const COASTS_REGIONS_DATA = [
  { id: "sardegna", name: "Sardegna", length: 1897, desc: "La regione con lo sviluppo costiero più esteso d'Italia. Spazia da baie sabbiose cristalline (Costa Smeralda) a falesie a picco sul mare." },
  { id: "sicilia", name: "Sicilia", length: 1652, desc: "Estesa costa mediterranea che offre spiagge dorate immense, golfi profondi e spettacolari scogliere vulcaniche nere e calcaree (Scala dei Turchi)." },
  { id: "puglia", name: "Puglia", length: 870, desc: "Sviluppo costiero diviso tra l'Adriatico e lo Ionio. Celebre per le scogliere bianche del promontorio del Gargano e le calette del Salento." },
  { id: "calabria", name: "Calabria", length: 780, desc: "Bagnata dal Tirreno e dallo Ionio, alternando promontori rocciosi scoscesi (Tropea) e ampi litorali di sabbia e ciottoli." },
  { id: "toscana", name: "Toscana", length: 633, desc: "Comprende coste sabbiose a nord (Versilia), promontori rocciosi (Argentario) e le isole selvagge dell'Arcipelago Toscano (Elba, Giglio)." },
  { id: "campania", name: "Campania", length: 500, desc: "Famosa nel mondo per i golfi di Napoli e Salerno e per le falesie scoscese ricoperte da borghi storici della Costiera Amalfitana." },
  { id: "lazio", name: "Lazio", length: 361, desc: "Prevalentemente pianeggiante e sabbiosa, con scogliere calcaree a picco sul mare nel Circeo e a Gaeta, oltre all'Arcipelago Pontino." },
  { id: "liguria", name: "Liguria", length: 350, desc: "Una costa stretta e frastagliata incastonata tra montagne e mare, caratterizzata da alte pareti rocciose, golfi dipinti e piccoli borghi marinari." },
  { id: "marche", name: "Marche", length: 185, desc: "Sabbiosa per la maggior parte del litorale adriatico, interrotta unicamente dallo spettacolare promontorio calcareo del Monte Conero." },
  { id: "abruzzo", name: "Abruzzo", length: 170, desc: "Spiagge ampie a nord, che diventano suggestive insenature ghiaiose a sud, impreziosite dai trabocchi (macchine da pesca in legno)." },
  { id: "veneto", name: "Veneto", length: 158, desc: "Una costa sabbiosa bassa e laguna salmastra dominata dalla Laguna di Venezia e dalle foci dei grandi fiumi del Nord Italia." },
  { id: "emilia", name: "Emilia-Romagna", length: 141, desc: "Linearità sabbiosa totale: è la culla del turismo balneare europeo (Riviera Romagnola) con bassi fondali perfetti per le famiglie." },
  { id: "friuli", name: "Friuli-Venezia Giulia", length: 111, desc: "Lagune sabbiose ad ovest (Grado e Lignano) che mutano in coste alte e calcaree procedendo verso est e la baia di Trieste." },
  { id: "basilicata", name: "Basilicata", length: 70, desc: "Divisa in due: coste basse e sabbiose sullo Ionio (Metaponto) e splendide calette rocciose e grotte sul Tirreno (Maratea)." },
  { id: "molise", name: "Molise", length: 36, desc: "Il litorale più breve d'Italia, prevalentemente sabbioso e lineare, dominato dalla fortificazione marinara di Termoli." }
];

const COASTS_FAMOUS_DATA = [
  { name: "Costiera Amalfitana", region: "Campania", regionId: "campania", length: "55 km", type: "Alta e rocciosa", desc: "Patrimonio UNESCO, celebre per i suoi borghi storici aggrappati alla roccia (Positano, Amalfi) e terrazzamenti coltivati a limoni." },
  { name: "Cinque Terre", region: "Liguria", regionId: "liguria", length: "15 km", type: "Alta e frastagliata", desc: "Cinque borghi storici incastonati in strette insenature rocciose, circondati da muretti a secco e vigneti a strapiombo sul Mar Ligure." },
  { name: "Costa Smeralda", region: "Sardegna", regionId: "sardegna", length: "55 km", type: "Rocciosa e frastagliata", desc: "Tratto litoraneo della Gallura rinomato per le rocce granitiche rosa modellate dal vento, spiagge bianchissime e acque trasparenti." },
  { name: "Costa dei Trabocchi", region: "Abruzzo", regionId: "abruzzo", length: "60 km", type: "Mista (sabbia e scogliere)", desc: "Punteggiata da palafitte in legno stese sul mare per la pesca tradizionale, sospese sull'acqua e collegate alla terraferma da pontili." },
  { name: "Riviera Romagnola", region: "Emilia-Romagna", regionId: "emilia", length: "90 km", type: "Bassa e sabbiosa", desc: "Iconico litorale sabbioso caratterizzato da stabilimenti balneari attrezzati, ampi arenili, fondali bassi e una forte vocazione all'accoglienza." },
  { name: "Costa degli Dei", region: "Calabria", regionId: "calabria", length: "55 km", type: "Rocciosa con baie", desc: "Chiamata anche Costa Bella per le splendide insenature di sabbia bianca ai piedi di alte rupi tufacee, culminanti nello sperone di Tropea." },
  { name: "Versilia", region: "Toscana", regionId: "toscana", length: "20 km", type: "Bassa e sabbiosa", desc: "Famosa riviera a ridosso delle Alpi Apuane, celebre fin dal primo Novecento per i suoi caffè all'aperto, stabilimenti storici e vita mondana." },
  { name: "Riviera del Conero", region: "Marche", regionId: "marche", length: "20 km", type: "Alta e rocciosa", desc: "Rara oasi rocciosa del litorale adriatico dove le pendici del Monte Conero cadono nel mare creando insenature selvagge e ciottolose." }
];

const COASTS_TOP5_CENTROIDS = {
  sardegna: { name: "Sardegna", rank: 1, length: "1.897 km", x: 105, y: 370 },
  sicilia: { name: "Sicilia", rank: 2, length: "1.652 km", x: 290, y: 575 },
  puglia: { name: "Puglia", rank: 3, length: "870 km", x: 445, y: 355 },
  calabria: { name: "Calabria", rank: 4, length: "780 km", x: 390, y: 505 },
  toscana: { name: "Toscana", rank: 5, length: "633 km", x: 215, y: 255 }
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

  // Collapsible panel state
  const [isMinimized, setIsMinimized] = useState(false);

  // Top 5 Coast Overlay State
  const [showTop5Coasts, setShowTop5Coasts] = useState(false);

  // Auto-maximize and state reset on mode changes
  useEffect(() => {
    setIsMinimized(false);
    setShowTop5Coasts(mode === 'coasts');
    setSelectedRegionId(null);
  }, [mode]);

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredState, setAnsweredState] = useState(null); // 'correct', 'incorrect', or null
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const [showElevation, setShowElevation] = useState(true);

  // Zoom & Pan State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.4));
  };

  const zoomOut = () => {
    setZoom(prev => {
      const next = Math.max(1, prev - 0.4);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom === 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setDragStart({ 
      x: e.touches[0].clientX - pan.x, 
      y: e.touches[0].clientY - pan.y 
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || zoom === 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Confetti Canvas animation for perfect 20/20 win
  useEffect(() => {
    if (quizFinished && score === 20) {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let particles = [];
      const colors = ['#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#10b981', '#059669', '#3b82f6'];

      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 4 + 2.5,
          d: Math.random() * canvas.height,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 5,
          tiltAngleIncremental: Math.random() * 0.05 + 0.02,
          tiltAngle: 0
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += (Math.cos(p.tiltAngle) + 3 + p.r / 2) / 1.8;
          p.x += Math.sin(p.tiltAngle);
          p.tilt = Math.sin(p.tiltAngle - index / 3) * 12;

          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();

          // Reset particle if it falls off screen
          if (p.y > canvas.height) {
            particles[index] = {
              x: Math.random() * canvas.width,
              y: -10,
              r: p.r,
              d: p.d,
              color: p.color,
              tilt: p.tilt,
              tiltAngleIncremental: p.tiltAngleIncremental,
              tiltAngle: 0
            };
          }
        });

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [quizFinished, score]);

  // Badge list based on score
  const getBadge = (finalScore) => {
    if (finalScore === 20) {
      return { 
        title: "Alpinista Leggendario", 
        emoji: "👑", 
        desc: "Ecco qui, sei pronta Юля! 👑 Hai conquistato tutte le vette d'Italia senza errori. Ora sei prontissima per l'esame!" 
      };
    }
    if (finalScore >= 15) {
      return { 
        title: "Scalatore Esperto", 
        emoji: "🧗", 
        desc: "Ci sei quasi Юля! 🧗 Ti manca pochissimo al punteggio perfetto. Sei super preparata, continua così!" 
      };
    }
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
    setIsMinimized(false);
    playSynthSound('correct');
  };

  const getCoastRegionColor = (regionId) => {
    const coastReg = COASTS_REGIONS_DATA.find(r => r.id === regionId);
    if (!coastReg) return '#e5e7eb'; // landlocked
    const length = coastReg.length;
    const minL = 36;
    const maxL = 1897;
    const pct = Math.max(0, Math.min(1, (length - minL) / (maxL - minL)));
    const h = Math.round(195 + pct * 25);
    const s = Math.round(35 + pct * 35);
    const l = Math.round(85 - pct * 35);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const handleRegionClick = (id) => {
    setIsMinimized(false);
    if (mode === 'study') {
      setSelectedRegionId(id);
    } else if (mode === 'coasts') {
      const isCoastal = COASTS_REGIONS_DATA.some(r => r.id === id);
      if (isCoastal) {
        setSelectedRegionId(id);
      }
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
    setIsMinimized(false);
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
    setIsMinimized(false);
  };

  const currentQuizRegionKey = quizStarted ? questions[currentQuestionIndex] : null;
  const currentQuizRegion = currentQuizRegionKey ? PEAKS_DATA[currentQuizRegionKey] : null;
  const selectedRegion = selectedRegionId ? PEAKS_DATA[selectedRegionId] : null;
  const selectedCoastRegion = selectedRegionId ? COASTS_REGIONS_DATA.find(r => r.id === selectedRegionId) : null;
  const famousInRegion = selectedRegionId ? COASTS_FAMOUS_DATA.filter(f => f.regionId === selectedRegionId) : [];

  // Custom styling paths based on selection/game state
  const getRegionBaseColor = (regionId) => {
    const data = PEAKS_DATA[regionId];
    if (!data) return 'hsl(38, 28%, 93%)';
    const height = data.height;
    const minHeight = 1151;
    const maxHeight = 4810;
    const pct = Math.max(0, Math.min(1, (height - minHeight) / (maxHeight - minHeight)));
    const h = Math.round(38 - pct * 16);
    const s = Math.round(28 + pct * 26);
    const l = Math.round(93 - pct * 37);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const getPathStyle = (regionId) => {
    if (mode === 'study') {
      if (selectedRegionId === regionId) {
        return { fill: '#fde68a' }; // amber-200
      }
    } else if (mode === 'coasts') {
      if (selectedRegionId === regionId) {
        return { fill: '#fde68a' }; // Selected coast region -> highlighted gold
      }
      if (showTop5Coasts) {
        const isTop5 = Object.keys(COASTS_TOP5_CENTROIDS).includes(regionId);
        return { fill: isTop5 ? getCoastRegionColor(regionId) : '#f4eee2' };
      }
      return { fill: getCoastRegionColor(regionId) };
    } else if (mode === 'quiz' && quizStarted && !quizFinished) {
      const correctAnswerId = questions[currentQuestionIndex];

      if (answeredState !== null) {
        if (regionId === correctAnswerId) {
          return { fill: '#a7f3d0' }; // emerald-200
        }
        if (selectedAnswerId === regionId && answeredState === 'incorrect') {
          return { fill: '#fecdd3' }; // rose-200
        }
      }

      if (selectedAnswerId === regionId) {
        return { fill: '#fde68a' }; // amber-200
      }
    }

    return { fill: showElevation ? getRegionBaseColor(regionId) : '#f4eee2' };
  };

  const getPathClass = (regionId) => {
    const baseClass = "region-path transition-all duration-300 stroke-[1px] stroke-stone-300 cursor-pointer outline-none ";

    if (mode === 'study') {
      if (selectedRegionId === regionId) {
        return baseClass + "stroke-amber-700 stroke-[1.5px]";
      }
      return baseClass;
    }

    if (mode === 'coasts') {
      const isCoastal = COASTS_REGIONS_DATA.some(r => r.id === regionId);
      const isTop5 = Object.keys(COASTS_TOP5_CENTROIDS).includes(regionId);
      
      let strokeClass = "stroke-stone-300 ";
      if (selectedRegionId === regionId) {
        strokeClass = "stroke-amber-600 stroke-[1.5px] ";
      } else if (showTop5Coasts && isTop5) {
        strokeClass = "stroke-sky-600 stroke-[1.5px] ";
      }

      if (!isCoastal) {
        return "region-path transition-all duration-300 stroke-[1px] stroke-stone-200 outline-none opacity-40 ";
      }
      return "region-path transition-all duration-300 cursor-pointer outline-none " + strokeClass;
    }

    if (mode === 'quiz') {
      if (!quizStarted || quizFinished) {
        return baseClass;
      }

      const correctAnswerId = questions[currentQuestionIndex];

      if (answeredState !== null) {
        if (regionId === correctAnswerId) {
          return baseClass + "stroke-emerald-600 stroke-[1.5px]";
        }
        if (selectedAnswerId === regionId && answeredState === 'incorrect') {
          return baseClass + "stroke-rose-600 stroke-[1.5px]";
        }
      }

      if (selectedAnswerId === regionId) {
        return baseClass + "stroke-amber-600 stroke-[1.5px]";
      }

      return baseClass;
    }

    return baseClass;
  };

  return (
    <div className="h-[100dvh] flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900 text-stone-850 relative overflow-hidden bg-[#fcfbf8]">
      {quizFinished && score === 20 && (
        <canvas id="confetti-canvas" className="pointer-events-none fixed inset-0 z-50 w-full h-full" />
      )}
      
      {/* Top Header */}
      <header className="glass-panel border-b border-stone-200 py-3 md:py-4 px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="p-1.5 md:p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 animate-float shadow-sm">
              <Mountain size={24} className="md:w-[28px] md:h-[28px]" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black tracking-tight text-stone-900 flex items-center gap-1.5 md:gap-2">
                Vette d'Italia <span className="text-amber-800 font-semibold text-[10px] md:text-xs bg-amber-100/80 border border-amber-200 px-2 py-0.5 rounded-full">Summit Challenge</span>
              </h1>
              <p className="text-[9px] md:text-xs font-mono text-amber-800/80 tracking-widest uppercase">Esploratore delle Cime Regionali</p>
            </div>
          </div>
          
          {/* Desktop Mode Switcher */}
          <div className="hidden md:flex gap-1 bg-stone-100 border border-stone-200 p-1 rounded-lg">
            <button 
              onClick={() => { if (!quizStarted) { setMode('study'); setSelectedRegionId(null); } }}
              disabled={quizStarted}
              className={`px-4 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer
                ${mode === 'study' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-850 disabled:opacity-50'}`}
            >
              STUDY MAP
            </button>
            <button 
              onClick={() => { if (!quizStarted) { setMode('quiz'); } }}
              disabled={quizStarted}
              className={`px-4 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer
                ${mode === 'quiz' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-850 disabled:opacity-50'}`}
            >
              QUIZ TRAINING
            </button>
            <button 
              onClick={() => { if (!quizStarted) { setMode('water'); setSelectedRegionId(null); } }}
              disabled={quizStarted}
              className={`px-4 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer
                ${mode === 'water' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-850 disabled:opacity-50'}`}
            >
              ACQUE D'ITALIA
            </button>
            <button 
              onClick={() => { if (!quizStarted) { setMode('coasts'); setSelectedRegionId(null); } }}
              disabled={quizStarted}
              className={`px-4 py-1.5 rounded text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer
                ${mode === 'coasts' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-500 hover:text-stone-850 disabled:opacity-50'}`}
            >
              COSTE D'ITALIA
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Mode Switcher (Directly below header on mobile) */}
      {!quizStarted && (
        <div className="flex md:hidden bg-stone-100/90 backdrop-blur border-b border-stone-200 p-1 gap-1 z-10 relative">
          <button 
            onClick={() => setMode('study')}
            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer
              ${mode === 'study' ? 'bg-amber-700 text-white font-extrabold shadow-sm' : 'text-stone-500'}`}
          >
            STUDIA
          </button>
          <button 
            onClick={() => setMode('quiz')}
            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer
              ${mode === 'quiz' ? 'bg-amber-700 text-white font-extrabold shadow-sm' : 'text-stone-500'}`}
          >
            QUIZ
          </button>
          <button 
            onClick={() => setMode('water')}
            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer
              ${mode === 'water' ? 'bg-amber-700 text-white font-extrabold shadow-sm' : 'text-stone-500'}`}
          >
            ACQUE
          </button>
          <button 
            onClick={() => setMode('coasts')}
            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer
              ${mode === 'coasts' ? 'bg-amber-700 text-white font-extrabold shadow-sm' : 'text-stone-500'}`}
          >
            COSTE
          </button>
        </div>
      )}

      {/* Main Body */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-6 py-4 md:py-6 flex-1 flex flex-col md:flex-row gap-4 md:gap-6 items-stretch min-h-0 relative overflow-hidden">
        
        {/* Map Side */}
        <section className="absolute inset-0 md:relative md:flex-1 md:glass-panel p-4 md:p-6 md:rounded-2xl flex flex-col items-center justify-center overflow-hidden z-0">
          
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10 pointer-events-auto">
            <button 
              onClick={zoomIn}
              title="Aumenta Zoom"
              className="w-8 h-8 bg-white/90 backdrop-blur border border-stone-200 hover:bg-amber-50 rounded-lg text-stone-700 shadow-sm transition-all cursor-pointer font-bold flex items-center justify-center text-sm"
            >
              +
            </button>
            <button 
              onClick={zoomOut}
              title="Riduci Zoom"
              className="w-8 h-8 bg-white/90 backdrop-blur border border-stone-200 hover:bg-amber-50 rounded-lg text-stone-700 shadow-sm transition-all cursor-pointer font-bold flex items-center justify-center text-sm"
            >
              -
            </button>
            <button 
              onClick={resetZoom}
              title="Ripristina Zoom"
              className="w-8 h-8 bg-white/90 backdrop-blur border border-stone-200 hover:bg-amber-50 rounded-lg text-stone-600 shadow-sm transition-all cursor-pointer flex items-center justify-center text-xs"
            >
              ↺
            </button>
          </div>

          {/* Mobile Top-Left Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 md:hidden pointer-events-auto">
            {mode === 'coasts' ? (
              <div className="bg-white/90 backdrop-blur border border-stone-200 p-2 rounded-lg shadow-sm flex flex-col gap-1 w-fit">
                <div className="text-[8px] font-mono text-stone-500 uppercase tracking-wider font-bold">Costa Reg.</div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-mono text-stone-400">36k</span>
                  <div 
                    className="h-1.5 w-14 rounded-full border border-stone-200/50"
                    style={{
                      background: 'linear-gradient(to right, hsl(195, 35%, 85%), hsl(220, 70%, 50%))'
                    }}
                  />
                  <span className="text-[8px] font-mono text-stone-400">1.9k</span>
                </div>
              </div>
            ) : (
              <>
                {/* Elevation Toggle */}
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur border border-stone-200 px-2.5 py-1.5 rounded-lg shadow-sm">
                  <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider font-extrabold">Colori</span>
                  <button 
                    onClick={() => setShowElevation(!showElevation)}
                    title="Mostra/Nascondi Altezze Vette"
                    className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer relative flex items-center
                      ${showElevation ? 'bg-amber-700' : 'bg-stone-300'}`}
                  >
                    <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform duration-200
                      ${showElevation ? 'translate-x-3' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {/* Elevation Legend */}
                {showElevation && (
                  <div className="bg-white/90 backdrop-blur border border-stone-200 p-2 rounded-lg shadow-sm flex flex-col gap-1 w-fit">
                    <div className="text-[8px] font-mono text-stone-500 uppercase tracking-wider font-bold">Quota Vette</div>
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] font-mono text-stone-400">1.1k</span>
                      <div 
                        className="h-1.5 w-14 rounded-full border border-stone-200/50"
                        style={{
                          background: 'linear-gradient(to right, hsl(38, 28%, 93%), hsl(30, 41%, 75%), hsl(22, 54%, 56%))'
                        }}
                      />
                      <span className="text-[8px] font-mono text-stone-400">4.8k</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-full max-w-[380px] aspect-[560/663] relative overflow-hidden flex items-center justify-center">
            <svg 
              viewBox="0 0 560.512 663.114" 
              className={`w-full h-full drop-shadow-[0_10px_25px_rgba(45,39,34,0.12)] select-none outline-none
                ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <g 
                id="regions-map"
                style={{ 
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, 
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                }}
              >
                {ITALY_REGIONS_PATHS.map((region) => (
                  <path
                    key={region.id}
                    d={region.d}
                    className={getPathClass(region.id)}
                    style={getPathStyle(region.id)}
                    onClick={() => handleRegionClick(region.id)}
                    title={region.name}
                  />
                ))}

                {/* Top 5 Coast Overlays */}
                {mode === 'coasts' && showTop5Coasts && (
                  Object.entries(COASTS_TOP5_CENTROIDS).map(([regionId, centroid]) => (
                    <g 
                      key={regionId}
                      transform={`translate(${centroid.x}, ${centroid.y})`}
                      className="cursor-pointer select-none opacity-95 hover:opacity-100 transition-opacity pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegionClick(regionId);
                      }}
                    >
                      <rect
                        x="-55"
                        y="-20"
                        width="110"
                        height="32"
                        rx="6"
                        fill="#fcfbf8"
                        stroke="#0284c7"
                        strokeWidth="1.2"
                        className="shadow-sm"
                      />
                      <text
                        x="0"
                        y="-8"
                        textAnchor="middle"
                        className="font-bold text-[8.5px] fill-stone-900 font-sans"
                      >
                        {centroid.rank}. {centroid.name}
                      </text>
                      <text
                        x="0"
                        y="6"
                        textAnchor="middle"
                        className="font-mono text-[7.5px] fill-sky-850 font-extrabold"
                      >
                        {centroid.length}
                      </text>
                    </g>
                  ))
                )}
              </g>
            </svg>
          </div>
          
          {/* Legend and Region badge row (Desktop only) */}
          <div className="hidden md:flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-stone-200/60 relative z-10">
            {mode === 'coasts' ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-white/80 backdrop-blur border border-stone-200 px-3 py-1.5 rounded-lg text-[10px] font-mono text-stone-600 flex items-center gap-1.5 shadow-sm">
                    <Waves size={11} className="text-sky-600" /> 15 REGIONI COSTIERE
                  </div>
                </div>

                {/* Coastline Legend */}
                <div className="flex flex-col gap-1 sm:text-right">
                  <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider font-bold">Sviluppo Costiero</div>
                  <div className="flex items-center gap-2 justify-start sm:justify-end">
                    <span className="text-[9px] font-mono text-stone-400">36 km</span>
                    <div 
                      className="h-2 w-28 rounded-full border border-stone-200/50 shadow-inner"
                      style={{
                        background: 'linear-gradient(to right, hsl(195, 35%, 85%), hsl(206, 50%, 69%), hsl(220, 70%, 50%))'
                      }}
                    />
                    <span className="text-[9px] font-mono text-stone-400">1.897 km</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-white/80 backdrop-blur border border-stone-200 px-3 py-1.5 rounded-lg text-[10px] font-mono text-stone-600 flex items-center gap-1.5 shadow-sm">
                    <Map size={11} /> 20 REGIONI D'ITALIA
                  </div>

                  {/* Elevation Toggle */}
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-stone-200 px-2.5 py-1.5 rounded-lg shadow-sm">
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider font-extrabold">Colori Altezze</span>
                    <button 
                      onClick={() => setShowElevation(!showElevation)}
                      title="Mostra/Nascondi Altezze Vette"
                      className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer relative flex items-center
                        ${showElevation ? 'bg-amber-700' : 'bg-stone-300'}`}
                    >
                      <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform duration-200
                        ${showElevation ? 'translate-x-3' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Elevation Legend */}
                <div className={`flex flex-col gap-1 sm:text-right transition-all duration-300 ${showElevation ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                  <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider font-bold">Quota Vetta Principale</div>
                  <div className="flex items-center gap-2 justify-start sm:justify-end">
                    <span className="text-[9px] font-mono text-stone-400">1.151m</span>
                    <div 
                      className="h-2 w-28 rounded-full border border-stone-200/50 shadow-inner"
                      style={{
                        background: 'linear-gradient(to right, hsl(38, 28%, 93%), hsl(30, 41%, 75%), hsl(22, 54%, 56%))'
                      }}
                    />
                    <span className="text-[9px] font-mono text-stone-400">4.810m</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Panel Side (Floats on mobile, side-by-side on desktop) */}
        <section className="absolute bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto md:w-[380px] z-20 pointer-events-none flex flex-col md:pointer-events-auto max-h-[50vh] md:max-h-none justify-end">
          
          {/* STUDY MODE PANEL */}
          {mode === 'study' && (
            <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col justify-between pointer-events-auto transition-all duration-300 shadow-lg md:shadow-sm">
              {isMinimized ? (
                <div 
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center justify-between cursor-pointer w-full"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-amber-700" />
                    <span className="text-xs font-bold text-stone-900">
                      {selectedRegion ? `Studia: ${selectedRegion.name}` : "Studia: Tocca una regione"}
                    </span>
                  </div>
                  <ChevronUp size={16} className="text-stone-500" />
                </div>
              ) : (
                <>
                  {/* Header row with minimize button */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-3 md:hidden">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-amber-700" />
                      <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">STUDIO</span>
                    </div>
                    <button 
                      onClick={() => setIsMinimized(true)}
                      className="p-1 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-500"
                      title="Riduci pannello"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedRegion ? (
                      <motion.div
                        key={selectedRegionId}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="space-y-4 flex-1 overflow-y-auto"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-amber-800 font-extrabold tracking-wider uppercase">Regione</span>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 mt-0.5">{selectedRegion.name}</h2>
                        </div>

                        <div className="space-y-3">
                          {/* Peak card */}
                          <div className="bg-amber-50/50 border border-amber-900/5 rounded-xl p-3 space-y-0.5">
                            <span className="text-[9px] font-mono text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                              <Mountain size={11} /> Cima Più Alta
                            </span>
                            <div className="text-lg font-extrabold text-amber-950">{selectedRegion.peak}</div>
                          </div>

                          {/* Stats grid */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3 space-y-0.5">
                              <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">Massiccio</span>
                              <div className="text-xs font-bold text-stone-855 truncate">{selectedRegion.massif}</div>
                            </div>
                            <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3 space-y-0.5">
                              <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">Altezza</span>
                              <div className="text-sm md:text-base font-extrabold font-mono text-amber-800">{selectedRegion.height.toLocaleString()} m</div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="bg-stone-50/40 border border-stone-200/40 rounded-xl p-3 text-xs font-sans text-stone-600 leading-relaxed max-h-[12vh] md:max-h-none overflow-y-auto">
                            {selectedRegion.notes}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 md:py-16">
                        <div className="p-3 bg-amber-50 rounded-full border border-amber-200/50 text-amber-700/60 animate-pulse shadow-sm">
                          <Compass size={32} />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-bold text-stone-850">Esplora la Mappa</h3>
                          <p className="text-[11px] md:text-xs text-stone-500 mt-1 max-w-[220px] mx-auto leading-relaxed">
                            Tocca una regione sulla mappa d'Italia per scoprire la sua vetta più alta, la quota e le note geografiche.
                          </p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>

                  {selectedRegion && (
                    <button
                      onClick={() => setSelectedRegionId(null)}
                      className="w-full mt-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-mono text-stone-500 hover:text-stone-850 hover:border-stone-300 transition-all cursor-pointer"
                    >
                      Rilascia Selezione
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* WATER MODE PANEL (Rivers & Lakes) */}
          {mode === 'water' && (
            <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col pointer-events-auto transition-all duration-300 shadow-lg md:shadow-sm">
              {isMinimized ? (
                <div 
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center justify-between cursor-pointer w-full"
                >
                  <div className="flex items-center gap-2">
                    <Waves size={16} className="text-amber-700" />
                    <span className="text-xs font-bold text-stone-900">
                      Acque d'Italia: 5 Fiumi e 5 Laghi
                    </span>
                  </div>
                  <ChevronUp size={16} className="text-stone-500" />
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-800 font-extrabold tracking-wider uppercase flex items-center gap-1">
                        <Waves size={12} /> Idrografia Italiana
                      </span>
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-stone-900 mt-0.5">Acque d'Italia</h2>
                    </div>
                    <button 
                      onClick={() => setIsMinimized(true)}
                      className="p-1 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-500"
                      title="Riduci pannello"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-stone-550 mt-1 font-sans hidden md:block">
                    Le cime montuose alimentano i fiumi e formano i grandi bacini lacustri del nostro Paese.
                  </p>

                  {/* Scrollable container for lists */}
                  <div className="flex-1 overflow-y-auto space-y-4 max-h-[30vh] md:max-h-[52vh] pr-1 scrollbar-thin mt-3">
                    {/* Rivers List */}
                    <div className="space-y-2">
                      <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                        🌊 I 5 Fiumi più Lunghi
                      </h3>
                      <div className="space-y-2">
                        {RIVERS_DATA.map((river, idx) => (
                          <div key={river.name} className="bg-amber-50/40 border border-amber-900/5 rounded-xl p-2.5 space-y-1 hover:border-amber-700/20 transition-all">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900">
                                {idx + 1}. {river.name}
                              </span>
                              <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full">
                                {river.length} km
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-[8px] font-mono text-stone-505">
                              <div>Sorgente: <strong className="text-stone-700">{river.source}</strong></div>
                              <div>Foce: <strong className="text-stone-700">{river.mouth}</strong></div>
                            </div>
                            <p className="text-[9px] text-stone-500 leading-relaxed font-sans pt-1 border-t border-dashed border-stone-200/50 mt-1">
                              {river.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lakes List */}
                    <div className="space-y-2 pt-1">
                      <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                        💧 I 5 Laghi Naturali più Grandi
                      </h3>
                      <div className="space-y-2">
                        {LAKES_DATA.map((lake, idx) => (
                          <div key={lake.name} className="bg-stone-50 border border-stone-200/60 rounded-xl p-2.5 space-y-1 hover:border-amber-700/20 transition-all">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900">
                                {idx + 1}. {lake.name}
                              </span>
                              <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full">
                                {lake.area} km²
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-[8px] font-mono text-stone-500">
                              <div>Regioni: <strong className="text-stone-750 truncate block max-w-[125px]">{lake.regions}</strong></div>
                              <div>Profondità: <strong className="text-stone-700">{lake.depth} m (max)</strong></div>
                            </div>
                            <p className="text-[9px] text-stone-500 leading-relaxed font-sans pt-1 border-t border-dashed border-stone-200/50 mt-1">
                              {lake.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* COSTE D'ITALIA PANEL */}
          {mode === 'coasts' && (
            <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col justify-between pointer-events-auto transition-all duration-300 shadow-lg md:shadow-sm">
              {isMinimized ? (
                <div 
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center justify-between cursor-pointer w-full"
                >
                  <div className="flex items-center gap-2">
                    <Waves size={16} className="text-amber-700" />
                    <span className="text-xs font-bold text-stone-900">
                      {selectedCoastRegion 
                        ? `Coste: ${selectedCoastRegion.name}` 
                        : showTop5Coasts 
                          ? "Coste: Top 5 Regioni Evidenziate" 
                          : "Coste: 7.914 km di litorale"
                      }
                    </span>
                  </div>
                  <ChevronUp size={16} className="text-stone-500" />
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between border-b border-stone-100 pb-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-amber-800 font-extrabold tracking-wider uppercase flex items-center gap-1">
                        <Waves size={12} /> Sviluppo Costiero
                      </span>
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-stone-900 mt-0.5">Coste d'Italia</h2>
                    </div>
                    <button 
                      onClick={() => setIsMinimized(true)}
                      className="p-1 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-500"
                      title="Riduci pannello"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {selectedCoastRegion ? (
                      <motion.div
                        key={selectedRegionId}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="space-y-4 flex-1 overflow-y-auto"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-sky-800 font-extrabold tracking-wider uppercase">Regione Costiera</span>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 mt-0.5">{selectedCoastRegion.name}</h2>
                        </div>

                        <div className="space-y-3">
                          {/* Length Card */}
                          <div className="bg-sky-50/50 border border-sky-900/5 rounded-xl p-3 space-y-0.5">
                            <span className="text-[9px] font-mono text-sky-850 uppercase tracking-widest flex items-center gap-1.5">
                              <Waves size={11} className="text-sky-750" /> Estensione Costa
                            </span>
                            <div className="text-lg font-extrabold text-sky-950">{selectedCoastRegion.length.toLocaleString()} km</div>
                          </div>

                          {/* Description */}
                          <div className="bg-stone-50/40 border border-stone-200/40 rounded-xl p-3 text-xs font-sans text-stone-600 leading-relaxed max-h-[12vh] md:max-h-none overflow-y-auto">
                            {selectedCoastRegion.desc}
                          </div>

                          {/* Famous Stretches in Region */}
                          {famousInRegion.length > 0 && (
                            <div className="space-y-2 pt-1">
                              <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-black">Tratti Celebri in Regione</span>
                              <div className="space-y-2">
                                {famousInRegion.map((coast) => (
                                  <div key={coast.name} className="bg-amber-50/40 border border-amber-900/5 rounded-xl p-2.5 space-y-0.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-stone-900">{coast.name}</span>
                                      <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full">{coast.length}</span>
                                    </div>
                                    <div className="text-[8px] font-mono text-stone-500">Tipo: {coast.type}</div>
                                    <p className="text-[9px] text-stone-550 leading-relaxed pt-1 border-t border-dashed border-stone-200/50 mt-1">{coast.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-4 flex-1 flex flex-col min-h-0">
                        {/* Top 5 toggle */}
                        <button
                          onClick={() => setShowTop5Coasts(!showTop5Coasts)}
                          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm
                            ${showTop5Coasts 
                              ? 'bg-sky-600 text-white border-sky-600 shadow-sky-500/10' 
                              : 'bg-white border-stone-250 text-stone-700 hover:bg-stone-50'}`}
                        >
                          <Waves size={14} />
                          {showTop5Coasts ? "Nascondi Top 5 sulla Mappa" : "Evidenzia Top 5 sulla Mappa"}
                        </button>

                        <p className="text-[11px] text-stone-500 font-sans hidden md:block">
                          L'Italia è circondata da circa 7.914 km di litorale, diviso tra 15 regioni costiere e lambito da 6 mari diversi.
                        </p>

                        {/* Scrollable container for lists */}
                        <div className="flex-1 overflow-y-auto space-y-4 max-h-[25vh] md:max-h-[48vh] pr-1 scrollbar-thin">
                          {/* Famous Stretches List */}
                          <div className="space-y-2">
                            <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                              🌊 Tratti Costieri Celebri
                            </h3>
                            <div className="space-y-2">
                              {COASTS_FAMOUS_DATA.map((coast) => (
                                <div 
                                  key={coast.name} 
                                  onClick={() => setSelectedRegionId(coast.regionId)}
                                  className="bg-amber-50/40 border border-amber-900/5 rounded-xl p-2.5 space-y-1 hover:border-sky-600/35 transition-all cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-stone-900">
                                      {coast.name}
                                    </span>
                                    <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full">
                                      {coast.length}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1 text-[8px] font-mono text-stone-500">
                                    <div>Regione: <strong className="text-stone-700">{coast.region}</strong></div>
                                    <div>Tipo: <strong className="text-stone-700">{coast.type}</strong></div>
                                  </div>
                                  <p className="text-[9px] text-stone-500 leading-relaxed font-sans pt-1 border-t border-dashed border-stone-200/50 mt-1">
                                    {coast.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Regions Coastline Development List */}
                          <div className="space-y-2 pt-1">
                            <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                              📍 Lunghezza Coste per Regione
                            </h3>
                            <div className="space-y-1.5">
                              {COASTS_REGIONS_DATA.map((reg, idx) => (
                                <div 
                                  key={reg.name} 
                                  onClick={() => setSelectedRegionId(reg.id)}
                                  className="bg-stone-50 border border-stone-200/60 rounded-xl p-2.5 space-y-1 hover:border-sky-600/35 transition-all cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-stone-900">
                                      {idx + 1}. {reg.name}
                                    </span>
                                    <span className="text-[9px] font-mono font-bold text-stone-500 bg-stone-150 px-2 py-0.5 rounded-full">
                                      {reg.length} km
                                    </span>
                                  </div>
                                  <p className="text-[9px] text-stone-500 leading-relaxed font-sans mt-0.5">
                                    {reg.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>

                  {selectedRegionId && (
                    <button
                      onClick={() => setSelectedRegionId(null)}
                      className="w-full mt-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs font-mono text-stone-500 hover:text-stone-850 hover:border-stone-300 transition-all cursor-pointer pointer-events-auto"
                    >
                      Rilascia Selezione
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* QUIZ MODE PANEL */}
          {mode === 'quiz' && (
            <div className={`glass-panel rounded-2xl p-4 md:p-6 flex flex-col pointer-events-auto transition-all duration-500 shadow-lg md:shadow-sm ${
              quizFinished && score === 20 
                ? 'border-amber-400 ring-2 ring-amber-400/40 bg-amber-50/10 shadow-[0_0_40px_rgba(245,158,11,0.12)]' 
                : ''
            }`}>
              {isMinimized ? (
                <div 
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center justify-between cursor-pointer w-full"
                >
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-amber-700" />
                    <span className="text-xs font-bold text-stone-900">
                      {!quizStarted 
                        ? "Quiz: Pronto per la Sfida?" 
                        : quizFinished 
                          ? `Quiz completato! Punteggio: ${score}/20`
                          : `Quiz: Domanda ${currentQuestionIndex + 1}/20 (${currentQuizRegion?.peak})`
                      }
                    </span>
                  </div>
                  <ChevronUp size={16} className="text-stone-500" />
                </div>
              ) : (
                <>
                  {/* Minimize button */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-3 md:hidden">
                    <div className="flex items-center gap-1.5">
                      <Trophy size={14} className="text-amber-700" />
                      <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">SFIDA QUIZ</span>
                    </div>
                    <button 
                      onClick={() => setIsMinimized(true)}
                      className="p-1 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-500"
                      title="Riduci pannello"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  {/* Ready to start quiz screen */}
                  {!quizStarted && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-4 md:py-8">
                      <div className="p-3 bg-amber-50 rounded-full border border-amber-200 text-amber-700 shadow-sm hidden md:block">
                        <Trophy size={40} />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-stone-900">Pronto per la Sfida?</h3>
                        <p className="text-[11px] md:text-xs text-stone-500 mt-2 max-w-[240px] mx-auto leading-relaxed font-sans">
                          Ti verranno chieste le posizioni di tutte le 20 vette regionali più alte d'Italia. Cerca di totalizzare il punteggio massimo!
                        </p>
                      </div>

                      <button
                        onClick={startNewQuiz}
                        className="w-full bg-amber-700 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-amber-800 transition-all shadow-[0_4px_15px_rgba(180,83,9,0.15)] cursor-pointer"
                      >
                        Inizia Quiz
                      </button>
                    </div>
                  )}

                  {/* Quiz in progress */}
                  {quizStarted && !quizFinished && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Status bar */}
                        <div className="flex justify-between items-center font-mono text-[9px] text-stone-500 border-b border-stone-200 pb-2">
                          <span>DOMANDA {currentQuestionIndex + 1} / {questions.length}</span>
                          <span className="text-amber-800 font-bold">PUNTEGGIO: {score}</span>
                        </div>

                        {/* Question Card */}
                        <div className="space-y-3">
                          <div className="bg-amber-50 border-l-4 border-amber-700 p-3 rounded-r-xl space-y-1 shadow-sm">
                            <div className="text-[8px] font-mono text-amber-800 font-extrabold tracking-widest uppercase">Trova la regione di:</div>
                            <div className="text-lg font-extrabold text-stone-900 leading-tight">
                              {currentQuizRegion?.peak}
                            </div>
                            <div className="flex items-center gap-3 text-[9px] font-mono text-stone-500 pt-0.5">
                              <span>Gruppo: <strong className="text-stone-700">{currentQuizRegion?.massif}</strong></span>
                              <span>Altezza: <strong className="text-amber-850">{currentQuizRegion?.height} m</strong></span>
                            </div>
                          </div>

                          {/* Map Prompt */}
                          {answeredState === null ? (
                            selectedAnswerId === null ? (
                              <div className="bg-stone-50 border border-dashed border-stone-300 p-4 rounded-xl text-center">
                                <p className="text-xs font-sans text-stone-500 animate-pulse">
                                  Tocca sulla mappa la regione corretta!
                                </p>
                              </div>
                            ) : (
                              <div className="bg-amber-50 border border-amber-250 p-3.5 rounded-xl text-center space-y-1 shadow-sm">
                                <p className="text-xs font-sans text-stone-700">
                                  Hai selezionato: <strong className="text-stone-900 font-extrabold">{PEAKS_DATA[selectedAnswerId]?.name}</strong>
                                </p>
                                <p className="text-[10px] font-medium text-amber-800 animate-pulse">
                                  Tocca di nuovo la regione per confermare.
                                </p>
                              </div>
                            )
                          ) : (
                            <motion.div
                              initial={{ scale: 0.96, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                                answeredState === 'correct' 
                                  ? 'border-emerald-250 bg-emerald-50 text-emerald-800' 
                                  : 'border-rose-250 bg-rose-50 text-rose-800'
                              }`}
                            >
                              <div className="mt-0.5">
                                {answeredState === 'correct' ? <Check size={14} /> : <X size={14} />}
                              </div>
                              <div className="text-[11px] space-y-0.5 font-sans">
                                <div className="font-extrabold">
                                  {answeredState === 'correct' ? 'Risposta Esatta!' : 'Risposta Errata!'}
                                </div>
                                <p className="text-stone-600 leading-relaxed">
                                  {answeredState === 'correct' 
                                    ? `Il ${currentQuizRegion?.peak} è in ${currentQuizRegion?.name}.`
                                    : `Si trova in ${currentQuizRegion?.name} (non in ${PEAKS_DATA[selectedAnswerId]?.name || 'quella selezionata'}).`
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
                          className="w-full mt-4 bg-stone-800 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-amber-700 transition-all cursor-pointer"
                        >
                          {currentQuestionIndex + 1 < questions.length ? 'Prossima Domanda' : 'Vedi Risultati'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* End of Quiz Screen */}
                  {quizFinished && (
                    <div className="flex-1 flex flex-col justify-between py-1 overflow-y-auto max-h-[35vh] md:max-h-none">
                      <div className="space-y-4 text-center">
                        <div className={`p-3 rounded-full inline-block animate-bounce shadow-sm relative ${
                          score === 20 
                            ? 'bg-amber-100 border-2 border-amber-500 text-amber-600 shadow-amber-400/20 scale-105' 
                            : 'bg-amber-50 border border-amber-250 text-amber-700'
                        }`}>
                          {score === 20 ? (
                            <>
                              <Award size={40} />
                              <Sparkles size={12} className="absolute -top-1 -right-1 text-amber-500 animate-pulse" />
                            </>
                          ) : (
                            <Award size={36} />
                          )}
                        </div>
                        <div>
                          <h3 className={`text-xl font-extrabold ${score === 20 ? 'text-amber-850' : 'text-stone-900'}`}>
                            {score === 20 ? '🏆 Vittoria Perfetta!' : 'Quiz Completato!'}
                          </h3>
                          <p className="text-[10px] font-mono text-amber-800/80 mt-0.5 uppercase tracking-wider">
                            {score === 20 ? 'Prontissima per l\'esame-Юля!' : 'Analisi dei Risultati'}
                          </p>
                        </div>

                        {/* Result table */}
                        <div className={`grid grid-cols-2 gap-2 border rounded-xl p-3 ${
                          score === 20 ? 'bg-amber-50/40 border-amber-200/65 shadow-inner' : 'bg-stone-50 border-stone-200'
                        }`}>
                          <div>
                            <div className="text-[8px] font-mono text-stone-500">PUNTEGGIO</div>
                            <div className={`text-base font-bold ${score === 20 ? 'text-amber-950 font-black' : 'text-stone-900'}`}>{score} / {questions.length}</div>
                          </div>
                          <div>
                            <div className="text-[8px] font-mono text-stone-500">PRECISIONE</div>
                            <div className={`text-base font-bold ${score === 20 ? 'text-amber-850 font-black' : score >= 15 ? 'text-emerald-700' : score >= 10 ? 'text-amber-700' : 'text-rose-700'}`}>
                              {Math.round((score / questions.length) * 100)}%
                            </div>
                          </div>
                        </div>

                        {/* Unlock card */}
                        <div className={`border rounded-xl p-3 space-y-0.5 text-center font-sans ${
                          score === 20 ? 'bg-amber-100/30 border-amber-300/40 shadow-sm' : 'bg-amber-50/50 border-amber-200'
                        }`}>
                          <div className="text-[9px] font-mono text-amber-800 uppercase tracking-widest font-black">Grado Raggiunto</div>
                          <div className={`text-sm font-bold mt-0.5 ${score === 20 ? 'text-amber-950' : 'text-stone-900'}`}>
                            {getBadge(score).emoji} {getBadge(score).title}
                          </div>
                          <p className="text-[11px] text-stone-600 pt-0.5 leading-relaxed">
                            {getBadge(score).desc}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={resetQuiz}
                        className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          score === 20 
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-[0_4px_20px_rgba(217,119,6,0.25)]' 
                            : 'bg-amber-700 text-white hover:bg-amber-800 shadow-[0_4px_15px_rgba(180,83,9,0.15)]'
                        }`}
                      >
                        Torna alla Mappa
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 pt-4 border-t border-stone-200 text-center text-[10px] font-mono text-stone-400 hidden md:block">
        SUMMIT QUEST &copy; {new Date().getFullYear()} &bull; MAPPA VETTORIALE INTERATTIVA DELLE MONTAGNE ITALIANE
      </footer>

    </div>
  );
}

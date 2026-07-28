/* ==========================================================================
   FOX HIT KIT - BEATS VOL.1 | Interactive JavaScript & Web Audio API Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMouseSpotlight();
  initParticleCanvas();
  init3DTilt();
  initMarquee();
  initAudioEngine();
  initCatalog();
  initCountdownTimer();
  initFAQAccordion();
});

/* --------------------------------------------------------------------------
   1. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
}

/* --------------------------------------------------------------------------
   2. MOUSE SPOTLIGHT TRACKING
   -------------------------------------------------------------------------- */
function initMouseSpotlight() {
  const spotlight = document.getElementById('mouse-spotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateSpotlight() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animateSpotlight);
  }
  animateSpotlight();
}

/* --------------------------------------------------------------------------
   3. PARTICLE CANVAS (PURPLE SMOKE & DUST)
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(50, Math.floor(width / 25));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      color: Math.random() > 0.4 ? 'rgba(180, 85, 255, ' : 'rgba(138, 46, 255, ',
      alpha: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#B455FF';
      ctx.fill();
    });

    requestAnimationFrame(renderParticles);
  }
  renderParticles();
}

/* --------------------------------------------------------------------------
   4. 3D TILT EFFECT FOR CARDS & BOX
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const tiltElements = document.querySelectorAll('.tilt-card, .product-box-card');

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* --------------------------------------------------------------------------
   5. INFINITE MARQUEE TICKER
   -------------------------------------------------------------------------- */
function initMarquee() {
  const marqueeTrack = document.getElementById('marquee-track');
  if (!marqueeTrack) return;
  const content = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = content + content;
}

/* --------------------------------------------------------------------------
   6. REAL AUDIO FILE & SYNTH HYBRID PLAYER WITH SOUNDCLOUD WAVEFORM CANVAS
   -------------------------------------------------------------------------- */
const PREVIEW_TRACKS = [
  {
    id: 'track-1',
    name: 'ECLIPSE',
    genre: 'TRAP RAGE',
    artist: 'Playboi Carti x Lil Uzi Vert',
    bpm: 162,
    key: 'A min',
    icon: '🌑',
    synthType: 'rage',
    audioUrl: 'audio/track1.mp3',
    startTime: 0
  },
  {
    id: 'track-2',
    name: 'MOTOR POTENTE',
    genre: 'FUNK SP',
    artist: 'Mc Hariel x Ig Style',
    bpm: 116,
    key: 'G min',
    icon: '🔥',
    synthType: 'funk_sp',
    audioUrl: 'audio/track2.mp3',
    startTime: 0
  },
  {
    id: 'track-3',
    name: 'EGÍTO',
    genre: 'FUNK BH',
    artist: 'Ws Da Igrejinha Style',
    bpm: 130,
    key: 'F# min',
    icon: '💣',
    synthType: 'funk_bh',
    audioUrl: 'audio/track3.mp3',
    startTime: 0
  },
  {
    id: 'track-4',
    name: 'MICHIGAN',
    genre: 'DRILL',
    artist: 'Central Cee x Yuki Vino Style',
    bpm: 142,
    key: 'B min',
    icon: '🗡️',
    synthType: 'drill',
    audioUrl: 'audio/track4.mp3',
    startTime: 0
  },
  {
    id: 'track-5',
    name: 'ATABACADA SINISTRA',
    genre: 'FUNK BH',
    artist: 'Gordão Do Pc x Vitin Do Pc x Fiuza x Ws Da Igrejinha',
    bpm: 130,
    key: 'F min',
    icon: '🥁',
    synthType: 'funk_bh',
    audioUrl: 'audio/track5.mp3',
    startTime: 0
  }
];


let audioCtx = null;
let masterGain = null;
let analyserNode = null;
let realAudioElement = new Audio();
let audioSourceNode = null;
let currentTrackIndex = 0;
let isPlaying = false;
let currentTime = 0;
const MAX_PREVIEW_TIME = 30.00;
let playbackTimer = null;
let usingRealAudio = false;

function initAudioEngine() {
  const playBtn = document.getElementById('player-play-btn');
  const playIcon = document.getElementById('play-btn-icon');
  const timeDisplay = document.getElementById('player-time-display');
  const volumeSlider = document.getElementById('volume-slider');
  const canvas = document.getElementById('waveform-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const barCount = 70;

  const staticBars = [];
  for (let i = 0; i < barCount; i++) {
    staticBars.push(Math.sin(i * 0.15) * 0.35 + Math.random() * 0.45 + 0.2);
  }

  function drawWaveform() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barWidth = 4;
    const gap = (w - (barCount * barWidth)) / (barCount - 1);
    const track = PREVIEW_TRACKS[currentTrackIndex];
    const startSec = track.startTime || 0;

    if (usingRealAudio && !realAudioElement.paused) {
      const relativeTime = realAudioElement.currentTime - startSec;
      if (relativeTime < 0 || relativeTime >= MAX_PREVIEW_TIME) {
        currentTime = 0;
        realAudioElement.currentTime = startSec;
      } else {
        currentTime = relativeTime;
      }
      updateTimeDisplay();
    }

    const progressRatio = currentTime / MAX_PREVIEW_TIME;

    let hasRealAudioSignal = false;
    if (analyserNode && isPlaying) {
      frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
      analyserNode.getByteFrequencyData(frequencyData);
      for (let k = 0; k < frequencyData.length; k++) {
        if (frequencyData[k] > 5) {
          hasRealAudioSignal = true;
          break;
        }
      }
    }

    const time = Date.now() * 0.007;
    for (let i = 0; i < barCount; i++) {
      const x = i * (barWidth + gap);
      let barHeightRatio = staticBars[i];

      if (hasRealAudioSignal) {
        const dataIdx = Math.floor((i / barCount) * (frequencyData.length / 2));
        barHeightRatio = (frequencyData[dataIdx] / 255) * 1.3;
      } else if (isPlaying) {
        // Animação dinâmica de estúdio de alta fidelidade reagindo rítmicamente
        const kickPulse = Math.pow(Math.abs(Math.sin(time * 3.2)), 2) * 0.45;
        const subBass = Math.sin(time * 1.5 + i * 0.2) * 0.18;
        const hihat = Math.cos(time * 4.8 - i * 0.35) * 0.12;
        const groove = Math.sin(i * 12.5 + time * 6) * 0.09;
        const centerBoost = 1 - Math.abs(i - barCount / 2) / (barCount / 2);
        barHeightRatio = staticBars[i] + (kickPulse * centerBoost) + subBass + hihat + groove;
      }

      barHeightRatio = Math.max(0.08, Math.min(0.95, barHeightRatio));
      const barH = barHeightRatio * (h * 0.75);
      const y = (h - barH) / 2;

      if ((i / barCount) <= progressRatio) {
        ctx.fillStyle = '#B455FF';
        ctx.shadowBlur = isPlaying ? 12 : 4;
        ctx.shadowColor = '#8A2EFF';
      } else {
        ctx.fillStyle = 'rgba(191, 194, 201, 0.25)';
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, 2);
      ctx.fill();
    }

    const playheadX = Math.min(w, progressRatio * w);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFFFFF';
    ctx.fillRect(playheadX - 1, 0, 3, h);

    requestAnimationFrame(drawWaveform);
  }

  drawWaveform();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    currentTime = ratio * MAX_PREVIEW_TIME;

    const track = PREVIEW_TRACKS[currentTrackIndex];
    const startSec = track.startTime || 0;

    if (usingRealAudio) {
      realAudioElement.currentTime = startSec + currentTime;
    }
    updateTimeDisplay();
  });

  const trackSelectorCards = document.querySelectorAll('.track-select-card');
  trackSelectorCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      trackSelectorCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectTrack(index);
    });
  });

  selectTrack(0);

  function selectTrack(index) {
    currentTrackIndex = index;
    const track = PREVIEW_TRACKS[index];

    document.getElementById('active-track-name').textContent = track.name;
    document.getElementById('active-track-sub').textContent = `${track.genre} • ${track.bpm} BPM • ${track.key} • ${track.artist}`;
    document.getElementById('active-track-icon').textContent = track.icon;

    currentTime = 0;
    if (usingRealAudio) {
      realAudioElement.pause();
      realAudioElement.currentTime = track.startTime || 0;
    }
    updateTimeDisplay();

    if (isPlaying) {
      playCurrentBeat();
    }
  }

  function updateTimeDisplay() {
    const curSec = Math.floor(currentTime).toString().padStart(2, '0');
    const curMs = Math.floor((currentTime % 1) * 100).toString().padStart(2, '0');
    timeDisplay.textContent = `00:${curSec}:${curMs} / 00:30:00`;
  }

  playBtn.addEventListener('click', () => {
    initWebAudioNodes();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isPlaying) {
      pauseBeat();
    } else {
      startBeat();
    }
  });

  function initWebAudioNodes() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
      masterGain = audioCtx.createGain();
      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 128;
      masterGain.connect(audioCtx.destination);
    }
  }

  function startBeat() {
    isPlaying = true;
    playIcon.className = 'ri-pause-fill';
    playCurrentBeat();
  }

  function pauseBeat() {
    isPlaying = false;
    playIcon.className = 'ri-play-fill';
    clearInterval(playbackTimer);
    if (usingRealAudio) {
      realAudioElement.pause();
    }
  }

  function playCurrentBeat() {
    const track = PREVIEW_TRACKS[currentTrackIndex];
    const startSec = track.startTime || 0;
    initWebAudioNodes();

    const vol = parseFloat(volumeSlider.value);
    realAudioElement.volume = vol;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(vol * 0.8, audioCtx.currentTime);
    }

    if (track.audioUrl) {
      const urlsToTry = [
        track.audioUrl,
        './' + track.audioUrl,
        '/' + track.audioUrl,
        '/FOX%20HIT%20KI%20SITE/' + track.audioUrl,
        '/FOX HIT KI SITE/' + track.audioUrl
      ];

      let attemptIndex = 0;

      function tryNextUrl() {
        if (attemptIndex >= urlsToTry.length) {
          console.warn('All audio URLs failed for track:', track.name);
          usingRealAudio = false;
          startSynthLoop(track.synthType);
          return;
        }

        const currentUrl = urlsToTry[attemptIndex++];
        realAudioElement.pause();
        realAudioElement.onended = null;
        realAudioElement.ontimeupdate = null;
        realAudioElement.onerror = () => {
          tryNextUrl();
        };

        realAudioElement.src = currentUrl;
        realAudioElement.load();

        const startPlay = () => {
          try {
            realAudioElement.currentTime = startSec + currentTime;
          } catch (e) {}
          realAudioElement.play().then(() => {
            usingRealAudio = true;
            clearInterval(playbackTimer);

            playbackTimer = setInterval(() => {
              if (usingRealAudio && !realAudioElement.paused) {
                const relTime = realAudioElement.currentTime - startSec;
                if (relTime >= MAX_PREVIEW_TIME) {
                  realAudioElement.currentTime = startSec;
                  currentTime = 0;
                } else {
                  currentTime = Math.max(0, relTime);
                }
                updateTimeDisplay();
              }
            }, 50);
          }).catch(() => {
            tryNextUrl();
          });
        };

        if (realAudioElement.readyState >= 1) {
          startPlay();
        } else {
          realAudioElement.oncanplay = () => {
            realAudioElement.oncanplay = null;
            if (isPlaying) startPlay();
          };
          startPlay();
        }
      }

      tryNextUrl();
    } else {
      usingRealAudio = false;
      startSynthLoop(track.synthType);
    }
  }

  function startSynthLoop(type) {
    clearInterval(playbackTimer);
    triggerSynthRhythm(type, audioCtx.currentTime);
    let beatCounter = 0;
    playbackTimer = setInterval(() => {
      if (!isPlaying) return;
      currentTime += 0.05;
      if (currentTime >= MAX_PREVIEW_TIME) {
        currentTime = 0;
      }
      updateTimeDisplay();
      beatCounter++;
      if (beatCounter % 10 === 0) {
        triggerSynthRhythm(type, audioCtx.currentTime);
      }
    }, 50);
  }

  function triggerSynthRhythm(type, now) {
    const kickOsc = audioCtx.createOscillator();
    const kickGain = audioCtx.createGain();
    kickOsc.type = 'sine';
    kickOsc.frequency.setValueAtTime(type === 'rage' ? 150 : 130, now);
    kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.3);
    kickGain.gain.setValueAtTime(1, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    kickOsc.connect(kickGain);
    kickGain.connect(masterGain);
    kickOsc.start(now);
    kickOsc.stop(now + 0.35);

    const synthOsc = audioCtx.createOscillator();
    const synthGain = audioCtx.createGain();
    synthOsc.type = type === 'rage' || type === 'drill' ? 'sawtooth' : 'triangle';

    const freqs = [220, 261.63, 293.66, 329.63, 392.00];
    const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

    synthOsc.frequency.setValueAtTime(randomFreq, now);
    synthGain.gain.setValueAtTime(0.3, now);
    synthGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    synthOsc.connect(synthGain);
    synthGain.connect(masterGain);
    synthOsc.start(now);
    synthOsc.stop(now + 0.4);
  }

  volumeSlider.addEventListener('input', () => {
    const vol = parseFloat(volumeSlider.value);
    realAudioElement.volume = vol;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(vol * 0.8, audioCtx.currentTime);
    }
  });
}

/* --------------------------------------------------------------------------
   7. INSIDE THE KIT - 30 BEATS CATALOG DATA & FILTERING WITH SPOTIFY LINKS
   -------------------------------------------------------------------------- */
const ALL_30_BEATS = [
  { name: 'TYPE BEAT FUNK - ALUCINANTE', key: 'A# min', bpm: 121, genre: 'Funk SP', artist: 'Mc Hariel' },
  { name: 'TYPE BEAT FUNK - MOTOR POTENTE', key: 'G min', bpm: 116, genre: 'Funk SP', artist: 'Mc Hariel x Ig' },
  { name: 'TYPE BEAT FUNK - PELAS ALAMEDAS', key: 'C# min', bpm: 125, genre: 'Funk SP', artist: 'Mc Tuto x Marks' },
  { name: 'TYPE BEAT FUNK - RITIMINALISCA', key: 'A# min', bpm: 128, genre: 'Funk SP', artist: 'Mc Ryan SP' },
  { name: 'TYPE BEAT FUNK - TEMPESTADE VAI PASSAR', key: 'F# min', bpm: 122, genre: 'Funk SP', artist: 'Mc Rick' },
  { name: 'TYPE BEAT BOOMPAP - AT NIGHTFALL', key: 'E min', bpm: 104, genre: 'Boom Bap', artist: 'Underground Classic' },
  { name: 'TYPE BEAT BOOMPAP - DONT\'S RUN AWAY', key: 'B min', bpm: 88, genre: 'Boom Bap', artist: 'Chill Boom Bap' },
  { name: 'TYPE BEAT BOOMPAP - MOOG CAOS', key: 'B min', bpm: 142, genre: 'Boom Bap', artist: 'Lo-Fi Vinyl' },
  { name: 'TYPE BEAT BOOMPAP - RUSTY KEYS', key: 'B min', bpm: 142, genre: 'Boom Bap', artist: 'Jazz Rap' },
  { name: 'TYPE BEAT BOOMPAP - YOU LOST', key: 'A# min', bpm: 82, genre: 'Boom Bap', artist: 'Eazy-E' },
  { name: 'TYPE BEAT DETROIT - SCAM', key: 'B min', bpm: 142, genre: 'Detroit', artist: 'Yuki Vino' },
  { name: 'TYPE BEAT DRILL - MICHIGAN', key: 'B min', bpm: 142, genre: 'Drill', artist: 'Central Cee' },
  { name: 'TYPE BEAT FUNK - ELA VEM', key: 'B min', bpm: 112, genre: 'Funk SP', artist: 'Mc Cebezinho x Hariel' },
  { name: 'TYPE BEAT FUNK - GS 1200', key: 'G min', bpm: 130, genre: 'Funk SP', artist: 'Pp Da Vs x Neguinho' },
  { name: 'TYPE BEAT FUNK - MALDITA', key: 'C# min', bpm: 130, genre: 'Funk SP', artist: 'Mc Marks x Menor' },
  { name: 'TYPE BEAT FUNK - PESADELO', key: 'A min', bpm: 130, genre: 'Funk SP', artist: 'Mc Ig x Tuto x Marks' },
  { name: 'TYPE BEAT FUNK - TÁ GOSTOZIN', key: 'D min', bpm: 128, genre: 'Funk SP', artist: 'Hariel x Ig x Cebezinho' },
  { name: 'TYPE BEAT FUNK - VERSÍCULOS', key: 'Eb min', bpm: 85, genre: 'Conscious Rap', artist: 'Mc Marks x Kadu' },
  { name: 'TYPE BEAT FUNK BH - ATABACADA SINISTRA', key: 'F min', bpm: 130, genre: 'Funk BH', artist: 'Gordão Do Pc x Vitin Do Pc x Fiuza x Ws Da Igrejinha' },
  { name: 'TYPE BEAT FUNK BH - CONHECIDO POR ELAS', key: 'G min', bpm: 130, genre: 'Funk BH', artist: 'Bailão BH' },
  { name: 'TYPE BEAT FUNK BH - DE MADRUGADA NO BAILÃO', key: 'A min', bpm: 130, genre: 'Funk BH', artist: 'BH Nights' },
  { name: 'TYPE BEAT FUNK BH - EGÍTO', key: 'F# min', bpm: 130, genre: 'Funk BH', artist: 'Ws Da Igrejinha' },
  { name: 'TYPE BEAT FUNK BH - PERDIDA NO SERRÃO', key: 'B min', bpm: 130, genre: 'Funk BH', artist: 'BH Underground' },
  { name: 'TYPE BEAT FUNK BH - SÓ RAJADA', key: 'E min', bpm: 130, genre: 'Funk BH', artist: 'Ph Do Mpc' },
  { name: 'TYPE BEAT TRAP - DARKEYS', key: 'A# min', bpm: 144, genre: 'Trap', artist: 'Migos x Travis Scott' },
  { name: 'TYPE BEAT TRAP - FREESTYLE', key: 'D min', bpm: 146, genre: 'Trap', artist: 'Drake x Migos' },
  { name: 'TYPE BEAT TRAP - NIGHTMARE', key: 'A# min', bpm: 144, genre: 'Trap', artist: 'Lil Uzi Vert x Future' },
  { name: 'TYPE BEAT TRAP - PIZZIFIRE', key: 'F# min', bpm: 146, genre: 'Trap', artist: 'Veigh x 21 Savage' },
  { name: 'TYPE BEAT TRAP - TAKE DICK', key: 'F# min', bpm: 144, genre: 'Trap', artist: 'Playboi Carti' },
  { name: 'TYPE BEAT TRAP RAGE - ECLIPSE', key: 'A min', bpm: 162, genre: 'Trap', artist: 'Playboi Carti' }
];

function generateSpotifyLink(artistName) {
  const cleanName = artistName.replace(' Style', '').trim();
  const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(cleanName)}`;
  return `<a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="spotify-artist-link" title="Ouvir ${cleanName} no Spotify"><i class="ri-spotify-fill" style="color: #1DB954;"></i> ${cleanName}</a>`;
}

function initCatalog() {
  const container = document.getElementById('beats-grid-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  function renderBeats(filter = 'ALL') {
    container.innerHTML = '';
    const filtered = filter === 'ALL'
      ? ALL_30_BEATS
      : ALL_30_BEATS.filter(b => b.genre.toUpperCase() === filter.toUpperCase());

    filtered.forEach(beat => {
      const card = document.createElement('div');
      card.className = 'beat-card tilt-card';
      const spotifyHtml = generateSpotifyLink(beat.artist);

      card.innerHTML = `
        <div class="beat-card-top">
          <span class="beat-genre-tag">${beat.genre}</span>
          <span class="beat-bpm-key">${beat.bpm} BPM • ${beat.key}</span>
        </div>
        <h3 class="beat-name">${beat.name}</h3>
        <div class="beat-artist-ref">Inspirado em: ${spotifyHtml}</div>
        <div class="beat-card-footer">
          <span class="wav-badge"><i class="ri-checkbox-circle-fill"></i> WAV 24-Bit / Master</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--purple-neon); font-weight: 700;">ROYALTY FREE</span>
        </div>
      `;
      container.appendChild(card);
    });

    init3DTilt();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBeats(btn.getAttribute('data-filter'));
    });
  });

  renderBeats('ALL');
}

/* --------------------------------------------------------------------------
   8. COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  if (!hoursEl) return;

  let totalSeconds = 3 * 3600 + 45 * 60 + 20;

  setInterval(() => {
    if (totalSeconds > 0) totalSeconds--;
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');

    hoursEl.textContent = h;
    minsEl.textContent = m;
    secsEl.textContent = s;
  }, 1000);
}

/* --------------------------------------------------------------------------
   9. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

const unlockBtn = document.getElementById('unlock-btn');
const tracksContainer = document.getElementById('tracks');
const mikiGreeting = document.getElementById('miki-greeting');
const allTracks = document.querySelectorAll('#tracks .track audio');
const trackDivs = document.querySelectorAll('#tracks .track');

const riddles = [
  { question: "What color are Miki's spikes?", answer: "yellow" },
  { question: "What city does Miki riff from?", answer: "parallel paris" },
  { question: "What's the name of Miki's anthem?", answer: "not of this world" }
];

let currentRiddleIndex = 0;
let unlockedTracks = 0;
let currentTrackIndex = 0;
let isPlaying = false;

// Elements for riddle zone
const riddleZone = document.getElementById('riddle-zone');
const riddleQuestion = document.getElementById('riddle-question');
const riddleAnswer = document.getElementById('riddle-answer');
const riddleSubmit = document.getElementById('riddle-submit');
const riddleFeedback = document.getElementById('riddle-feedback');

// Unlock button click
unlockBtn.addEventListener('click', () => {
  unlockBtn.style.display = 'none';
  mikiGreeting.textContent = "Miki: Ready to prove you know my code? Solve my riddles to unlock the riffs.";
  riddleZone.classList.remove('hidden');
  askNextRiddle();
});

// Ask current riddle
function askNextRiddle() {
  if(currentRiddleIndex < riddles.length) {
    riddleQuestion.textContent = riddles[currentRiddleIndex].question;
    riddleAnswer.value = '';
    riddleFeedback.textContent = '';
  } else {
    // All riddles answered
    riddleZone.classList.add('hidden');
    mikiGreeting.textContent = "Miki: You know me well, runner. The portal is yours.";
  }
}

// Submit riddle answer
riddleSubmit.addEventListener('click', () => {
  const userAnswer = riddleAnswer.value.trim().toLowerCase();
  if(userAnswer === riddles[currentRiddleIndex].answer.toLowerCase()) {
    riddleFeedback.textContent = "Miki: Correct! Unlocking the next track...";
    unlockNextTrack();
    currentRiddleIndex++;
    askNextRiddle();
  } else {
    riddleFeedback.innerHTML = `Miki: Hmm... not quite. <a href="https://yourlorelink.com" target="_blank">Read my lore</a> first.`;
  }
});

const playPauseBtn = document.getElementById('play-pause-btn');
const trackTitle = document.getElementById('track-title');

let currentTrackIndex = 0;
let unlockedTracks = 0;
let isPlaying = false;

// Unlock next track (after correct riddle)
function unlockNextTrack() {
  if(unlockedTracks < trackDivs.length) {
    unlockedTracks++;
    currentTrackIndex = unlockedTracks - 1;
    const trackDiv = trackDivs[currentTrackIndex];
    const audio = allTracks[currentTrackIndex];
    
    trackTitle.textContent = trackDiv.querySelector('.track-title').textContent;
    audio.play().then(() => {
      isPlaying = true;
      playPauseBtn.textContent = '⏸️ Pause';
    }).catch(err => console.warn("Autoplay blocked:", err));
    
    audio.addEventListener('ended', () => {
      if(currentTrackIndex + 1 < unlockedTracks) {
        currentTrackIndex++;
        const nextAudio = allTracks[currentTrackIndex];
        const nextDiv = trackDivs[currentTrackIndex];
        trackTitle.textContent = nextDiv.querySelector('.track-title').textContent;
        nextAudio.play();
      } else {
        isPlaying = false;
        playPauseBtn.textContent = '▶️ Play';
      }
    });
  }
}

// Play/pause button
playPauseBtn.addEventListener('click', () => {
  const audio = allTracks[currentTrackIndex];
  if(!audio) return;
  
  if(isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️ Play';
    isPlaying = false;
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸️ Pause';
    isPlaying = true;
  }
});

  });
});

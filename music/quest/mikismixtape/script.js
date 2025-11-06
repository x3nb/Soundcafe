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

// Unlock a track
function unlockNextTrack() {
  if(unlockedTracks < trackDivs.length) {
    const track = trackDivs[unlockedTracks];
    track.classList.remove('hidden');
    track.classList.add('revealed');
    playTrack(unlockedTracks);
    unlockedTracks++;
  }
}

// Play a track by index
function playTrack(index) {
  // Stop others
  allTracks.forEach(a => { a.pause(); a.currentTime = 0; });
  trackDivs.forEach(t => t.classList.remove('playing'));

  currentTrackIndex = index;
  const audio = allTracks[index];
  const trackDiv = trackDivs[index];

  audio.play().then(() => { isPlaying = true; })
       .catch(err => console.warn("Autoplay blocked:", err));

  trackDiv.classList.add('playing');
}

// Auto-advance when a track ends
allTracks.forEach((audio, index) => {
  audio.addEventListener('ended', () => {
    if(index + 1 < unlockedTracks) {
      playTrack(index + 1);
    }
  });
});

// Allow user to click any unlocked track to play/pause
trackDivs.forEach((trackDiv, index) => {
  trackDiv.addEventListener('click', () => {
    if(trackDiv.classList.contains('playing')) {
      allTracks[index].pause();
      trackDiv.classList.remove('playing');
      isPlaying = false;
    } else {
      playTrack(index);
    }
  });
});

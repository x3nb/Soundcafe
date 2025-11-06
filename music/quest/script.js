// -------------------------
// MIKI'S MIXTAPE PORTAL JS
// -------------------------

// Player elements
const playPauseBtn = document.getElementById('play-pause-btn');
const trackTitle = document.getElementById('track-title');

// Unlock button
const unlockBtn = document.getElementById('unlock-btn');

// All track divs and audio elements
const trackDivs = Array.from(document.querySelectorAll('#tracks .track'));
const allTracks = trackDivs.map(track => track.querySelector('audio'));

let currentTrackIndex = -1; // starts with no track
let unlockedTracks = 0;
let isPlaying = false;

// -------------------------
// RIDDLE & UNLOCK LOGIC
// -------------------------

// Example riddles for each track
const riddles = [
  {
    question: "What color are Miki's signature spikes?",
    answer: "yellow"
  },
  {
    question: "Miki loves parallel chases. What does she escape from?",
    answer: "lab"
  },
  {
    question: "Miki wrote an anthem for those who live again in Christ. True or False?",
    answer: "true"
  },
  {
    question: "What is Miki's favorite mode of transport in Parallel Paris?",
    answer: "rift"
  },
  {
    question: "Miki is caged. Does she escape? Yes or No?",
    answer: "yes"
  }
];

// Show riddle prompt and handle response
function askRiddle(trackIndex) {
  const riddle = riddles[trackIndex];
  const userAnswer = prompt(riddle.question + " (Type your answer)");

  if (!userAnswer) {
    // User canceled or left blank, redirect to lore page
    window.location.href = "miki-lore.html"; // <-- replace with actual lore link
    return;
  }

  if (userAnswer.trim().toLowerCase() === riddle.answer.toLowerCase()) {
    unlockTrack(trackIndex);
  } else {
    alert("Hmm, that's not quite right. Learn more about Miki's lore!");
    window.location.href = "miki-lore.html"; // <-- replace with actual lore link
  }
}

// -------------------------
// UNLOCK TRACK & PLAY
// -------------------------
function unlockTrack(index) {
  const trackDiv = trackDivs[index];
  const audio = allTracks[index];

  // Reveal download button
  const downloadBtn = trackDiv.querySelector('.download-btn');
  downloadBtn.classList.remove('hidden');

  // Show pat-on-back message
  const patMsg = trackDiv.querySelector('.pat-msg');
  patMsg.classList.remove('hidden');
  setTimeout(() => {
    patMsg.classList.add('hidden');
  }, 3000);

  // Update unlocked tracks count
  unlockedTracks = index + 1;
  currentTrackIndex = index;

  // Update visible title
  trackTitle.textContent = trackDiv.querySelector('.track-title').textContent;

  // Play audio
  audio.play().then(() => {
    isPlaying = true;
    playPauseBtn.textContent = '⏸️ Pause';
  }).catch(err => console.warn("Autoplay blocked:", err));

  // Listen for track end
  audio.addEventListener('ended', () => {
    if (currentTrackIndex + 1 < unlockedTracks) {
      currentTrackIndex++;
      playTrack(currentTrackIndex);
    } else {
      isPlaying = false;
      playPauseBtn.textContent = '▶️ Play';
    }
  });
}

// -------------------------
// PLAY SELECTED TRACK
// -------------------------
function playTrack(index) {
  const trackDiv = trackDivs[index];
  const audio = allTracks[index];

  // Stop previous track
  allTracks.forEach((t, i) => { if(i !== index) t.pause(); });

  trackTitle.textContent = trackDiv.querySelector('.track-title').textContent;

  audio.play().then(() => {
    isPlaying = true;
    playPauseBtn.textContent = '⏸️ Pause';
  });
}

// -------------------------
// PLAY/PAUSE BUTTON
// -------------------------
playPauseBtn.addEventListener('click', () => {
  if (currentTrackIndex < 0) return; // No track unlocked yet

  const audio = allTracks[currentTrackIndex];

  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️ Play';
    isPlaying = false;
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸️ Pause';
    isPlaying = true;
  }
});

// -------------------------
// INITIAL UNLOCK BUTTON CLICK
// -------------------------
unlockBtn.addEventListener('click', () => {
  if (unlockedTracks === 0) {
    askRiddle(0); // start with first track riddle
  } else if (unlockedTracks < trackDivs.length) {
    askRiddle(unlockedTracks); // ask riddle for next track
  } else {
    alert("All tracks unlocked! Enjoy the mix!");
  }
});



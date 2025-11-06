const unlockBtn = document.getElementById('unlock-btn');
const tracksContainer = document.getElementById('tracks');
const mikiGreeting = document.getElementById('miki-greeting');
const allTracks = document.querySelectorAll('#tracks .track audio');
let currentTrackIndex = 0;
let isPlaying = false;

// Unlock button event
unlockBtn.addEventListener('click', () => {
  tracksContainer.classList.remove('hidden');
  unlockBtn.style.display = 'none';
  mikiGreeting.textContent = "The riffs await. Streaming the continuum...";
  
  playTrack(0); // Start first track
});

// Function to play a given track index
function playTrack(index) {
  // Stop all tracks first
  allTracks.forEach(a => { a.pause(); a.currentTime = 0; });
  
  // Remove previous highlights
  document.querySelectorAll('.track').forEach(track => track.classList.remove('playing'));
  
  // Set current index
  currentTrackIndex = index;
  const currentAudio = allTracks[currentTrackIndex];
  
  // Highlight active track
  currentAudio.closest('.track').classList.add('playing');
  
  // Try to play (browsers need user interaction first)
  currentAudio.play().then(() => {
    isPlaying = true;
  }).catch(err => {
    console.warn("Autoplay blocked, user interaction needed:", err);
  });
}

// Auto-advance logic
allTracks.forEach((audio, index) => {
  audio.addEventListener('ended', () => {
    if (index + 1 < allTracks.length) {
      playTrack(index + 1);
    } else {
      // End of playlist — loop back to start
      playTrack(0);
    }
  });
});

// Allow user to click any track container to play that song
document.querySelectorAll('.track').forEach((track, index) => {
  track.addEventListener('click', () => {
    if (currentTrackIndex === index && isPlaying) {
      allTracks[index].pause();
      track.classList.remove('playing');
      isPlaying = false;
    } else {
      playTrack(index);
    }
  });
});

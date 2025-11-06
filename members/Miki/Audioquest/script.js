const unlockBtn = document.getElementById('unlock-btn');
const tracksContainer = document.getElementById('tracks');
const allTracks = document.querySelectorAll('#tracks .track audio');

unlockBtn.addEventListener('click', () => {
  tracksContainer.classList.remove('hidden');
  unlockBtn.style.display = 'none';
  document.getElementById('miki-greeting').textContent = "The riffs await. Choose your frequency.";
});

// Highlight current playing track & auto-advance
allTracks.forEach((audio, index) => {
  audio.addEventListener('play', () => {
    document.querySelectorAll('.track').forEach(track => track.classList.remove('playing'));
    audio.closest('.track').classList.add('playing');
  });

  audio.addEventListener('ended', () => {
    const next = allTracks[index + 1];
    if (next) {
      next.play();
    }
  });
});

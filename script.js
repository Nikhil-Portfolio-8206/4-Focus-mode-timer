const timerContainer = document.getElementById("timerContainer");

function createTimerElement(hours, minutes, seconds) {
  const timerBox = document.createElement("div");
  timerBox.className = "timer-box";

  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let intervalId = null;

  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer";
  timerDisplay.textContent = formatTime(totalSeconds);

  const playButton = document.createElement("button");
  playButton.className = "play";
  playButton.textContent = "Play";
  playButton.onclick = () => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          timerDisplay.textContent = formatTime(totalSeconds);
        } else {
          clearInterval(intervalId);
          intervalId = null;
          alert("Time's up!");
        }
      }, 1000);
      timerBox.style.backgroundColor = "#FFD700"; // Green when play is clicked 
      playButton.disabled = true; // Disable play button
    }
  };

  const pauseButton = document.createElement("button");
  pauseButton.className = "pause";
  pauseButton.textContent = "Pause";
  pauseButton.onclick = () => {
    clearInterval(intervalId);
    intervalId = null;
    timerBox.style.backgroundColor = "aqua"; // Red when paused
    playButton.disabled = false; // Enable play button
  };

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    clearInterval(intervalId);
    timerBox.remove();
  };

  timerBox.appendChild(timerDisplay);
  timerBox.appendChild(playButton);
  timerBox.appendChild(pauseButton);
  timerBox.appendChild(deleteButton);

  return timerBox;
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function addTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please set a valid time!");
    return;
  }

  const timerElement = createTimerElement(hours, minutes, seconds);
  timerContainer.appendChild(timerElement);

  // Reset input fields
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

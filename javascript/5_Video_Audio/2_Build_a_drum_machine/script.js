const drumPads = document.querySelectorAll('.drum-pad');

drumPads.forEach(pad => {
    pad.addEventListener('click', () => {
        const audio = pad.querySelector('audio');
        if (audio) {
            audio.currentTime = 0; // Reset audio to start
            audio.play();
        }
        const display = document.getElementById('display');
        display.textContent = pad.querySelector('button').getAttribute("id"); // Display the ID of the clicked pad
    });
});

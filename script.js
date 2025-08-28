class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        this.laps = [];

        this.display = document.getElementById('display');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapsList = document.getElementById('lapsList');

        this.bindEvents();
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }

    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateDisplay(), 50);
            this.isRunning = true;

            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;

            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            // Lap button stays enabled even when paused
        }
    }

    reset() {
        clearInterval(this.timerInterval);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.laps = [];

        this.display.textContent = "00:00:00";
        this.updateLapsList();

        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;
    }

    recordLap() {
        const currentTime = this.elapsedTime;
        this.laps.push({
            number: this.laps.length + 1,
            time: currentTime
        });
        this.updateLapsList();
    }

    updateDisplay() {
        this.elapsedTime = Date.now() - this.startTime;
        this.display.textContent = this.formatTime(this.elapsedTime);
    }

    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    }

    updateLapsList() {
        if (this.laps.length === 0) {
            this.lapsList.innerHTML = '<div class="no-laps">No lap times recorded yet</div>';
        } else {
            this.lapsList.innerHTML = this.laps
                .map(
                    lap => `
                <div class="lap-time">
                    <span class="lap-number">Lap ${lap.number}</span>
                    <span class="lap-value">${this.formatTime(lap.time)}</span>
                </div>`
                )
                .join('');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});

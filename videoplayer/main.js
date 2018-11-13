class VideoPlayer {
    constructor() {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = document.querySelector('.progress')
        this.progressBar = this.progress.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player__slider');
    }

    init() {
        // Start plugin
        this.events();
        this.dur();
    }

    events() {
        // All events
        this.video.addEventListener('click', e => this.togglePlay());
        this.toggle.addEventListener('click', e => this.togglePlay());
        this.ranges.forEach(range => range.addEventListener('change', e => this.handleRangeUpdate(e)));
        this.ranges.forEach(range => range.addEventListener('mousemove', e => this.handleRangeUpdate(e)));
        this.skipButtons.forEach(btn => btn.addEventListener('click', e => this.skip(e)));
    }

    togglePlay() {
        // Play/Pause video
        const method = this.video.paused ? 'play' : 'pause';
        this.toggle.textContent = this.video.paused ? '❙❙' : '▶';
        this.video[method]();
        this.video.paused ? clearInterval(tim) : tim;
    }

    handleRangeUpdate(e) {
        this.video[e.target.name] = e.target.value;
    }

    skip(e) {
        // Time skip
        this.video.currentTime += parseFloat(e.target.dataset.skip);
    }

    dur() {
            let tim = setInterval(() => {
                const onePers = (this.video.currentTime * 1) / 100;
                const currentPert = ((onePers * 100 ) / this.video.duration).toFixed(2) * 100;
                this.progress.style.width = currentPert + '%';
                // console.log(currentPert);
                console.log(this.video.duration);
            }, 1000);
        
        
    }

} 

const video = new VideoPlayer();
video.init();



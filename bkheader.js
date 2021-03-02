Vue.component('bk-header', {
   template: `
    <div class="m-3 bg-dark text-white">
        <nav class="navbar navbar-expand-sm navbar-custom navbar-dark bg-dark">
            <a class="navbar-brand h1" href="#">Bella Kitchen</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarTogglerDemo01" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-separator"></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">Contact Us</a></li>
                </ul>
            </div>
            <audio autoplay loop muted id="audio" @play="audioPlayed" @pause="audioPaused">
                <source src="background.mp3" type="audio/mpeg">
                <source src="background.ogg" type="audio/ogg">
                Your browser does not support the video tag.
            </audio>
            <span @click="playMusic" title="Background Music" class="mt-2 fas" style="color: gold;"
                :class="{ 'fa-volume-mute': paused, 'fa-music': !paused }" id="playBtn" ></span>
        </nav>
    </div>
`,
    data() {
        return {
            paused: true
        }
    },
    methods: {
        audioPlayed() {
            this.paused = false;
        },
        audioPaused() {
            this.paused = true;
        },
        playMusic() {
            var a = document.getElementById("audio");
            if (a) {
                if (this.paused) {
                    a.play()
                } else {
                    a.pause()
                }
            }
        }
    }
});

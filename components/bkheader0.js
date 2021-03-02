Vue.component('bk-header', {
   template: `
    <div class="m-3 text-white" style="background-image: url(/images/gray-velvet-fabric-orig.jpg);">
        <nav class="navbar navbar-expand-md navbar-custom navbar-dark">
            <span class="d-none d-md-block"><img style="width:64px; height: 64px;"src="/images/bella-kitchen-logo-transparent.png" alt="logo" /></span>
            <button class="navbar-toggler" type="button" style="padding: 0; border: 0;"
                data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span><img style="width:48px; height: 48px;"src="/images/bella-kitchen-logo-transparent.png" alt="logo" /></span>
            </button>
            <a class="navbar-brand h1" href="#">BELLA KITCHEN</a>
            <div id="navbarTogglerDemo01" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-separator"></li>
                    <li class="nav-item"><a class="nav-link" href="galleries.html">Gallery</a></li>
                    <li class="nav-separator"></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">Contact Us</a></li>
                </ul>
                <audio autoplay loop muted id="audio" @play="audioPlayed" @pause="audioPaused">
                <source src="../audio/background.mp3" type="audio/mpeg">
                <source src="../audio/background.ogg" type="audio/ogg">
                Your browser does not support the video tag.
            </audio>
            <span @click="playMusic" title="Background Music" class="mt-2 fas fa-md" style="color: white;"
                :class="{ 'fa-volume-mute': paused, 'fa-music': !paused }" id="playBtn" ></span>
            </div>
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

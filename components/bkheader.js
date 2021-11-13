Vue.component('bk-header', {
   template: `
   <div>
   <div id="frontHeader" ref="frontHeader"
    v-bind:class="{fixedHeader: !isAtTop, relativeHeader: isAtTop}"
    >
     <div class="d-flex">
        <div class="topleft"></div>
        <div class="top"></div>
        <div class="topright"></div>
    </div>
    <div class="d-flex">
    <div class="left"></div>
    <div class="text-white flex-fill" style="background-image: url(/images/gray-velvet-fabric.jpg);">
        <nav class="navbar navbar-expand-md navbar-custom navbar-dark">
            <span class="d-none d-md-block"><img v-bind:class="{origPicSize: isAtTop, smallPicSize: !isAtTop}"
            src="/images/bella-kitchen-logo-transparent.png" alt="logo" /></span>
            <button class="navbar-toggler" type="button" style="padding: 0; border: 0;"
                data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span><img 
                v-bind:class="{origPicSize: isAtTop, smallPicSize: !isAtTop}"
                src="/images/bella-kitchen-logo-transparent.png" alt="logo" /></span>
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
    <div class="right"></div>
    </div>
    <div class="d-flex">
        <div class="bottomleft"></div>
        <div class="bottom"></div>
        <div class="bottomright"></div>
    </div>
    </div>
    <div id="behindHeader" v-show="!isAtTop" v-bind:style="behindHeaderStyles">&nbsp;</div>
  </div>
`,
    data() {
        return {
            paused: true,
            scrollValue: 0,
            behindHeaderStyles: { width: "100%", display:'none' }
        }
    },
    computed: {
        isAtTop: function () {
            return true; //this.scrollValue < 15;
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
        },
        matchHeight () {
            var heightString = this.$refs.frontHeader.clientHeight + 'px';
            Vue.set(this.behindHeaderStyles, 'height', heightString); 
        },
        scroll () {
            window.onscroll = () => {
                this.scrollValue=window.pageYOffset;
           }
        }
    },
    mounted () {
        this.matchHeight()
        this.scroll();
    },
});

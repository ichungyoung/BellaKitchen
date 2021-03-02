Vue.component('bk-carousel', {
    template:`<section class="m-3 row">
    <div id="demo" class="carousel slide col-12" data-ride="carousel">
    <!-- The slideshow -->
    <div class="carousel-inner">
        <div class="carousel-item active" v-if="gallery.length>0">
            <img :src="gallery[0].src" :alt="gallery[0].title" @click="showGallery(0)">
            <div class="carousel-caption">{{gallery[0].title}}</div>
        </div>
        <div class="carousel-item" v-for="(image, index) in gallery.slice(1)">
            <img :src="image.src" :alt="image.title" @click="showGallery(index+1)">
            <div class="carousel-caption">{{image.title}}</div>
        </div>
    </div>
    <!-- Left and right controls -->
   <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon bg-dark"></span>
    </a>
    <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon bg-dark"></span>
    </a>
<!-- Indicators -->
<!-- <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
    <li data-target="#demo" data-slide-to="3"></li>
</ul> -->
</div></section>`,
    props: {
        gallery: {
            type: Array,
            default: function() { return [];}
        }
    },
    methods: {
        showGallery(index) {
            location.href=`/galleries.html#${index}`
        }  
    },
    data() {
        return {
        }
    }
});
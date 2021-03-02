Vue.component('bk-gallery', {
    template: `<div v-if="gallery && gallery.basePath">
    <h2 class="text-center">
      <span v-for="crumb in breadCrumb">
        <a @click="gotoBreadCrumb(crumb)">{{ crumb.galleryName }}</a> - 
      </span>
      {{gallery.name}}
    </h2>
    <div class="row m-3 justify-content-center">
    <div :class="gridClass" v-for="cab in gallery.images">
      <a class="imglnk" @click="setSubGallery(cab.subGallery)">
      <img class="card-image-top" :src="gallery.basePath+cab.src" 
        style="width: 100%; transition: all .25s ease-out;" alt="card image cap"></a>
      <div class="card-body">
        <div class="card-title">{{ cab.title }}</div>
      </div>
    </div>
</div>
</div>`,
    props: {
      galleryFile: { type: String }
    },
    data() {
        return {
          breadCrumb: [],
          gallery: null,
          currentGalleryFile: '',
          gridClass: 'col-xl-4 col-lg-6',
          bigGridClass: 'col-xl-4 col-lg-6',
          regGridClass: 'col-xl-3 col-lg-4 col-md-6',
          smallGridClass: 'col-xl-2 col-lg-3 col-md-4 col-sm-6',
          tinyGridClass: 'col-xl-1 col-lg-2 col-md-3 col-sm-4 col-xs-6'
        };
    },
    computed: {
    },
    watch: {
      galleryFile: function(newVal, oldVal) {
        this.setDefaultGallery();
      }
    },
    methods: {
      getGalleryJsonFile(file) {
        var fileName = '/data/';
        for (var i=0; i<this.breadCrumb.length; i++) {
          var c = this.breadCrumb[i];
          fileName += c.galleryFile + '/'
        }
        fileName += file + '/gallery.json'
                  console.log(`filename ${fileName}`);
        return fileName;
      },
      getGallery(file) {
        if (file) {
          this.currentGalleryFile = file;
          console.log(`getting ${file}`);
            var myHeaders = new Headers();
            myHeaders.append('pragma', 'no-cache');
            myHeaders.append('cache-control', 'no-cache');
            var myInit = {
              method: 'GET',
              headers: myHeaders,
            };
          fetch( this.getGalleryJsonFile ( file ), myInit )
          .then(res => res.json())
          .then(res => {
            if (res) {
              if (res.gridSize==="tiny") {
                this.gridClass = this.tinyGridClass;
              } else if (res.gridSize==="small") {
                this.gridClass = this.smallGridClass;
              } else if (res.gridSize==="reg") {
                this.gridClass = this.regGridClass;
              } else {
                this.gridClass = this.bigGridClass;
              }
            }
            this.gallery = res;
          });
        }
      },
      addBreadChumb(crumb) {
        this.breadCrumb.push(crumb);
      },
      gotoBreadCrumb(crumb) {
        var lastIdx = -1;
        for(var i=0; i<this.breadCrumb.length; i++) {
          if (crumb.galleryFile===this.breadCrumb[i].galleryFile) {
            lastIdx = i;
            break;
          }
        }
        if (lastIdx>=0) {
          this.breadCrumb.length = lastIdx;
          this.getGallery(crumb.galleryFile);
        }
      },
      setDefaultGallery() {
        this.breadCrumb.length = 0
        this.getGallery(this.galleryFile) 
      },
      setSubGallery(file) {
        if (file) {
          this.addBreadChumb ({galleryName: this.gallery.name, galleryFile: this.currentGalleryFile})
          this.getGallery( file );
        }
      } 
    },
});
Vue.component('bk-gallery', {
    template: `
<div v-if="gallery && gallery.basePath">
  <bk-submenu 
     :items=gallery.images
     :currentSubGalleryFile=currentGalleryFile
     @change-menu=setSubGallery
  ></bk-submenu>
  <div class="row m-3 justify-content-center">
    <div :class="gridClass" v-for="cab in displayGallery.images">
      <a class="imglnk" @click="set3rdSubGallery(cab.subGallery)">
      <img class="card-image-top" :src="displayGallery.basePath+cab.src" 
        style="width: 100%; transition: all .25s ease-out;" alt="card image cap"></a>
      <div class="card-body">
        <div class="card-title">{{ cab.title }}</div>
      </div>
    </div>
  </div>
</div>`,
    props: {
      baseGallery: { type: String },
      gallery: {}
    },
    data() {
        return {
          galleryFile: '',
          currentGalleryFile: '',
          currentSubGallery: null,
          gridClass: 'col-xl-4 col-lg-6',
          bigGridClass: 'col-xl-4 col-lg-6',
          regGridClass: 'col-xl-3 col-lg-4 col-md-6',
          smallGridClass: 'col-xl-2 col-lg-3 col-md-4 col-sm-6',
          tinyGridClass: 'col-xl-1 col-lg-2 col-md-3 col-sm-4 col-xs-6'
        };
    },
    computed: {
      displayGallery() {
        return (this.currentSubGallery ? this.currentSubGallery : this.gallery);
      }
    },
    watch: {
      baseGallery: function(newVal, oldVal) {
        console.log(`bkgallery old=${oldVal} new=${newVal}`)
        this.currentGalleryFile=newVal
        this.galleryFile=newVal
        this.currentSubGallery = null;
        // this.setDefaultGallery();
      }
    },
    methods: {
      getGalleryJsonFile(file) {
        //console.log(`file=${file} baseGallery=${this.baseGallery} galleryFile=${this.galleryFile} currentGalleryFile=${this.currentGalleryFile}`)
        var fileName = '/data';
        if (this.baseGallery!='/') {
          // fileName += `/${this.baseGallery}/`;
          if (this.galleryFile && this.baseGallery!=this.galleryFile) {
            fileName += `/${this.galleryFile}`;
          }
          //console.log(`2nd file=${file} baseGallery=${this.baseGallery} galleryFile=${this.galleryFile} currentGalleryFile=${this.currentGalleryFile}`)
          if (file!=this.galleryFile) {
            fileName += `/${file}`;
            //console.log(`fileName=${fileName} `)
          }
        }
        fileName += '/gallery.json'
        //console.log(`bkgallery filename ${fileName}`);
        return fileName;
      },
      getGallery(file) {
        //console.log(`bkgallery.geGallery ${file}`);
        if (file) {
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
            this.currentSubGallery = res;
            // if (this.currentSubGallery==null) {
              // this.currentSubGallery=this.gallery;
            // }
          })
          .catch( reason => {
            this.currentSubGallery = null;
            //console.error(`fetch failed. reason=${reason}`);
          });
        }
      },
      setDefaultGallery() {
        //console.log(`bkgallery.setDefaultGallery`)
        this.getGallery(this.currentGalleryFile) 
      },
      setSubGallery(file) {
        console.log(`bkgallery.setSubGallery file=${file}`)
        if (file) {
          this.galleryFile=null;
          this.currentGalleryFile=file
          this.currentSubGallery = null;
          this.getGallery( file );
        }
      },
      set3rdSubGallery (file) {
        if (file) {
          console.log(`bkgallery.set3rdSubGallery file=${file}`)
          this.galleryFile=this.currentGalleryFile
          this.getGallery( file );
        }
      }
    },
    mounted() {
      console.log(`bkgallery.mounted: gallery file=${this.baseGallery}`);
      this.currentGalleryFile=this.baseGallery
      //this.setDefaultGallery();
    }
});
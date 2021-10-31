
Vue.component('bk-galleries', {
    template: `<div class="text-center">
    <bk-submenu v-if=gallery
     :items=gallery.images
     :currentSubGalleryFile=selectedGalleryFile
     @change-menu=setSubGallery
    >
    </bk-submenu>
    <bk-gallery v-show=currentSubGallery 
      :base-gallery=selectedGalleryFile
      :gallery=currentSubGallery>
    </bk-gallery>
    <div v-if=gallery class="row m-3 justify-content-center" v-show="!currentSubGallery">
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
      galleriesFile: { type: String }
    },
    data() {
        return {
          gallery: null,
          selectedGalleryFile: null,
          currentSubGallery: null,
          galleries: {},
          gridClass: 'col-xl-4 col-lg-6',
          bigGridClass: 'col-xl-4 col-lg-6',
          regGridClass: 'col-xl-3 col-lg-4 col-md-6',
          smallGridClass: 'col-xl-2 col-lg-3 col-md-4 col-sm-6',
          tinyGridClass: 'col-xl-1 col-lg-2 col-md-3 col-sm-4 col-xs-6'        };
    },
    methods: {
      getGalleryJsonFile(file) {
        var fileName = '/data';
        if (file!='/') {
          fileName += `/${file}`;
        }
        fileName += '/gallery.json'
        console.log(`bkgalleries filename ${fileName}`);
        return fileName;
      },
      async getGallery(file) {
        if (file) {
          console.log(`bkgalleries.getGallery ${file}`);
            var myHeaders = new Headers();
            myHeaders.append('pragma', 'no-cache');
            myHeaders.append('cache-control', 'no-cache');
            var myInit = {
              method: 'GET',
              headers: myHeaders,
            };
          return fetch( this.getGalleryJsonFile ( file ), myInit )
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
            console.log(`bkgalleries got Galleries ${res.name} ${res.breadCrumb}`)
            return res;
          });
        }
      },
      setSubGallery(file, idx) {
        console.log(`bkgalleries.setSubGallery= ${file} idx=${idx}`)
        this.selectedGalleryFile=file
        if (file) {
          //console.log(this.galleries);
          this.currentSubGallery=this.galleries[file];
          //console.log(`currentSubGallery=${this.currentSubGallery}`)
          if (this.currentSubGallery==null) {
            this.getGallery(file)
            .then (
              p => {
                //console.log('bkgalleries.setSubGallery after get gallery')
                this.currentSubGallery=p
                if (this.gallery) {
                  this.$set(this.galleries, file, p); 
                }
                //console.log(this.currentSubGallery)
              }
            )
          } else {
            //this.gallery=this.currentSubGallery;
          }
          //console.log("submenu "+this.currentSubGallery)
        }
      } 
    },
    mounted() {
      console.log(`bkgalleries.mounted() Galleries file=${this.galleriesFile}`)
      this.getGallery(this.galleriesFile)
      .then (
        p => {
          this.gallery=p

          }
       )
    }
});
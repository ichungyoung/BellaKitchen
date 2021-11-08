Vue.component('bk-submenu', {
    template: `
<div class="text-center">
<span class="gallery-crumb"
v-for="img in items" @click="$emit('change-menu', img.subGallery)" :key="img.subGallery"
:style="[ img.subGallery==currentSubGalleryFile ? { 'font-weight': 'bold'} : {}]"
>{{img.title}}</span>
</div>`,
    props: {
        items: [],
        currentSubGalleryFile: ''
    }
});
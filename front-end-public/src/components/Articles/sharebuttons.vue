<template>
  <div class="flex flex-wrap sm:flex-row sm:items-center justify-center gap-2">
    <a :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`" target="_blank" rel="noopener" class="sharebtn">
      <i class="pi pi-twitter text-xl text-blue-500"></i>
    </a>
    <a :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`" target="_blank" rel="noopener" class="sharebtn">
      <i class="pi pi-whatsapp text-xl text-green-500"></i>
    </a>
    <a :href="`https://www.instagram.com/stories/share/?url=${encodeURIComponent(fullUrl)}`" target="_blank" rel="noopener" class="sharebtn">
      <i class="pi pi-instagram text-xl text-pink-500"></i>
    </a>
    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`" target="_blank" rel="noopener" class="sharebtn">
      <i class="pi pi-facebook text-xl text-blue-800"></i>
    </a>
  </div>
</template>

<style>
  .sharebtn{
    @apply flex items-center justify-center w-16 h-12 bg-white transition-all hover:bg-gray-100 rounded-lg shadow-sm;
  }
</style>

<script>
export default {
  computed: {
    fullUrl() {
      return `${window.location.origin}${this.$route.fullPath}`;
    }
  }
}
</script>

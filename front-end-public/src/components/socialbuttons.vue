<template>
  <div class="flex space-x-4">
    <a :href="youtubeLink" :class="buttonClass">
      <i class="pi pi-youtube"></i>
    </a>
    <a :href="instagramLink" :class="buttonClass">
      <i class="pi pi-instagram"></i>
    </a>
    <a :href="facebookLink" :class="buttonClass">
      <i class="pi pi-facebook"></i>
    </a>
    <a :href="emailLink" :class="buttonClass">
      <i class="pi pi-envelope"></i>
    </a>
    <a :href="twitterLink" :class="buttonClass">
      <i class="pi pi-twitter"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    appearance: {
      type: String,
      default: 'transparent',
      validator: value => ['transparent', 'icons', 'background'].includes(value)
    }
  },
  computed: {
    buttonClass() {
      switch (this.appearance) {
        case 'transparent':
          return 'text-gray-500 hover:text-gray-700';
        case 'icons':
          return 'text-gray-500 hover:text-gray-700';
        case 'background':
          return 'bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300';
        default:
          return '';
      }
    },
    youtubeLink() {
      return 'https://www.youtube.com/@SantaMariaVitorias';
    },
    instagramLink() {
      return 'https://www.instagram.com/santamariadasvitorias/';
    },
    facebookLink() {
      return 'https://www.facebook.com/capelasantamariadasvitorias/';
    },
    emailLink() {
      return 'mailto:santamariadasvitorias@gmail.com';
    },
    twitterLink() {
      return 'https://x.com/acsmv';
    }
  }
}
</script>
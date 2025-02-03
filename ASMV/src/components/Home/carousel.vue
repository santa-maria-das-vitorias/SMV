<template>
    <div>
        <slot></slot>

        <button @click="prevImage" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-50 hover:opacity-100">
          &#8592;
          </button>
          <button @click="nextImage" class="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-50 hover:opacity-100">
          &#8594;
          </button>


    </div>



</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        prevImage(){
            console.log('prevImage event triggered');
            this.$emit('prevImage')
        },
        nextImage(){
            console.log('nextImage event triggered');
            this.$emit('nextImage')
        },
    }
}


</script>
<template>
    <div class="flex flex-col items-center w-full md:px-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 w-full mt-20">
            <div class="md:col-span-1 card">
                <h1 class="text-center mt-2"> Categorias de Artigo </h1>
                <div class="flex flex-col items-center mt-10 gap-8">
                  <div v-for="categoria in sampleArticles" :key="artigo.title" class="flex flex-col items-center">
                    
                     <small>{{ categoria.title }}</small> 
                  </div>
              </div>
            </div>
            <div class="md:col-span-2 card">
                <h1 class="text-center mt-2"> Título do Artigo em Questão </h1>
                <div class="flex flex-col items-center mt-10 gap-8">
                  <div  class="flex flex-col items-center">
                    
                     <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ullamcorper purus finibus ante dictum, sed molestie tortor pharetra. Quisque nec aliquam ipsum, ut laoreet nunc. Nunc interdum enim at faucibus interdum. Cras rhoncus lectus porttitor dolor cursus fermentum. In tristique tellus nec tincidunt rutrum. Sed vitae rutrum sapien, in malesuada arcu. Duis facilisis tellus vel ex porta, ut ultricies magna cursus. Etiam non porta nisi, quis pretium mi. Aliquam gravida pulvinar tempor. Quisque quis velit vulputate, venenatis nisl nec, placerat dui. Mauris tellus nibh, sollicitudin ut cursus eget, finibus in tortor.</small>
                  </div>
              </div>
            </div>
            <div class="md:col-span-1 card">
                <h1 class="text-center mt-2"> Artigos recentes </h1>
                <div class="flex flex-col items-center mt-10 gap-8">
                  <div v-for="artigo in sampleArticles" :key="artigo.title" class="flex flex-col items-center">
                    
                     <small>{{ artigo.title }}</small> 
                  </div>
              </div>
            </div>
        </div>
       
    </div>
  </template>

  <script>
    import LatestArticles from "../components/latestarticles.vue";
    import ArticlesCategories from '../components/articlescaterogies.vue';
    
    export default{
        components:{
            LatestArticles,
            
        },
        data() {
            return{
                sampleArticles: [
                    { title: "Como fortalecer a fé no cotidiano", date: new Date('2023-12-01T10:00:00Z'), category:"Vida espiritual" },
                    { title: "A história de São José de Anchieta", date: new Date('2023-11-25T15:30:00Z'), category:"Vida dos santos" },
                    { title: "Santa Maria das Vitórias: Um exemplo de devoção", date: new Date('2023-11-30T08:45:00Z'), category:"História Local" },
                ],      
                
            }
        },
        props:{
            categoria:{
                type: String,
                required: true,
            },
            titulo:{
                type: String,
                required: true,
            },
            




        },
    }

</script>
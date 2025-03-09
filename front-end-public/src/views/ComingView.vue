<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="card-padding prose flex flex-col items-center justify-center mt-10">
      <h1>Em construção...</h1>
      <p>Desde janeiro de 2024 nossa plataforma tem passado por um processo de melhorias e restaurações devido a um ataque hacker.</p>
      <p>Estamos trabalhando arduamente para restaurar a segurança e garantir que a experiência dos nossos leitores e apoiadores seja a melhor possível.</p>
      <p>Pedimos desculpas por qualquer inconveniente e agradecemos sua paciência durante esse período de reestruturação.</p>
      <div class="flex flex-col md:flex-row items-center justify-center gap-2">
        <button @click="redirectHome" class="btn-primary">Voltar ao Início</button>
        <a href="https://www.paypal.com/ncp/payment/TYNYLJQ33BF9U" target="_blank">
          <button>Contribua com uma doação</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectHome() {
      window.location.href = '/';  // Redireciona para a página inicial
    }
  }
}
</script>
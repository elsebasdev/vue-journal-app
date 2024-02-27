
<template>

  <div class="d-flex flex-column justify-content-center">
    <h1 class="align-self-center display-4 ">Bienvenido</h1>
      <span class="fw-bold">Selecciona una noticia</span>
  </div>

  <Fab @on:click="newEntry()"/>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components:{
    Fab: defineAsyncComponent(()=> import('../components/Fab.vue'))
  },
  methods:{
    newEntry(){
      return this.$router.push({ name:'entry' , params: {id: 'new'}});
    }
  }
}
</script>

<style lang="scss" scoped>

div{
  height:100%;
}

</style>
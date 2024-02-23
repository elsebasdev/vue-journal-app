<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
        <span class="text-success fs-3 fw-bold">15</span>
        <span class="mx-1 fs-3">Julio</span>
        <span class="mx-2 fs-4 fw-light ">2021, Jueves</span>
    </div>
    <div>
      <button class="btn btn-danger m-2">
        borrar
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-primary">
        cargar
        <i class="fa-solid fa-upload"></i>
      </button>
    </div>
  </div>
  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea class="form-control" autofocus placeholder="Escribe tu noticia" cols="30" rows="10"></textarea>
  </div>
  <Fab icon="fa-save"/>
  <img src="https://cdn.pixabay.com/photo/2024/01/04/21/54/volcano-8488486_1280.jpg" alt="nueva imagen">
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components:{
    Fab: defineAsyncComponent(()=> import('../components/Fab.vue'))
  }
}
</script>

<style lang="scss" scoped>
textarea{
  font-size: 20px;
  border: none;
  height: 100%;
  &:focus{
    outline: none;
  }
}

img{
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
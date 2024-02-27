<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button @click="$emit('on:click')" class="btn btn-secondary fab">
    <i class="fa-solid"
    :class="icon"></i>
  </button>
</template>

<script>
export default {
  props:{
    icon:{
      type:String,
      default:'fa-plus'

    }
  },

  setup()
  {

    const mesaje = () => console.log("mesaje de prueba")
  
    return{
      mesaje
    }
  }

}

</script>

<style lang="scss" scoped>

.fab{
    width: 64px;
    height: 64px;
    position: fixed;
    right: 32px;
    bottom: 32px;
    border-radius: 100%;
}


</style>
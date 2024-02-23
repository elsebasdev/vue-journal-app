<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div @click="$router.push({name:'entry', params:{id:15}})" 
        class="entry-container mb-3 pointer p-2">
    <div class="entry-title d-flex justify-content-start align-items-center ">
        <span class="text-success fs-5 fw-bold">15</span>
        <span class="mx-1 fs-5 ">Julio</span>
        <span class="mx-2 fw-light ">2021, Jueves</span>
    </div>
    <div class="entry-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, commodi. Placeat exercitationem ipsa quae quibusdam vel ad quisquam cum illum!
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .entry-description{
        padding: 10px;
        border-bottom: 1px solid #a2bad2;
        text-align: justify;
        transition: 2s all ease-in;

        &:hover{
            background-color: lighten($color: grey, $amount: 45);
            transition: 0.2s all ease-out;
        }
    }
</style>
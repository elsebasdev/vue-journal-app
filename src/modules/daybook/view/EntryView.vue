<!-- eslint-disable vue/valid-template-root -->
<template v-if="entry">
  <div 
  class="entry-title d-flex justify-content-between p-2">
    <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light ">{{ year }}</span>
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
    <textarea 
            class="form-control" 
            autofocus 
            placeholder="Escribe tu noticia"
            v-model="entry.text"
      >
    </textarea>
  </div>
  <Fab icon="fa-save"/>
  <img src="https://cdn.pixabay.com/photo/2024/01/04/21/54/volcano-8488486_1280.jpg" alt="nueva imagen">
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {mapGetters} from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'
export default {
  props:{
    id:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      
      entry:null
    }
  },
  components:{
    Fab: defineAsyncComponent(()=> import('../components/Fab.vue'))
  },
  computed:
  {
    ...mapGetters('journal', ['getEntriesbyId']),
    day(){
      const {day} = getDayMonthYear(this.entry.date)
      return day
    },
    month(){
      const {month} = getDayMonthYear(this.entry.date)
      return month
    },
    year(){
      const {year} = getDayMonthYear(this.entry.date)
      return year
    }
  },
  methods:{
    loadEntry(){
      const entry = this.getEntriesbyId(this.id);
      if (!entry) return this.$router.push({name: 'daybook-home'})
      this.entry = entry
    }
  },
  created(){
    this.loadEntry();
  },
  //! observa los cambios de las propiedades (el nombre debe ser el mismo)
  watch:{
    id(){
      this.loadEntry()
    }
  }
}
</script>

<style lang="scss" scoped>

textarea {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #6BAF8D;
  --sb-size: 14px;
}

textarea::-webkit-scrollbar {
  width: var(--sb-size);
  cursor: pointer;
}

textarea::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
  cursor: pointer;
}

textarea::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
  cursor: pointer;
  
}

@supports not selector(::-webkit-scrollbar) {
  textarea {
    scrollbar-color: var(--sb-thumb-color)
                     var(--sb-track-color);
  }
}
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
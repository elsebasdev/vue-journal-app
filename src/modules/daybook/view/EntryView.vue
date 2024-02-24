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

      <input v-show="false"
            type="file" 
            accept="image/*"
            @change="onLoadImage"
            ref="inputselector">

      <button @click="deleteEntry()" 
       class="btn btn-danger m-2"
       :class="this.id === 'new' ? 'disabled':''">
        borrar
        <i class="fa-solid fa-trash"></i>
      </button>
      <button @click="onSelectImage" 
          class="btn btn-primary">
        Cargar foto
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
  <Fab icon="fa-save"
        @on:click="saveEntry"/>
  <img v-if="entry.picture && !localImage" 
    :src="entry.picture" alt="nueva imagen">
  <img 
  v-if="localImage" 
  :src="localImage" alt="nueva imagen">
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {mapActions, mapGetters} from 'vuex'
import uploadImage from '../helpers/uploadImage'
import getDayMonthYear from '../helpers/getDayMonthYear'
import Swal from 'sweetalert2'
export default {
  props:{
    id:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      
      entry:null,
      localImage: null,
      file : null
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
    ...mapActions('journal', ['updateEntries','createEntries','deleteEntries']),
    loadEntry(){
      this.file = null
      this.localImage =null
      let entry;
      if (this.id === 'new') {
        entry = {
          text: 'Escibre aqui!!',
          date: new Date().getTime()
        }
      }else{
        entry = this.getEntriesbyId(this.id);
        if ( !entry ) return this.$router.push({name: 'daybook-home'})

      }
      this.entry = entry
    },
  async saveEntry(){

    new Swal({
        title: 'Espere por favor....',
        allowOutsideClick: true
      })
    Swal.showLoading()
    this.entry.picture = await uploadImage(this.file);
    if(this.entry.id){
      await this.updateEntries(this.entry);  
    }else{
      console.log("nuevo")
      const id = await this.createEntries(this.entry);
      this.$router.push({ name:'entry' , params: { id }});
    }
    Swal.fire('Guardado', 'se guardo correctamente','success')
    this.file = null
        
    },
    async deleteEntry(){
      const {isConfirmed} = await Swal.fire({
        title:'¿estas seguro de eliminar la entrada?',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro'
      })

      if ( isConfirmed) {

        new Swal({
          title:'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading();
        await this.deleteEntries(this.entry.id);
        this.$router.push({ name:'daybook-home'});
        Swal.fire('Eliminado correctamente','','success')
        
      }
    },
    onLoadImage(event){
      this.file = null
      const file = event.target.files[0]

      if (!file){
        this.localImage = null
        this.file = null
        return
      }  
      this.file = file;
      const image = new FileReader()
      image.onload = () => this.localImage = image.result
      image.readAsDataURL( file )
    },
    onSelectImage(){

      this.$refs.inputselector.click()
      //! se hace referencia a un elemento local "campo input file" en este caso

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
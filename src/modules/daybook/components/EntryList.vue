<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
        <input  type="text" 
                class="form-control" 
                placeholder="Buscar entrada"
                v-model="term"
                >
    </div>

    <div class="mt-2 d-flex flex-column">
      <button @click="$router.push({name: 'entry',params:{id:'new'}})"
         class="btn btn-primary mx-3">
        <i class="fa fa-plus-circle"></i>
        nueva entrada  
      </button>
    </div>

    <div class="entry-scrollarea">
        
            <Entry v-for="entry in entriesbyTerm" 
                  :key="entry.id"
                  :entry = entry
            />
        
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {mapGetters} from 'vuex'
export default {
    components:{
        Entry: defineAsyncComponent(()=> import('../components/Entry.vue'))
    },
    computed:{
        ...mapGetters('journal', ['getEntriesbyTerm']),
        entriesbyTerm(){
          return this.getEntriesbyTerm(this.term)
        }
    },
    data(){
      return{
        term:''
      }
    }
}
</script>

<style scoped>

.entry-scrollarea {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #6BAF8D;
  --sb-size: 14px;
}

.entry-scrollarea::-webkit-scrollbar {
  width: var(--sb-size)
}

.entry-scrollarea::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

.entry-scrollarea::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
  
}

@supports not selector(::-webkit-scrollbar) {
  .entry-scrollarea {
    scrollbar-color: var(--sb-thumb-color)
                     var(--sb-track-color);
  }
}
.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: 84vh
}
.entry-scrollarea{
    width: 100%;
    margin-top: 15px;
    height: 78vh;
    overflow: scroll;
}
</style>
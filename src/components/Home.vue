<template>
<div>
    <div class="Home">
      <div class="lander">
        <h1>Scratch</h1>
        <p class="text-muted">A simple note taking app</p>
        <NoteList v-if="isAuthenticated == true" :notes="userNotes"> </NoteList>
      </div>
    </div>
</div>
</template>

<script>
import NoteList from '../components/NoteList.vue';
import { API } from 'aws-amplify';
export default {
  props: ['currentUser', 'isAuthenticated'],
  data(){
    return {
      userNotes: null
    }
  },
  methods: {
    async onLoad(){
      if(this.isAuthenticated == false) {
        return;
      }
      try{
        const notes = await this.loadNotes();
        console.log('notes', notes)
        this.userNotes = notes;
      }
      catch(err){
        console.log('error getting notes', err)
      }
    },
    async loadNotes() {
      return API.get("notes", "notes");
    }
  },
  mounted(){
    this.onLoad()
  },
  components: {
    NoteList
  }
}
</script>

<style scoped>
.Home .lander {
  padding: 80px 0;
  text-align: center;
}

.Home .lander h1 {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}
</style>
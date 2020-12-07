<template>
  <div class="NewNote">
    <div v-if="isLoading == true" class="text-center mt-5">
      <b-spinner variant="primary"></b-spinner>
    </div> 
   <b-form @submit="submitNewNotes" v-if="isLoading == false">
      <b-form-textarea
        id="textarea"
        v-model="content"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
        class="mt-5"
      ></b-form-textarea>
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="handleFileChange"
      ></b-form-file>
      <div class="mt-3">Selected file: {{ file ? file.name : "" }}</div>
      <b-button block type="submit" size="lg" variant="primary"  :disabled="validateForm">Create</b-button>
    </b-form>
  </div>
</template>

<script>
import config from '../awsconfig';
import {API} from 'aws-amplify';
import { s3Upload } from '../libs/s3Lib';

export default {
  data() {
    return {
      content: "",
      isLoading: false,
      setIsLoading: false,
      file: null,
    };
  },
  computed:{
      validateForm(){   
          return this.content.length == 0;
      }
  },
  methods: {
      async submitNewNotes(event){
          event.preventDefault()
          this.isLoading=true;
          try {
              const attachment = this.file ? await s3Upload(this.file): null;
              await this.createNote({content: this.content, attachment})
              this.isLoading = false
              this.$router.push('/')
          }
          catch(err){
              this.isLoading= false
              console.log('err in note submission', err)
          }
      },
      createNote(note) {
          return API.post("notes", "notes", {
              body: note
          })
      },
      handleFileChange(evt) {
          evt.preventDefault();
          console.log('file event', evt)
          if(evt.target.files[0].size > config.MAX_ATTACHMENT_SIZE) {
              alert('FILE TOO BIG')
              return;
          }
      }
  }
};
</script>

<style scoped>
.NewNote form textarea {
  height: 300px;
  font-size: 1.5rem;
}

</style>

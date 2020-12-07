<template>
    <div class="Notes">
        
       
    </div>
</template>

<script>
import { API, Storage } from "aws-amplify";
export default {
    data(){
        return {
            note:"",
            setNote:"",
            file: null
        }
    },
    computed: {
         validateForm(){   
          return this.content.length == 0;
      }
    },
    methods: {
           handleFileChange(evt) {
          evt.preventDefault();
          console.log('file event', evt)
          if(evt.target.files[0].size > config.MAX_ATTACHMENT_SIZE) {
              alert('FILE TOO BIG')
              return;
          }
      },
        async onLoad(){
            try{
                const note = await this.loadNote();
                console.log('note', note)
                const {content, attachment } = note;
                
                if(attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                this.note = content
            }
            catch(err) {
                console.log('err in getting note detail', err)
            }
        },
        async loadNote() {
            return API.get("notes", `notes/${this.$route.params.id}`)
        }
    },
    mounted(){
        this.onLoad()
    }
}
</script>

<style scoped>

</style>
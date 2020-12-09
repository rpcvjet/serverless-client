<template>
  <div class="Notes" >
       <div v-if="isLoading == true || this.isDeleting == true" class="text-center mt-5">
            <b-spinner variant="primary"></b-spinner>
        </div> 
    <b-form @submit="submitUpdateNotes" v-if="isLoading == false" >
      <b-form-textarea
        id="textarea"
        v-model="content"
        rows="5"
        max-rows="6"
        class="mt-5"
      >
      </b-form-textarea>
<b-form-group label="Attachement:" class="mt-5">
    <p>
        <a :href="url" target="_blank">
        {{this.filename}}
        </a>
        </p>
</b-form-group>
       <b-form-file

        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="handleFileChange"
      ></b-form-file>
        <b-button class="mt-3" block type="submit" size="lg" variant="primary"  :disabled="validateForm">Save</b-button>
        <b-button block type="submit" size="lg" variant="danger" @click="handleDelete" >Delete</b-button>
    </b-form>
  </div>
</template>

<script>
import { API, Storage } from "aws-amplify";
import config from '../awsconfig';
import { s3Upload} from '../libs/s3Lib';
export default {
  data() {
    return {
      isLoading: false,
      isDeleting: false,
      content: "",
      note: null,
      setNote: "",
      url:"",
      filename: null,
      file: null,
    };
  },
  computed: {
    validateForm() {
      return this.content.length == 0;
    },
  },
  methods: {
      async submitUpdateNotes(event){
          console.log('event', event)
          let attachment;
          event.preventDefault()
            this.isLoading = true
            try{
                if(this.file) {
                    console.log('file', this.file)
                    attachment = await(s3Upload(this.file))
                }

                await this.updateNote({
                    content: this.content,
                    attachment: attachment || event.attachment
                })
                this.isLoading = false;
                this.$router.push('/')
            }
            catch(err) {
                this.isLoading = false;
                console.log('error in updating', err)
            }
      },
    async handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        )

        if(!confirmed) {
            return;
        }

        this.isDeleting = true
        try {
            await this.deleteNote();
            this.$router.push('/');
            this.isDeleting = false;
        }
        catch(err) {
            console.log('error deleting note', err);
            this.isDeleting = false;
        }
    },
     deleteNote() {
        return API.del(
            "notes", `notes/${this.$route.params.id}`
        )
    },
    updateNote(note){
        return API.put("notes", `notes/${this.$route.params.id}`, {
            body: note
        });
    },

    handleFileChange(evt) {
      evt.preventDefault();
      console.log("file event", evt);
      if (evt.target.files[0].size > config.MAX_ATTACHMENT_SIZE) {
        alert("FILE TOO BIG");
        return;
      }
    },

    async onLoad() {
      try {
        const note = await this.loadNote();
        const { content, attachment } = note;
        this.note = note
        console.log("content", content);
        console.log('attachment', attachment)

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
          this.url = note.attachmentURL
        }
        this.content = content;
        this.filename =  attachment
      } catch (err) {
        console.log("err in getting note detail", err);
      }
    },
    async loadNote() {
      return API.get("notes", `notes/${this.$route.params.id}`);
    },
  },
  mounted() {
    this.onLoad();
  },
};
</script>

<style scoped>
.NewNote form textarea {
  height: 300px;
  font-size: 1.5rem;
}
</style>

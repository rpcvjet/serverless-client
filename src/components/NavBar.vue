<template>
    <div>
  <b-navbar toggleable="md" type="light" variant="light">
      <router-link to="/">
    <b-navbar-brand class="font-weight-bold text-muted mb-3">Scratch</b-navbar-brand>
      </router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <router-link v-if="signedIn == false" to="/signup">Signup</router-link>
        <router-link v-if="signedIn == false" class="ml-3" to="/login">Login</router-link>
        <button @click="logOut" v-if="signedIn == true" class="ml-3">Logout</button>
      
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
  import { Auth } from 'aws-amplify';
  export default {
  props: ['currentUser', 'isAuthenticated'],
  data(){
    return {
    }
  },
   computed: {
     signedIn() {
      return this.isAuthenticated;
     }
   },
   methods:{
    async logOut() {
      await Auth.signOut();
      this.$emit('loggingOut', false);
     }
   }
    
}
</script>

<style scoped>

</style>
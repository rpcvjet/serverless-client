<template>
  <div id="app">
    <b-container class="">
      <NavBar :currentUser="this.currentUser" :isAuthenticated="isAuthenticated" @loggingOut="logout"> </NavBar>
      <router-view @loggedinUser="setCurrentUser" :currentUser="this.currentUser" :isAuthenticated="isAuthenticated"   />
    </b-container>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import NavBar from "./components/NavBar.vue";
import { Auth } from 'aws-amplify';
export default {
  name: "App",
  data(){
    return {
      isAuthenticated: false,
      currentUser: {}
    }
  },
  methods: {
     setCurrentUser(event) {
       this.currentUser = event;
       this.$emit('loggedInUser', event)
       this.isAuthenticated = true
       this.$emit('isAuthenticated', this.isAuthenticated)
    },
    logout(event) {
      this.isAuthenticated = false;
      this.$router.push('/login')
    },
    async onLoad(){
      try {
         await Auth.currentSession();
          this.isAuthenticated = true;
      }
      catch(err) {
        if (err == 'No current user') {
        // this.$router.push('/login')
      }
        console.log('on load error', err)
        this.isAuthenticated = false;
      }
    }
  },
  created() {
    this.onLoad()
  },
  components: {
    Home,
    NavBar,
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: "Open Sans", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "PT Serif", serif;
}

select.form-control,
textarea.form-control,
input.form-control {
  font-size: 1rem;
}
input[type="file"] {
  width: 100%;
}
</style>

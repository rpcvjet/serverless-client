<template>
  <div id="app" >
    <b-container class="" >
    <NavBar> </NavBar>
    </b-container>
   <router-view/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    Home,
    NavBar
  }
}
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

h1, h2, h3, h4, h5, h6 {
  font-family: "PT Serif", serif;
}

select.form-control,
textarea.form-control,
input.form-control {
  font-size: 1rem;
}
input[type=file] {
  width: 100%;
}
</style>

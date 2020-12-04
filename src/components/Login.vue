<template>
  <div class="Login">
    <div v-if="isloading" class="text-center">
      <b-spinner variant="primary"></b-spinner>
    </div>

    <b-form @submit="Login" v-if="isloading == false">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="validateForm"
        >Login</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  props: ['currentUser'],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loggedIn: false,
      loginRequest: false,
    };
  },
  computed: {
    validateForm() {
      if (this.form.email.length > 0 && this.form.password.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    isloading() {
      if (this.loginRequest == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async Login(evt) {
      this.loginRequest = true;
      evt.preventDefault();
      try {
        let user = await Auth.signIn(this.form.email, this.form.password);
        console.log('logged in user', user)
        this.loginRequest = false
        this.$emit('loggedinUser', user)
        this.$router.push('/')
      } catch (e) {
        alert(e.message);
         this.loginRequest = false

      }
    },
  },
};
</script>

<style scoped>
@media all and (min-width: 480px) {
  .Login {
    padding: 60px 0;
  }

  .Login form {
    margin: 0 auto;
    max-width: 320px;
  }
}
</style>

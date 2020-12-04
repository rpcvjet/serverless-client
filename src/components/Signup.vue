<template>
  <div class="Signup">
    <div v-if="isLoading" class="text-center">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <b-form @submit="SignUp" v-if="this.newUser == null">
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
        >Signup</b-button
      >
    </b-form>

    <!-- CONFIRMATION PAGE -->
    <b-form v-else>
      <b-form-group
        id="input-group-3"
        label="Confirmation Code:"
        label-for="input-3"
        description="Please enter the confirmation code."
      >
        <b-form-input
          id="input-3"
          autofocus
          v-model="form.confirmationCode"
          required
          placeholder="Enter confirmation code"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="validateConfirmation"
       @click="handleConfirmation" >Confirm</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  props: ["currentUser"],
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
      },
      signedIn: false,
      isLoading: false,
      newUser: null,
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
    validateConfirmation() {
      if (this.form.confirmationCode.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async SignUp(evt) {
      this.isLoading = true;
      evt.preventDefault();
      try {
        const user = await Auth.signUp(this.form.email, this.form.password);
        this.newUser = user;
        console.log("this.newUser", this.newUser);
        this.isLoading = false;
      } catch (e) {
        alert(e.message);
        this.isLoading = false;
        this.newUser = null;
      }
    },
    async handleConfirmation(event) {
      event.preventDefault();
      this.isLoading = true;
      try{

        await Auth.confirmSignUp(this.form.email, this.form.confirmationCode);
        const user = await Auth.signIn(this.form.email, this.form.password);
        this.$emit('loggedinUser', user)
        this.$router.push('/');
      }
      catch(err) {
        console.log('err handling confirmation', err);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
@media all and (min-width: 480px) {
  .Signup {
    padding: 60px 0;
  }

  .Signup form {
    margin: 0 auto;
    max-width: 320px;
  }
}
</style>

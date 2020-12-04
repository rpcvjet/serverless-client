<template>
  <div class="Signup">
    <b-form @submit="SignUp">
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
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
props:['currentUser'],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      signedIn: false,
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
  },
  methods: {
    async SignUp(evt) {
      evt.preventDefault();
      try {
        const newUser = await Auth.signUp(this.form.email, this.form.password);
        alert("this new user signed up -> ", newUser);
        this.$router.push('/login');
      } catch (e) {
        alert(e.message);
      }
    },
    // async isUserSignedIn() {
    //     try {
    //         const userObject = Auth.currentAuthenticatedUser();
    //         this.signedIn = true
    //         console.log('user object', userObject)
    //     }
    //     catch(err){
    //         this.signedIn = false;
    //         console.log('not signed in err', err)
    //     }
    // }
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

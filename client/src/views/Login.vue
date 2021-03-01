<template>
  <div class="login">

    <v-img src='../assets/notes.jpg' id='bgpic'></v-img>

    <v-container class='fill-height d-flex flex-row justify-center align-center' id='mainSection'>
      <v-row id='red'>
        <v-col>

          <h1 class="my-3">Logovanje</h1>

          <v-form ref='form' v-model='valid' lazy-validation>
            <v-text-field
              v-model='email' 
              label='E-mail' 
              required
              solo
              light
              flat
              :rules="[rules.requiredEmail,rules.emailRules]"
              class="rounded-0"
            ></v-text-field>
            <v-text-field
              v-model='password' 
              label='Lozinka' 
              required
              solo
              light
              flat
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              v-on:keyup.enter="validate"
              :rules="[rules.requiredPass,rules.lengthPass]"
              class="rounded-0"
            ></v-text-field>
            <v-alert dense outlined type="error" v-if="this.errorMessage">{{this.errorMessage}}</v-alert>
            <v-btn @click='validate' class='mb-5 rounded-0'>Logovanje</v-btn>
          </v-form>

          <h3>Nemate nalog? Registrujte se.</h3>
          <v-btn to='/registration' class='my-4 rounded-0'>Registracija</v-btn>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data(){
    return{
      show: false,
      errorMessage: '',
      email:'',
      password:'',
      valid: true,
      rules: {
        requiredEmail: value => !!value || 'Morate uneti email.',
        emailRules: value => /.+@.+\..+/.test(value) || 'Email nije validno unesen.',
        requiredPass: value => !!value || 'Morate uneti lozinku.',
        lengthPass: value => value.length >= 6 || 'Lozinka mora imati najmanje 6 karaktera.'
      }
    }
  },
  created(){
    if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== ''){
        this.$router.push('/');
      }
  },
  methods: {
    validate(){
      if(this.$refs.form.validate()){
        axios
        .post('/api/auth', {
          email: this.email,
          password: this.password
        })
        .then( res => {
          if(res.status == 200){
            localStorage.setItem('token', res.data.token);
            this.$router.push('/');
          }
        })
        .catch( error => {
          if(error.response){
            this.errorMessage = error.response.data;
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #bgpic{
    height: 100vh;
    opacity: 0.75;
    position: relative;
    z-index: 1;
  }
  #mainSection{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    #red{
      background-image: linear-gradient(to bottom right, #8FBC8F, #69ccab);
      max-width: 600px;
    }
  }
  .v-application .error--text{
    color: #fff!important;
  }
</style>
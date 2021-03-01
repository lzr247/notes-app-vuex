<template>
  <div class="registration">

    <v-img src='../assets/notes.jpg' id='bgpic'></v-img>

    <v-container class='fill-height d-flex flex-row justify-center align-center' id='mainSection'>
      <v-row id='red'>
        <v-col >
          <h1 class="my-3">Registracija</h1>
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
              v-model='name' 
              label='Ime' 
              required
              solo
              light
              flat
              :rules="[rules.requiredName,rules.nameRules]"
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
              :rules="[rules.requiredPass,rules.lengthPass]"
              class="rounded-0"
            ></v-text-field>
            <v-text-field
              v-model='password2' 
              label='Ponovite lozinku' 
              required
              solo
              light
              flat
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :rules="[rules.requiredPass,rules.lengthPass,rules.passwordSame]"
              class="rounded-0"
            ></v-text-field>
            <v-btn @click="validate" class='mb-5 rounded-0'>Registracija</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Registration',
  data(){
    return{
      show: false,
      show2: false,
      email:'',
      name:'',
      password:'',
      password2:'',
      valid: true,
      rules: {
        requiredEmail: value => !!value || 'Morate uneti email.',
        emailRules: value => /.+@.+\..+/.test(value) || 'Email nije validno unesen.',
        requiredPass: value => !!value || 'Morate uneti lozinku.',
        lengthPass: value => value.length >= 6 || 'Lozinka mora imati najmanje 6 karaktera.',
        passwordSame: value => {return value === this.password || 'Lozinke nisu iste.'},
        requiredName: value => !!value || 'Morate uneti ime.',
        nameRules: value => value.length >=3 || 'Ime mora biti duže od 3 karaktera.'
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
        .post('/api/users', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then( res => {
          if(res.status == 201){
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
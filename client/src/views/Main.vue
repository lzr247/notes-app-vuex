<template>
    <div class="main">

        <v-app-bar flat app color="#41B883">
            <span class='text-uppercase font-weight-bold text-h6'>
                {{this.name}} - Beleške
            </span>
            <v-spacer></v-spacer>
            <v-btn @click="logout" text color='#000'>
                <span>Odjava</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols='12'>
                        <NewNote/>
                    </v-col>
                    <v-col cols='12'>
                        <Notes/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import axios from 'axios';
import NewNote from '../components/NewNote';
import Notes from '../components/Notes';
export default {
    name: 'Main',
    components:{
        NewNote,
        Notes
    },
    data(){
        return{
            name: '',
        }
    },
    created(){
        if(localStorage.getItem('token') === null || localStorage.getItem('token') == ''){
            this.$router.push('/login');
        }
    },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/login');
        }
    },
    mounted(){
        axios.get('/api/users/me', {
            headers: { token: localStorage.getItem('token')}
        })
        .then( res => {
            this.name = res.data[0].name;
            this.id = res.data[0]._id;
        })
        .catch( error => {
          if(error.response){
            console.log(error.response.data)
          }
        })
    },
};
</script>

<style lang="scss" scoped>
    .main{
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        line-height: 1.6;
        background: #b4dac8;
        min-height: 100vh;
    }

    #input-9{
        color: black!important;
    }
</style>
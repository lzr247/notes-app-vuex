<template>
    <div class='NewNote'>
        <h1>Nova beleška</h1>
        <v-form ref='form' v-model='valid' lazy-validation>
            <v-text-field
                v-model='title' 
                label='Naslov' 
                solo
                light
                :rules="[rules.requiredTitle, rules.titleLength]"
                class="rounded-0"
            ></v-text-field>
            <v-textarea
                v-model='content'
                label="Sadržaj beleške"
                solo           
                counter
                :rules="[rules.requiredContent]"
                class='rounded-0'
                outlined
                color="white"
            ></v-textarea>
            <v-btn @click="btnAddNote">
                Unesi belešku
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'NewNote',
    data() {
        return {
            valid:true,
            title:'',
            content:'',
            rules: {
                requiredTitle: value => !!value || 'Morate uneti naslov beleške.',
                requiredContent: value => !!value || 'Morate uneti sadržaj beleške.',
                titleLength: value => value.length <= 30 || 'Naslov ne sme biti duži od 30 karaktera.'
            }
        };
    },
    methods: {
        ...mapActions(['addNote']),
        btnAddNote(){
            if(this.$refs.form.validate()){
                const data = {
                    title: this.title,
                    content: this.content
                }
                this.addNote(data);
                this.title = '';
                this.content = '';
                this.$refs.form.resetValidation()
            }  
        },
    },
};
</script>
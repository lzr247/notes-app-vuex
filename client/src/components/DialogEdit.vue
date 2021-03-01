<template>
    <div class='DialogEdit'>
        <v-dialog v-model="dialogEdit" persistent max-width="700px">
            <v-card>
                <v-card-title>Izmena beleške</v-card-title>
                <v-divider></v-divider>
                <v-card-actions class="d-flex flex-column justify-center d-sm-flex flex-sm-column justify-sm-space-around">
                    <v-form ref='form2' v-model='valid2' lazy-validation style="width:90%;">
                        <v-text-field
                        v-model='updatedTitle' 
                        solo
                        light
                        flat
                        outlined
                        class="rounded-0"
                        
                        ></v-text-field>
                        <v-textarea
                        v-model='updatedContent'
                        solo
                        label=""
                        class="rounded-0"
                        ></v-textarea>
                        <v-btn color="#E9C46A" class="black--text mt-3 mt-sm-0 mb-1 rounded-0" @click="btnEditNote()">Izmeni belešku</v-btn>
                    </v-form>
                    <v-btn color="#E9C46A" class="black--text my-3 rounded-0" @click="closeDialogs">Nazad</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'DialogEdit',
    data() {
        return {
            valid2:true,
            updatedTitle:'',
            updatedContent: '',
        };
    },
    methods: {
        ...mapActions(['editNote','closeDialogs']),
        btnEditNote(){
            if(this.$refs.form2.validate()){
                const data = {
                    id: this.modalDataEdit._id,
                    title: this.updatedTitle,
                    content: this.updatedContent
                }
                this.editNote(data);
            }
        },
    },
    computed: {
        ...mapGetters(['dialogEdit','modalDataEdit']),
    },
    watch:{
        modalDataEdit: function(){
            this.updatedTitle = this.modalDataEdit.title,
            this.updatedContent = this.modalDataEdit.content
        }
    }
};
</script>
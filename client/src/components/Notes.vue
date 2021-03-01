<template>
    <div class='Notes'>

        <h1>Vaše beleške</h1>
        <v-alert dense type="info" v-if="notesArray.length==0">Niste uneli nijednu belešku.</v-alert>
        <div v-for="(item,index) in notesArray" :key='index' class="mb-4 py-4 flex-column justify-space-between align-center d-sm-flex flex-sm-row justify-sm-space-between align-sm-center" style="background-color:#41B883">
            <v-btn class="ml-0 ml-sm-5 pa-4 my-3 my-sm-0 font-weight-bold rounded-0" @click="btnOpenDialogShow(item)" style="cursor:pointer;background-color:#E8F7F0;">{{item.title}}</v-btn> 
            <div>
                <v-btn @click="btnOpenDialogEdit(item)" class='mx-4 rounded-0'>Izmeni</v-btn>
                <v-btn @click="btnDeleteNote(item._id)" class='rounded-0 mr-5'>X</v-btn>
            </div>
        </div>

        <Snackbar/>

        <DialogEdit/>

        <DialogShow/>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DialogShow from './DialogShow';
import DialogEdit from './DialogEdit';
import Snackbar from  './Snackbar';
export default {
    name: 'Notes',
    components:{
        DialogShow,
        DialogEdit,
        Snackbar
    },
    mounted() {
        this.fetchNotes();
    },
    methods: {
        ...mapActions(['fetchNotes', 'deleteNote', 'openDialogShow','openDialogEdit']),
        btnDeleteNote(id){
            const data = {
                id: id
            }
            this.deleteNote(data);
        },
        btnOpenDialogEdit(data){
            this.openDialogEdit(data);
        },
        btnOpenDialogShow(data){
            data.content = data.content.trim();
            this.openDialogShow(data);
        },
    },
    computed: {
        ...mapGetters(['notesArray']),
    }
};
</script>
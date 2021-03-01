import axios from 'axios';

const state = {
    notesArray: [],
    snackbar: false,
    responseData:'',
    dialogShow: false,
    modalDataShow:{},
    dialogEdit:false,
    modalDataEdit:{},

};

const getters = {
    notesArray: (state) => state.notesArray,
    snackbar: (state) => state.snackbar,
    responseData: (state) => state.responseData,
    dialogShow: (state) => state.dialogShow,
    modalDataShow: (state) => state.modalDataShow,
    dialogEdit: (state) => state.dialogEdit,
    modalDataEdit: (state) => state.modalDataEdit
};

const actions = {
    async fetchNotes({ commit }){
        const response = await axios.get('/api/notes', {headers: { token: localStorage.getItem('token')}});
        commit('setNotes', response.data);
    },
    async addNote({ commit }, data){
        const response = await axios.post('/api/notes', 
        {
            headers: { token: localStorage.getItem('token')},
            data: data
        });
        commit('setNotes', response.data);
        commit('setSnackbar', true);
        commit('setSnackbarText', 'Uspešno ste uneli novu belešku.');
        setTimeout(() => {
            commit('setSnackbar', false);
        }, 2000);
    },
    async deleteNote({ commit }, data){
        const response = await axios.delete('/api/notes',
        {
            headers: { token: localStorage.getItem('token')},
            data: data
        });
        commit('setNotes', response.data);
        commit('setSnackbar', true);
        commit('setSnackbarText', 'Uspešno ste izbrisali belešku.');
        setTimeout(() => {
            commit('setSnackbar', false);
        }, 2000);
    },
    async editNote({ commit } ,data){
        const response = await axios.put('/api/notes',
        {
            headers: { token: localStorage.getItem('token')},
            data:data
        });
        commit('setNotes', response.data);
        commit('setSnackbar', true);
        commit('setSnackbarText', 'Uspešno ste izmenili belešku.');
        commit('dialogEdit', false);
        setTimeout(() => {
            commit('setSnackbar', false);
        }, 2000);
    },
    async openDialogShow({ commit }, data){
        commit('modalDataShow', data);
        commit('dialogShow', true);
    },
    async openDialogEdit({ commit }, data){
        commit('modalDataEdit', data);
        commit('dialogEdit', true);
    },
    async closeDialogs({ commit }){
        commit('dialogShow', false);
        commit('dialogEdit', false);
    },
    async closeSnackbar({ commit }) {
        commit('setSnackbar', false);
    }
};

const mutations = {
    setNotes: (state, notes) => (state.notesArray = notes),
    setSnackbar: (state, snackbar) => (state.snackbar = snackbar),
    setSnackbarText: (state, snackbarText) => (state.responseData = snackbarText),
    dialogShow: (state, dialogShow) => (state.dialogShow = dialogShow),
    modalDataShow: (state, modalDataShow) => (state.modalDataShow = modalDataShow),
    dialogEdit: (state, dialogEdit) => (state.dialogEdit = dialogEdit),
    modalDataEdit: (state, modalDataEdit) => (state.modalDataEdit = modalDataEdit),
};

export default {
    state,
    getters,
    actions,
    mutations
}
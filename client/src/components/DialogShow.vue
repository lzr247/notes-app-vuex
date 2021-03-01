<template>
    <div class="DialogShow">
        <v-dialog v-model="dialogShow" persistent max-width="700px">
            <v-card style="overflow:hidden!important;">
                <v-card-title>{{modalDataShow.title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-actions class="d-flex flex-column justify-center d-sm-flex flex-sm-column justify-sm-space-around">
                <v-card-text class="text-left my-5 py-5">
                    <pre>
                        {{modalDataShow.content}}
                    </pre>  
                </v-card-text>
                <v-btn color="#E9C46A" class="black--text my-3" @click="closeDialogs">Nazad</v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ModalShow',
    methods: {
        ...mapActions(['closeDialogs']),
    },
    computed: {
        ...mapGetters(['dialogShow','modalDataShow']),
    }
};
</script>
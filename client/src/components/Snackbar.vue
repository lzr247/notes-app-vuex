<template>
    <div class='Snackbar'>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            >
            {{ responseData }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="#E9C46A"
                text
                v-bind="attrs"
                @click="closeSnackbar"
                >
                Zatvori
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Snackbar',
    data() {
        return {
            timeout: 2000,
        };
    },
    methods: {
        ...mapActions(['closeSnackbar'])
    },
    computed:{
        ...mapGetters(['snackbar', 'responseData'])
    }
};
</script>
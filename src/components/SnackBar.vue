<template>
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="error"
        v-if="type=='error'"
      >
        {{ text }}
  
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        v-else
      >
        {{ text }}
  
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>

<script>
export default {
    props: ['snackBarInfo'],
    data: function(){
        return {
            snackbar: this.snackBarInfo.show,
            text: this.snackBarInfo.message,
            timeout: this.snackBarInfo.timeout,
            type: this.snackBarInfo.type
        }
    },
    methods:{

    }
}
  </script>
<template>
    <v-container fluid>
      <v-row>
        <v-col
            cols="12"
          sm="12"
          md="12"
        >
            <v-expansion-panels>
                <v-expansion-panel v-for="i in items" :key="i" @change="test(i)">
                    <v-expansion-panel-header disable-icon-rotate>
                        Item
                        <template v-slot:actions>
                            <v-icon color="teal">
                                mdi-check
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
      </v-row>
      {{open}}
    </v-container>
</template>

<script>
    export default {
        data(){
            return {
                open:false,
                items:[1,2,3]
            }
        },
        methods:{
            test(value){
                console.log(value)
            }
        }
    }
</script>


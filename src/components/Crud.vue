<template> 
  <div>
    <v-data-table
        :headers="crudData.headers"
        :items="rows"
        sort-by="calories"
        class="elevation-1"
        dense
    >
        <template v-slot:[`top`]>
        <v-toolbar
            flat
        >
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
            <template v-slot:[`activator`]="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                >
                Nuevo
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                     <v-container>
                        <v-row>
                            
                            <v-col 
                                :cols="field.customSize.cols"
                                :sm="field.customSize.sm"
                                :md="field.customSize.md"
                                v-for="(field, i) in crudData.headers" v-bind:key="i">

                                <v-text-field
                                    v-model="editedItem[field.value]"
                                    v-if="field.customVisible"
                                    :label="field.text"
                                ></v-text-field>

                            </v-col>
                            <!-- <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.name"
                                label="Dessert name"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.calories"
                                label="Calories"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.fat"
                                label="Fat (g)"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.carbs"
                                label="Carbs (g)"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.protein"
                                label="Protein (g)"
                                ></v-text-field>
                            </v-col> -->
                        </v-row>
                    </v-container> 
                    
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">¿Está seguro de eliminar este registro?</v-card-title>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
            mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
            mdi-delete
        </v-icon>
        </template>
        <template v-slot:[`no-data`]>
        <v-btn
            color="primary"
            @click="initialize"
        >
            Reset
        </v-btn>
        </template>
    </v-data-table>
    <div class="text-center pt-2">
        <v-pagination
            v-model="page"
            :length="pageCount"
        ></v-pagination>
    </div>
    
  </div>
</template>

<script>
  export default {
    props:{
        crudData:Object,
        slotEditedItem: Object
    },
    data: () => ({
        page: 1,
        pageCount: 10,
        dialog: false,
        dialogDelete: false,
        rows:[],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {}
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      crudData: function () {
        this.rows = this.crudData.rows;
      },
    },

    created () {
      this.initialize();
      this.editedItem = this.crudData.editedItem;
      this.defaultItem = this.crudData.defaultItem;
      this.rows = this.crudData.rows;
    },

    methods: {
      initialize () {
        
      },

      editItem (item) {
        this.editedIndex = this.rows.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.rows.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.rows.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          //this.editedItem = Object.assign({}, this.slotEditedItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {

        //Object.assign(this.editedItem, this.slotEditedItem)

        if (this.editedIndex > -1) {
          Object.assign(this.rows[this.editedIndex], this.editedItem)
        } else {
          this.rows.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
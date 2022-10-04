<template>
    <v-container fluid>
      <v-alert
        border="left"
        colored-border
        color="primary accent-4"
        elevation="2"
      >
         
        <v-row>
          <v-col cols="1">
            <strong>Username: </strong>
          </v-col>
          <v-col cols="2">
            {{user_info.username}}
          </v-col>
          <v-col cols="1">
            <strong>Estado: </strong>
          </v-col>
          <v-col cols="2">
            {{user_info.status_code_text}}
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="1">
            <strong>Nombres: </strong>
          </v-col>
          <v-col cols="2">
            {{user_info.first_name}}
          </v-col>
          <v-col cols="1">
            <strong>Apellidos: </strong>
          </v-col>
          <v-col cols="2">
            {{user_info.last_name}}
          </v-col>
        </v-row>
        <v-row class="light--text">
          <v-col cols="1" class="mt-1">
            <strong>Administrador: </strong> 
          </v-col>
          <v-col cols="1">
            <v-checkbox
              v-model="user_info.is_superuser"
              disabled
              dense
            ></v-checkbox>
          </v-col>
        </v-row>

      </v-alert>

      <v-data-table
        :headers="headers"
        :items="rows"
        
        class="elevation-1"
        :hide-default-footer="true"
        dense
        :loading="loading"
  
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
  
      >
        <template v-slot:[`top`]>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Asignacion de grupos</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
  
            <v-col
              cols="12"
              sm="2"
              md="2"
            >
            <v-select
              :items="[10,15,25,50,100,500]"
              v-model="itemsPerPage"
            ></v-select>
            </v-col>
            
  
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="700px"
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
  
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
  
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="initialize"
                >
                  <v-icon
                  >
                    mdi-magnify
                  </v-icon>
                </v-btn>
                
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>

                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="back"
                >
                  <v-icon
                  >
                    {{icons.mdiArrowLeftCircle }}
                  </v-icon>
                </v-btn>
            
              
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
                      v-model="formValid"
                      
                    >
                      <v-row>
                        
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-autocomplete
                            :items="list_groups"
                            v-model="editedItem.group_id"
                            item-value="id" 
                            item-text="name"
                            label="Grupo"
                            dense
                            :rules="rules.requiered"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-form>
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
            @click="deleteItem(item)"
            color="error"
          >
            mdi-delete
          </v-icon>
        </template>
  
        <template v-slot:[`no-data`]>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Refrescar
          </v-btn>
        </template>
  
        <template
          v-for="header in headers.filter((header) =>
            header.hasOwnProperty('formatter')
          )"
          v-slot:[`item.${header.value}`]="{ value }"
        >
          {{ header.formatter(value) }}
        </template>
      </v-data-table>
  
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
  
    </v-container>
  </template>
  
  <script>
  
  import { mdiMagnify } from '@mdi/js';
  import { mdiArrowLeftCircle } from '@mdi/js';
  
  import axios from 'axios';
    export default {
      data: () => ({
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        formValid:true,
        rules: {
          requiered:[
            //v => !!v || 'Campo requerido',
            v => ( String(v).trim() != "" ) || 'Campo requerido',
          ],
          numRequired:[
            v => (!isNaN(parseFloat(v))) || 'Campo requerido',
          ]
        },
        user_info:{
          id:"",
          username:"",
          first_name:"",
          last_name:"",
          is_superuser:false,
          status_code_text:""
        },
        list_groups:[],
        token:"",
        loading:false,
        dialog: false,
        dialogDelete: false,
        headers: [
          { text: 'Grupo', value: 'name' , sortable: true},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
          id: 0,
          user_id:0,
          group_id:0,
          status_code:1
        },
        defaultItem: {
          id: 0,
          user_id:0,
          group_id:0,
          status_code:1
        },
        icons:{
          mdiMagnify,
          mdiArrowLeftCircle
        },
        
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Asignar nuevo grupo' : 'Editar'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.editedItem.user_id = this.$route.params.id;
        this.initialize()
      },
  
      methods: {
        initialize () {
          this.token = localStorage.controlProyectosToken;
          let $this = this;
          this.loading = true;

          axios.get("/user/"+this.editedItem.user_id, {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
            $this.user_info = Object.assign({}, res.data)
            console.log($this.user_info)
            $this.loading = false;
          }).catch(function(err){
            console.log(err)
          })
  
          axios.get("/user-group/"+this.editedItem.user_id, {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
            $this.rows = res.data.data;
            $this.loading = false;
          }).catch(function(err){
            console.log(err)
          })

          axios.get("/group", {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
            $this.list_groups = res.data.data;
            $this.loading = false;
          }).catch(function(err){
            console.log(err)
          })
        },

        back(){
          this.$router.push({ name: "user" })
        },

        deleteItem (item) {
          this.editedIndex = this.rows.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.rows.splice(this.editedIndex, 1)
          this.closeDelete();
  
          this.loading = true;
          let $this = this;
          axios.delete("/user-group/" + this.editedItem.id,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
            $this.initialize();
          }).catch(function(err){
            console.log(err)
          })
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.$refs.form.resetValidation();
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.editedItem.user_id = this.$route.params.id;
          })
        },
  
        save () {
          let $this = this;
          this.$refs.form.validate()
          if(!this.formValid){
            return;
          }

          this.loading = true;
          axios.post("/user-group/",this.editedItem,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
            $this.editedItem.user_id = $this.$route.params.id;
            $this.initialize();
          }).catch(function(err){
            console.log(err)
          })

          this.close()
        },
      },
    }
  </script>
  
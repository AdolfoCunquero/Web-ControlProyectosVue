<template>
    <v-container>
      <v-card
        elevation="2"
        class="mx-auto"
        style="padding:20px;"
      >
        <vue-toastr ref="mytoast"></vue-toastr>
        <v-alert
          border="left"
          colored-border
          color="primary accent-4"
          elevation="1"
        >
          
          <v-row>
            <v-col cols="1">
              <strong>Proyecto: </strong>
            </v-col>
            <v-col cols="4">
              {{project_info.project_name}}
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
              <v-toolbar-title>Asignacion de proyectos</v-toolbar-title>
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
                              :items="list_users"
                              v-model="editedItem.user_id"
                              item-value="id" 
                              item-text="full_name"
                              label="Usuario"
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
      </v-card>
    </v-container>
  </template>
  
  <script>
  
  import { mdiMagnify } from '@mdi/js';
  import { mdiArrowLeftCircle } from '@mdi/js';
  import VueToastr from "vue-toastr";
  
  import axios from 'axios';
    export default {
      components: { 
        "vue-toastr": VueToastr,
        VueToastr, 
      },
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
        project_info:{
          id:0,
          project_name:"",
          status_code_text:""
        },
        list_users:[],
        token:"",
        loading:false,
        dialog: false,
        dialogDelete: false,
        headers: [
          { text: 'Username', value: 'username' , sortable: true},
          { text: 'Nombre', value: 'first_name' , sortable: true},
          { text: 'Apellidos', value: 'last_name' , sortable: true},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
          id:0,
          user_id:0,
          project_id:0,
          status_code:1
        },
        defaultItem: {
          id:0,
          user_id:0,
          project_id:0,
          status_code:1
        },
        icons:{
          mdiMagnify,
          mdiArrowLeftCircle
        },
        
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Asignar nuevo usuario' : 'Editar'
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
        this.token = this.$session.get("token");
        this.initialize()
      },
  
      methods: {
        validateError(err){
          console.log(err);
          if(err.response.status == 401){
            localStorage.selectedItem = 0;
            this.$session.destroy();
            this.$router.push({name:"login"});
          }
        },
        showNotification(msg, type) {
          this.$refs.mytoast.defaultProgressBar = false;
          this.$refs.mytoast.defaultTimeout = 3000; 
          this.$refs.mytoast.defaultPosition = "toast-top-center";
          if(type == "error"){
              this.$refs.mytoast.e(msg);
          }else if(type =="success"){
              this.$refs.mytoast.s(msg);
          }
        },
        initialize () {
          this.editedItem.project_id = this.$route.params.id;
          let $this = this;
          this.loading = true;

          axios.get("/project/"+this.editedItem.project_id, {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
            $this.project_info = Object.assign({}, res.data)
            $this.loading = false;
          }).catch(function(err){
            $this.showNotification("Ocurrio un error","error");
            $this.validateError(err);
          })

          axios.get("/user-project/project/"+this.editedItem.project_id, {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
            $this.rows = res.data.data;
            $this.loading = false;
          }).catch(function(err){
            $this.showNotification("Ocurrio un error","error");
            $this.validateError(err);
          })

          axios.get("/user/catalog", {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
            $this.list_users = res.data.data;
            $this.loading = false;
          }).catch(function(err){
            $this.showNotification("Ocurrio un error","error");
            $this.validateError(err);
          })
        },

        back(){
          this.$router.push({ name: "project" })
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
          axios.delete("/user-project/" + this.editedItem.id,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
            $this.initialize();
          }).catch(function(err){
            $this.showNotification("Ocurrio un error","error");
            $this.validateError(err);
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
            this.editedItem.project_id = this.$route.params.id;
          })
        },
  
        save () {
          let $this = this;
          this.$refs.form.validate()
          if(!this.formValid){
            return;
          }

          this.loading = true;
          axios.post("/user-project/",this.editedItem,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
            $this.editedItem.project_id = $this.$route.params.id;
            $this.initialize();
          }).catch(function(err){
            $this.showNotification("Ocurrio un error","error");
            $this.validateError(err);
          })

          this.close()
        },
      },
    }
  </script>
  
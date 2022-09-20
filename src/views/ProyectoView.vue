<template>
  <v-container fluid>
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
      <template v-slot:[`header.project_name`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.project_name ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="filters.project_name"
              class="pa-4"
              type="text"
              label="Nombre de proyecto"
              :autofocus="true"
            ></v-text-field>
            <v-btn
              @click="filters.project_name = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`header.business_name`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.business_name ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="filters.business_name"
              class="pa-4"
              type="text"
              label="Nombre cliente"
              :autofocus="true"
            ></v-text-field>
            <v-btn
              @click="filters.business_name = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`header.start_date`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.start_date ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="filters.start_date"
              class="pa-4"
              type="text"
              label="Fecha inicio"
              :autofocus="true"
            ></v-text-field>
            <v-btn
              @click="filters.start_date = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`header.end_date`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.end_date ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="filters.end_date"
              class="pa-4"
              type="text"
              label="Fecha fin"
              :autofocus="true"
            ></v-text-field>
            <v-btn
              @click="filters.end_date = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`header.real_start_date`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.real_start_date ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="filters.real_start_date"
              class="pa-4"
              type="text"
              label="Fecha real inicio"
              :autofocus="true"
            ></v-text-field>
            <v-btn
              @click="filters.real_start_date = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`header.real_end_date`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.real_end_date ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-text-field
              v-model="filters.real_end_date"
              class="pa-4"
              type="text"
              label="Fecha real fin"
              :autofocus="true"
            ></v-text-field>
            <v-btn
              @click="filters.real_end_date = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`header.status_code_text`]="{ header }">
        {{ header.text }}
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters.status_code.toString() ? 'primary' : ''">
                mdi-filter
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">

          <v-radio-group v-model="filters.status_code">
            <v-radio
              v-for="n in list_status"
              :key="n.value"
              :label="n.description"
              :value="n.value"
            ></v-radio>
          </v-radio-group>
          
            <!-- <v-text-field
              v-model="filters.status_code"
              class="pa-4"
              type="text"
              label="Estado"
              :autofocus="true"
            ></v-text-field> -->
            <v-btn
              @click="filters.status_code = ''"
              small
              text
              color="primary"
              class="ml-2 mb-2"
            >Limpiar</v-btn>
          </div>
        </v-menu>
      </template>

      <template v-slot:[`top`]>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Proyectos</v-toolbar-title>
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
                        <v-text-field
                          v-model="editedItem.project_name"
                          label="Nombre proyecto"
                          dense
                          :rules="rules.requiered"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        class="d-flex"
                        cols="12"
                        sm="12"
                      >
                        <v-autocomplete
                          :items="clients"
                          v-model="editedItem.client_id"
                          item-value="id" 
                          item-text="business_name"
                          label="Cliente"
                          dense
                          :rules="rules.numRequired"
                        ></v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                      >
                        <v-menu
                          v-model="menuStartDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.start_date"
                              label="Fecha inicio"
                              prepend-icon="mdi-calendar"
                              readonly
                              dense
                              v-bind="attrs"
                              v-on="on"
                              :rules="rules.requiered"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.start_date"
                            @input="menuStartDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                      >
                        <v-menu
                          v-model="menuEndDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.end_date"
                              label="Fecha fin"
                              prepend-icon="mdi-calendar"
                              readonly
                              dense
                              v-bind="attrs"
                              v-on="on"
                              :rules="rules.requiered"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.end_date"
                            @input="menuEndDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                      >
                        <v-menu
                          v-model="menuRealStartDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.real_start_date"
                              label="Fecha real inicio"
                              prepend-icon="mdi-calendar"
                              readonly
                              dense
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.real_start_date"
                            @input="menuRealStartDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                      >
                        <v-menu
                          v-model="menuRealEndDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.real_end_date"
                              label="Fecha real fin"
                              prepend-icon="mdi-calendar"
                              readonly
                              dense
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.real_end_date"
                            @input="menuRealEndDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <!-- <v-checkbox
                          v-model="editedItem.status_code"
                          label="Estado"
                          @change="editedItem.status_code ? editedItem.status_code=1 : editedItem.status_code=0"
                        ></v-checkbox> -->

                        <v-autocomplete
                          :items="list_status"
                          v-model="editedItem.status_code"
                          item-value="value" 
                          item-text="description"
                          label="Estado"
                          dense
                          :rules="rules.numRequired"
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
          class="mr-2"
          @click="editItem(item)"
          color="primary"
        >
          mdi-pencil
        </v-icon>
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

      menuStartDate: false,
      menuEndDate: false,
      menuRealStartDate: false,
      menuRealEndDate: false,
      token:"",
      loading:false,
      clients:[],
      filters : {
        project_name:"",
        business_name: "",
        start_date:"",
        end_date:"",
        real_start_date:"",
        real_end_date:"",
        status_code:""
      },
      list_status :[],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'ID', align: 'start', sortable: true, value: 'id'},
        { text: 'Nombre proyecto', align: 'start', sortable: true, value: 'project_name'},
        { text: 'Nombre cliente', align: 'start', sortable: true, value: 'business_name'},
        { text: 'Fecha inicio', value: 'start_date', sortable: false },
        { text: 'Fecha fin', value: 'end_date', sortable: false },
        { text: 'Fecha real inicio', value: 'real_start_date', sortable: false },
        { text: 'Fecha real fin', value: 'real_end_date',  sortable: false },
        { text: 'Estado', value: 'status_code_text' , sortable: false},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rows: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        client_id:null,
        project_name:"",
        start_date: "",
        end_date :"",
        real_start_date :"",
        real_end_date:"",
        status_code : 1
      },
      defaultItem: {
        id: 0,
        client_id:null,
        project_name:"",
        start_date: "",
        end_date :"",
        real_start_date :"",
        real_end_date:"",
        status_code : 1
      },
      icons:{
        mdiMagnify
      },
      
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo proyecto' : 'Editar proyecto'
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
      this.initialize()
    },

    methods: {
      initialize () {
        this.token = localStorage.controlProyectosToken;
        let $this = this;
        this.loading = true;

        let params = this.getQueryStringParams()
        console.log(params)

        axios.get("/project?"+params, {headers:{Authorization:"Bearer "+this.token}}).then(function(res){
          $this.rows = res.data.data;
          $this.loading = false;
          console.log(res.data.total_pages);
        }).catch(function(err){
          console.log(err)
        })

        axios.get("/client",{headers:{Authorization:"Bearer "+this.token}}).then(function(res){
          $this.clients = res.data.data;
        }).catch(function(err){
          console.log(err)
        })

        axios.get("/catalog/project/status_code",{headers:{Authorization:"Bearer "+this.token}}).then(function(res){
          $this.list_status = res.data.data;
        }).catch(function(err){
          console.log(err)
        })

      },

      changePage(page){
        this.filters.page = page;
        this.initialize();
      },  

      getQueryStringParams(){
        let params = []
        let $this = this;
        Object.keys(this.filters).forEach(function(item){ 
          if($this.filters[item].toString()){
            params.push(item+"="+ $this.filters[item]) 
          }
        })
        console.log($this.filters)
        return params.join("&&")
      },

      editItem (item) {
        this.editedIndex = this.rows.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.formValid = true;
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
        console.log(this.editedItem)
        axios.delete("/project/" + this.editedItem.id,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
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
        })
      },

      save () {
        let $this = this;

        this.$refs.form.validate()

        if(!this.formValid){
          return;
        }

        if (this.editedIndex > -1) {
          
          axios.put("/project/"+this.editedItem.id,this.editedItem,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
            $this.initialize();
          }).catch(function(err){
            console.log(err)
          })
          Object.assign(this.rows[this.editedIndex], this.editedItem)

        } else {
          this.loading = true;
          axios.post("/project",this.editedItem,{headers:{Authorization:"Bearer "+this.token}}).then(function(){
            $this.initialize();
          }).catch(function(err){
            console.log(err)
          })

        }
        this.close()
      },
    },
  }
</script>

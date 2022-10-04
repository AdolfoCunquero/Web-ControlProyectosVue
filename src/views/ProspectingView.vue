<template>
    <v-container fluid>

      <FormTitle title="Prospecciones"></FormTitle>

      <v-row 
        class="mt-4 mb-2"
      >
        <v-col
          cols="12"
          sm="12"
          md="12"
        >
          <v-autocomplete
            :items="list_project"
            v-model="editedItem.project_id"
            item-value="id" 
            item-text="project_name"
            label="Proyecto"
            solo
            @change="loadGrid"
          ></v-autocomplete>

        </v-col>
      </v-row>


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
        <template v-slot:[`header.description`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.description ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.description"
                class="pa-4"
                type="text"
                label="Descripcion"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.description = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>
  
        <template v-slot:[`header.date_prospecting`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.date_prospecting ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.date_prospecting"
                class="pa-4"
                type="text"
                label="Fecha"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.date_prospecting = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>
  
        <template v-slot:[`header.initial_offer`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.initial_offer ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.initial_offer"
                class="pa-4"
                type="text"
                label="Propuesta inicial"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.initial_offer = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>
  
        <template v-slot:[`header.final_offer`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.final_offer ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.final_offer"
                class="pa-4"
                type="text"
                label="Propuesta final"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.final_offer = ''"
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
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  :disabled="buttonsEnabled"
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
                  class="mb-2"
                  @click="loadGrid"
                  :disabled="buttonsEnabled"
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
                            v-model="editedItem.description"
                            label="Descripcion"
                            dense
                            :rules="rules.requiered"
                          ></v-text-field>
                        </v-col>
  
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
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
                                v-model="editedItem.date_prospecting"
                                label="Fecha"
                                prepend-icon="mdi-calendar"
                                readonly
                                dense
                                v-bind="attrs"
                                v-on="on"
                                :rules="rules.requiered"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.date_prospecting"
                              @input="menuEndDate = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.initial_offer"
                            label="Propuesta inicial"
                            dense
                            :rules="rules.requiered"
                          ></v-text-field>
                        </v-col>


                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.final_offer"
                            label="Propuesta final"
                            dense
                            :rules="rules.requiered"
                          ></v-text-field>
                        </v-col>
  
                       
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                        
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
            :disabled="buttonsEnabled"
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
import FormTitle from '@/components/FormTitle.vue';
    export default {
    data: () => ({
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        formValid: true,
        menuEndDate: false,
        list_project: [],
        rules: {
            requiered: [
                //v => !!v || 'Campo requerido',
                v => (String(v).trim() != "") || "Campo requerido",
            ],
            numRequired: [
                v => (!isNaN(parseFloat(v))) || "Campo requerido",
            ]
        },
        token: "",
        loading: false,
        filters: {
            description: "",
            date_prospecting: "",
            initial_offer: "",
            final_offer: "",
            status_code: ""
        },
        list_status: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "Descripcion", align: "start", sortable: true, value: "description" },
            { text: "Fecha", align: "start", sortable: true, value: "date_prospecting" },
            { text: "Oferta inicial", align: "start", sortable: true, value: "initial_offer" },
            { text: "Oferta final", align: "start", sortable: true, value: "final_offer" },
            { text: "Estado", value: "status_code_text", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            project_id: 0,
            description: "",
            date_prospecting: "",
            initial_offer: "",
            final_offer: "",
            status_code: 1
        },
        defaultItem: {
            id: 0,
            project_id: 0,
            description: "",
            date_prospecting: "",
            initial_offer: "",
            final_offer: "",
            status_code: 1
        },
        icons: {
            mdiMagnify
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nueva oferta" : "Editar oferta";
        },
        buttonsEnabled() {
            return this.editedItem.project_id == null || this.editedItem.project_id == 0;
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },
    created() {
        this.initialize();
    },
    methods: {
        loadGrid() {
            let $this = this;
            if (!this.editedItem.project_id) {
                return;
            }
            axios.get("/prospecting/project/" + this.editedItem.project_id, { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.rows = res.data.data;
                $this.loading = false;
            }).catch(function (err) {
                console.log(err);
            });
        },
        initialize() {
            this.token = localStorage.controlProyectosToken;
            let $this = this;
            this.loading = true;
            axios.get("/project", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.list_project = res.data.data;
                $this.loading = false;
            }).catch(function (err) {
                console.log(err);
            });
            axios.get("/catalog/prospecting/status_code", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.list_status = res.data.data;
            }).catch(function (err) {
                console.log(err);
            });
        },
        changePage(page) {
            this.filters.page = page;
            this.initialize();
        },
        getQueryStringParams() {
            let params = [];
            let $this = this;
            Object.keys(this.filters).forEach(function (item) {
                if ($this.filters[item].toString()) {
                    params.push(item + "=" + $this.filters[item]);
                }
            });
            return params.join("&&");
        },
        editItem(item) {
            this.editedIndex = this.rows.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.formValid = true;
        },
        deleteItem(item) {
            this.editedIndex = this.rows.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.rows.splice(this.editedIndex, 1);
            this.closeDelete();
            this.loading = true;
            let $this = this;
            console.log(this.editedItem);
            axios.delete("/prospecting/" + this.editedItem.id, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                $this.loadGrid();
            }).catch(function (err) {
                console.log(err);
            });
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                let tmpId = this.editedItem.project_id;
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.$refs.form.resetValidation();
                this.editedItem.project_id = tmpId;
            });
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                let tmpId = this.editedItem.project_id;
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.editedItem.project_id = tmpId;
            });
        },
        save() {
            let $this = this;
            this.$refs.form.validate();
            if (!this.formValid) {
                return;
            }
            if (this.editedIndex > -1) {
                axios.put("/prospecting/" + this.editedItem.id, this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                    $this.loadGrid();
                }).catch(function (err) {
                    console.log(err);
                });
                Object.assign(this.rows[this.editedIndex], this.editedItem);
            }
            else {
                this.loading = true;
                axios.post("/prospecting", this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                    $this.loadGrid();
                }).catch(function (err) {
                    console.log(err);
                });
            }
            this.close();
        },
    },
    components: { FormTitle }
}
  </script>
  
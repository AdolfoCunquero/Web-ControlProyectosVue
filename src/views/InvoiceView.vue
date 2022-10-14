<template>
    <v-container>

      <FormTitle title="Facturas"></FormTitle>

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
        <template v-slot:[`header.no_dcto`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.no_dcto ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.no_dcto"
                class="pa-4"
                type="text"
                label="No. Documento"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.no_dcto = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>

        <template v-slot:[`header.serie_dcto`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.serie_dcto ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.serie_dcto"
                class="pa-4"
                type="text"
                label="Serie Documento"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.serie_dcto = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>

        <template v-slot:[`header.amount`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.amount ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.amount"
                class="pa-4"
                type="text"
                label="Monto"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.amount = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>
  
        <template v-slot:[`header.date_invoice`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.date_invoice ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.date_invoice"
                class="pa-4"
                type="text"
                label="Fecha pago"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.date_invoice = ''"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >Limpiar</v-btn>
            </div>
          </v-menu>
        </template>
  
        <template v-slot:[`header.proposed_payment_date`]="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="filters.proposed_payment_date ? 'primary' : ''">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-text-field
                v-model="filters.proposed_payment_date"
                class="pa-4"
                type="text"
                label="Fecha propuesta pago"
                :autofocus="true"
              ></v-text-field>
              <v-btn
                @click="filters.proposed_payment_date = ''"
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
                            v-model="editedItem.no_dcto"
                            label="No. Documento"
                            dense
                          ></v-text-field>
                        </v-col>
                        
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.serie_dcto"
                            label="Serie Documento"
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.amount"
                            label="Monto"
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-menu
                            v-model="menuDateInvoice"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.date_invoice"
                                label="Fecha factura"
                                prepend-icon="mdi-calendar"
                                readonly
                                dense
                                v-bind="attrs"
                                v-on="on"
                                :rules="rules.requiered"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.date_invoice"
                              @input="menuDateInvoice = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>


                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-menu
                            v-model="menuDateProposedPayment"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.proposed_payment_date"
                                label="Fecha propuesta pago"
                                prepend-icon="mdi-calendar"
                                readonly
                                dense
                                v-bind="attrs"
                                v-on="on"
                                :rules="rules.requiered"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.proposed_payment_date"
                              @input="menuDateProposedPayment = false"
                            ></v-date-picker>
                          </v-menu>
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
        menuDateProposedPayment: false,
        menuDateInvoice: false,
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
            no_dcto: "",
            serie_dcto: "",
            amount: 0,
            date_invoice: "",
            proposed_payment_date: "",
            status_code: ""
        },
        list_status: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "No. Documento", align: "start", sortable: true, value: "no_dcto" },
            { text: "Serie Documento", align: "start", sortable: true, value: "serie_dcto" },
            { text: "Monto", align: "start", sortable: true, value: "amount" },
            { text: "Fecha pago", align: "start", sortable: true, value: "date_invoice" },
            { text: "Fecha propuesta pago", align: "start", sortable: true, value: "proposed_payment_date" },
            { text: "Estado", value: "status_code_text", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            project_id: 0,
            no_dcto: "",
            serie_dcto: "",
            amount: 0,
            date_invoice: "",
            proposed_payment_date: "",
            status_code: 1
        },
        defaultItem: {
            id: 0,
            project_id: 0,
            no_dcto: "",
            serie_dcto: "",
            amount: 0,
            date_invoice: "",
            proposed_payment_date: "",
            status_code: 1
        },
        icons: {
            mdiMagnify
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nueva factura" : "Editar factura";
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
        this.token =  this.$session.get("token");
        this.initialize();
    },
    methods: {
        loadGrid() {
            let $this = this;
            if (!this.editedItem.project_id) {
                return;
            }
            this.loading = true;
            axios.get("/invoice/project/" + this.editedItem.project_id, { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.rows = res.data.data;
                $this.loading = false;
            }).catch(function (err) {
                console.log(err);
            });
        },
        initialize() {
            let $this = this;
            this.loading = true;
            axios.get("/project/catalog", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.list_project = res.data.data;
                $this.loading = false;
            }).catch(function (err) {
                console.log(err);
            });
            axios.get("/catalog/invoice/status_code", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
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
            axios.delete("/invoice/" + this.editedItem.id, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
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
                axios.put("/invoice/" + this.editedItem.id, this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                    $this.loadGrid();
                }).catch(function (err) {
                    console.log(err);
                });
                Object.assign(this.rows[this.editedIndex], this.editedItem);
            }
            else {
                this.loading = true;
                axios.post("/invoice", this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
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
  
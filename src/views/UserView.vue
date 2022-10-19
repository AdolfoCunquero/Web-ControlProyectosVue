<template>
    <v-container>
      
      <FormTitle title="Usuarios"></FormTitle>

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
                            v-model="editedItem.username"
                            label="Username"
                            dense
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
  
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.first_name"
                            label="Nombres"
                            dense
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.last_name"
                            label="Apellidos"
                            dense
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                            <v-checkbox
                                dense
                                v-model="editedItem.is_superuser"
                                label="Administrador"
                            ></v-checkbox>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                          <v-autocomplete
                            :items="list_status"
                            v-model="editedItem.status_code"
                            item-value="value" 
                            item-text="description"
                            label="Estado"
                            dense
                            :rules="[rules.numRequired]"
                          ></v-autocomplete>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                        >
                            <v-text-field
                                v-if="editedIndex == -1"
                                v-model="editedItem.password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                label="Password"
                                hint="Minimo 8 caracteres"
                                counter
                                dense
                                @click:append="show1 = !show1"
                            ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                          
                        >
                            <v-text-field
                                v-if="editedIndex == -1"
                                v-model="editedItem.re_password"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min, passwordEqual]"
                                :type="show2 ? 'text' : 'password'"
                                label="Confirmar Password"
                                hint="Minimo 8 caracteres"
                                counter
                                dense
                                @click:append="show2 = !show2"
                            ></v-text-field>
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

          <v-btn
            small
            color="default"
            class="ma-2"
            @click="assingGroups(item.id)"
          >
            Grupos
            <v-icon
              right
              dark
            >
            {{icons.mdiAccountGroup }}
            </v-icon>
          </v-btn>

        </template>

        <template v-slot:[`item.is_superuser`]="{ item }">
            <v-simple-checkbox
            v-model="item.is_superuser"
            disabled
            ></v-simple-checkbox>
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
  import { mdiAccountGroup } from '@mdi/js';
  
  import axios from 'axios';
import FormTitle from '@/components/FormTitle.vue';
    export default {
    data: () => ({
        show1: false,
        show2: false,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        formValid: true,
        rules: {
            required: value => !!value || "Campo requerido",
            min: v => v.length >= 8 || "Min 8 caracteres",
            numRequired: v => (!isNaN(parseFloat(v))) || "Campo requerido",
        },
        token: "",
        loading: false,
        filters: {},
        list_status: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "ID", align: "start", sortable: true, value: "id" },
            { text: "Username", align: "start", sortable: true, value: "username" },
            { text: "Nombres", align: "start", sortable: true, value: "first_name" },
            { text: "Apellidos", align: "start", sortable: true, value: "last_name" },
            { text: "Administrador", align: "start", sortable: true, value: "is_superuser" },
            { text: "Estado", value: "status_code_text", sortable: false },
            { text: "Actions",  value: "actions", sortable: false },
        ],
        rows: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            username: "",
            first_name: "",
            last_name: "",
            is_superuser: false,
            password: "",
            re_password: "",
            status_code: 1
        },
        defaultItem: {
            id: 0,
            username: "",
            first_name: "",
            last_name: "",
            is_superuser: false,
            password: "",
            re_password: "",
            status_code: 1
        },
        icons: {
            mdiMagnify,
            mdiAccountGroup
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo usuario" : "Editar usuario";
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
        passwordEqual(v) {
            if (v != this.editedItem.password) {
                return "Las contraseñas no coinciden";
            }
            return true;
        },
        assingGroups(id) {
            this.$router.push({ name: "user-group", params: { id: id } });
        },
        initialize() {
            let $this = this;
            this.loading = true;
            //let params = this.getQueryStringParams()
            axios.get("/user", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.rows = res.data.data;
                $this.loading = false;
            }).catch(function (err) {
                console.log(err);
            });
            axios.get("/catalog/auth_user/status_code", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
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
            axios.delete("/user/" + this.editedItem.id, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                $this.initialize();
            }).catch(function (err) {
                console.log(err);
            });
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.$refs.form.resetValidation();
            });
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        save() {
            let $this = this;
            this.$refs.form.validate();
            if (!this.formValid) {
                return;
            }
            if (this.editedIndex > -1) {
                this.editedItem.password = "test";
                axios.put("/user/" + this.editedItem.id, this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                    $this.initialize();
                }).catch(function (err) {
                    console.log(err);
                });
                Object.assign(this.rows[this.editedIndex], this.editedItem);
            }
            else {
                this.loading = true;
                axios.post("/user", this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                    $this.initialize();
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
  
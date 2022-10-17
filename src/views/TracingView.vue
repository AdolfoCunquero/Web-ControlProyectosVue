<template>
    <v-container>
      <FormTitle title="Seguimientos"></FormTitle>
      <v-row 
        class="mt-4 mb-2"
      >
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <v-autocomplete
            :items="list_project"
            v-model="projectId"
            item-value="id" 
            item-text="project_name"
            label="Proyecto"
            solo
            @change="changeProject"
          ></v-autocomplete>

        </v-col>
      
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <v-autocomplete
            :items="list_stage"
            v-model="stageId"
            item-value="id" 
            item-text="stage_name"
            label="Etapa"
            solo
            @change="loadTasks"
          ></v-autocomplete>

        </v-col>
      </v-row>
      
      <v-alert
        border="left"
        colored-border
        color="indigo lighten-2"
        elevation="2"
        v-if="tasks.length > 0"
        >
        <div class="text-h6 active">
            Tareas
        </div>
    </v-alert>

    <v-expansion-panels>
        <v-expansion-panel v-for="task in tasks" :key="task.id" @click="filterData(task.id)" >
            <v-expansion-panel-header disable-icon-rotate>
                {{task.task_name}}
            
                <template v-slot:actions>
                    <span class="text--secondary">
                        {{task.status_code_text}}
                    </span>

                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    
                    <v-icon v-if="task.status_code == 1" color="teal">
                        mdi-checkbox-blank-circle-outline 
                    </v-icon>

                    <v-icon v-if="task.status_code == 2" color="teal">
                        mdi-progress-wrench 
                    </v-icon>

                    <v-icon v-if="task.status_code == 3" color="teal">
                        mdi-check-circle 
                    </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row no-gutters>
                    <v-col cols="12" md="12">
                        <v-alert
                            border="top"
                            colored-border
                            type="info"
                            elevation="2"
                            v-if="task.description.trim() != ''"
                            >
                            {{task.description}}
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
                                                        <v-textarea
                                                            v-model="editedItem.description"
                                                            label="Descripcion"
                                                            dense
                                                            :rules="rules.requiered"
                                                        ></v-textarea>
                                                    </v-col>
                                                    
                                                    <v-col
                                                        cols="12"
                                                        sm="12"
                                                        md="12"
                                                    >
                                                    
                                                    <v-autocomplete
                                                        :items="list_status"
                                                        v-model="editedItem.tracing_type"
                                                        item-value="value" 
                                                        item-text="description"
                                                        label="Tipo seguimiento"
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

                            <template v-slot:[`item.tracing_type`]="{ item }">
                                <v-chip
                                    :color="getChipColor(item.tracing_type)"
                                    dark
                                >
                                    {{ item.tracing_type_text }}
                                </v-chip>
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
                            >
                            </v-pagination>
                        </div>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  
    </v-container>
  </template>
  
<script>
  
import { mdiMagnify } from '@mdi/js';
  
import axios from 'axios';
import FormTitle from '@/components/FormTitle.vue';
    export default {
    data: () => ({
        tasks:[],
        selectedTaskId:0,
        projectId:0,
        stageId:0,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        formValid: true,
        menuStartDate: false,
        menuEndDate: false,
        menuStartRealDate: false,
        menuEndRealDate: false,
        list_project: [],
        list_stage: [],
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
        filters: {},
        list_status: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "Fecha seguimiento", align: "start", sortable: true, value: "tracing_date" },
            { text: "Descripcion", align: "start", sortable: true, value: "description" },
            //{ text: "Tipo", value: "tracing_type_text", sortable: false },
            { text: "Tipo", value: "tracing_type", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],
        rows: [],
        allRows:[],
        editedIndex: -1,
        editedItem: {
            id: 0,
            task_id: 0,
            project_id: 0,
            tracing_type: 0,
            description: "",
            prerequisites: "",
            status_code:1
        },
        defaultItem: {
            id: 0,
            task_id: 0,
            project_id: 0,
            tracing_type: 0,
            description: "",
            prerequisites: "",
            status_code:1
        },
        icons: {
            mdiMagnify
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nueva tarea" : "Editar tarea";
        },
        buttonsEnabled() {
            return this.projectId == null || this.projectId == 0 || this.stageId == null || this.stageId == 0 || this.selectedTaskId == null || this.selectedTaskId == 0;
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
            
            if(this.selectedTaskId == 0){
                return;
            }

            this.loading = true;
            this.rows = [];
            axios.get("/tracing/task/" + this.selectedTaskId, { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
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

            axios.get("/catalog/tracing/tracing_type", { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.list_status = res.data.data;
            }).catch(function (err) {
                console.log(err);
            });
        },
        getChipColor(type){
            if (type == 1) return 'green'
            else if (type == 2 ) return 'red'
            else return 'gray'
        },
        loadTasks(){
            this.loading = true;
            let $this = this;
            axios.get("/task/catalog/" + this.stageId, { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.allRows = res.data.data;
                $this.tasks = res.data.data;
                $this.loading = false;
            }).catch(function (err) {
                console.log(err);
            });
        },
        changeProject() {
            this.loading = false;
            this.tasks = [];
            let $this = this;
            axios.get("/stage/catalog/" + this.projectId, { headers: { Authorization: "Bearer " + this.token } }).then(function (res) {
                $this.list_stage = res.data.data;
                $this.loading = false;
                $this.rows = [];
                $this.stageId = 0;
            }).catch(function (err) {
                console.log(err);
            });
        },
        filterData(id){
            this.selectedTaskId = id;
            this.loadGrid();
            //this.rows = this.allRows.filter(function(item){return item.task_id == id})
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
            // let stage_id = this.editedItem.stage_id;
            // let project_id = this.editedItem.project_id;
            this.editedIndex = this.rows.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.formValid = true;
            // this.editedItem.stage_id = stage_id;
            // this.editedItem.project_id = project_id;
        },
        deleteItem(item) {
            // let stage_id = this.editedItem.stage_id;
            // let project_id = this.editedItem.project_id;
            this.editedIndex = this.rows.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
            // this.editedItem.stage_id = stage_id;
            // this.editedItem.project_id = project_id;
        },
        deleteItemConfirm() {
            this.rows.splice(this.editedIndex, 1);
            this.closeDelete();
            this.loading = true;
            let $this = this;
            this.editedItem.task_id = this.selectedTaskId;
            axios.delete("/tracing/" + this.editedItem.id, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                $this.loadGrid();
            }).catch(function (err) {
                console.log(err);
            });
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                // let stage_id = this.editedItem.stage_id;
                // let project_id = this.editedItem.project_id;
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.$refs.form.resetValidation();
                // this.editedItem.stage_id = stage_id;
                // this.editedItem.project_id = project_id;
            });
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                // let stage_id = this.editedItem.stage_id;
                // let project_id = this.editedItem.project_id;
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                // this.editedItem.stage_id = stage_id;
                // this.editedItem.project_id = project_id;
            });
        },
        save() {
            let $this = this;
            // this.$refs.form.validate();
            // if (!this.formValid) {
            //     return;
            // }
            this.editedItem.task_id = this.selectedTaskId;
            if (this.editedIndex > -1) {
                console.log(this.editedItem)
                axios.put("/tracing/" + this.editedItem.id, this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
                    $this.loadGrid();
                }).catch(function (err) {
                    console.log(err);
                });
                Object.assign(this.rows[this.editedIndex], this.editedItem);
            }
            else {
                this.loading = true;
                console.log(this.editedItem)
                axios.post("/tracing", this.editedItem, { headers: { Authorization: "Bearer " + this.token } }).then(function () {
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
  
<template>
    <v-container>
        <vue-toastr ref="mytoast"></vue-toastr>
        <FormTitle title="Reportes"></FormTitle>

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <p class="font-weight-bold">
                                Seguimiento de proyectos
                            </p>
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field
                                v-model="report1.file_name"
                                label="Nombre del archivo Excel"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        justify="space-around"
                        no-gutters
                    >
                        <v-col cols="12" sm="12" md="2">
                            <v-menu
                                v-model="report1.menu_start_date"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="report1.start_date"
                                    label="Fecha inicio"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="report1.start_date"
                                @input="report1.menu_start_date = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="2">
                            <v-menu
                                v-model="report1.menu_end_date"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="report1.end_date"
                                    label="Fecha fin"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="report1.end_date"
                                @input="report1.menu_end_date = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="8">
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-btn
                                elevation="2"
                                large
                                color="success"
                                @click="generarRerpot1"
                                :loading="report1.loading"
                                :disabled="report1.loading"
                            >
                                Descargar
                                <v-icon>
                                    mdi-microsoft-excel 
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <p class="font-weight-bold">
                                Estado de proyectos
                            </p>
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field
                                v-model="report2.file_name"
                                label="Nombre del archivo Excel"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        justify="space-around"
                        no-gutters
                    >
                        <v-col cols="12" sm="12" md="2">
                            <v-menu
                                v-model="report2.menu_start_date"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="report2.start_date"
                                    label="Fecha inicio"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="report2.start_date"
                                @input="report2.menu_start_date = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="2">
                            <v-menu
                                v-model="report2.menu_end_date"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="report2.end_date"
                                    label="Fecha fin"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="report2.end_date"
                                @input="report2.menu_end_date = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="8">
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-btn
                                elevation="2"
                                large
                                color="success"
                                @click="generarRerpot2"
                                :loading="report2.loading"
                                :disabled="report2.loading"
                            >
                                Descargar
                                <v-icon>
                                    mdi-microsoft-excel 
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <p class="font-weight-bold">
                                Facturas
                            </p>
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" sm="12" md="4">
                            <v-text-field
                                v-model="report3.file_name"
                                label="Nombre del archivo Excel"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        justify="space-around"
                        no-gutters
                    >
                        <v-col cols="12" sm="12" md="2">
                            <v-menu
                                v-model="report3.menu_start_date"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="report3.start_date"
                                    label="Fecha inicio"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="report3.start_date"
                                @input="report3.menu_start_date = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="2">
                            <v-menu
                                v-model="report3.menu_end_date"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="report3.end_date"
                                    label="Fecha fin"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="report3.end_date"
                                @input="report3.menu_end_date = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="8">
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-btn
                                elevation="2"
                                large
                                color="success"
                                @click="generarRerpot3"
                                :loading="report3.loading"
                                :disabled="report3.loading"
                            >
                                Descargar
                                <v-icon>
                                    mdi-microsoft-excel 
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

    </v-container>
</template>

<script>

import FormTitle from '@/components/FormTitle.vue';
import axios from 'axios';
import VueToastr from "vue-toastr";

export default {
    data: () => ({
        token:"",
        report1:{
            menu_start_date:false,
            menu_end_date:false,
            file_name:"Seguimiento semanal",
            loading:false,
            start_date:"",
            end_date:""
        },
        report2:{
            menu_start_date:false,
            menu_end_date:false,
            file_name:"Estado de proyectos",
            loading:false,
            start_date:"",
            end_date:""
        },
        report3:{
            menu_start_date:false,
            menu_end_date:false,
            file_name:"Facturas",
            loading:false,
            start_date:"",
            end_date:""
        },
    }),
    created() {
        this.token =  this.$session.get("token");
    },
    methods:{
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
        generarRerpot1(){
            if(this.report1.end_date != "" && this.report1.start_date != "" && this.report1.file_name != ""){
                
                let $this = this;
                this.report1.loading = true;
                let body = {
                    writer_format:"EXCEL",
                    file_name: this.report1.file_name,
                    fecha_inicio: this.report1.start_date,
                    fecha_fin: this.report1.end_date
                }
                axios.post('/report/seguimiento-proyectos', body, {responseType:'blob', headers: { Authorization: "Bearer " + this.token }}).then(function(response){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', $this.report1.file_name+'.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    $this.report1.loading = false;
                }).catch(function(err){
                    $this.report1.loading = false;
                    $this.showNotification("Ocurrio un error","error");
                    $this.validateError(err);
                })
            }
        },
        generarRerpot2(){
            if(this.report2.end_date != "" && this.report2.start_date != "" && this.report2.file_name != ""){
                
                let $this = this;
                this.report2.loading = true;
                let body = {
                    writer_format:"EXCEL",
                    file_name: this.report2.file_name,
                    fecha_inicio: this.report2.start_date,
                    fecha_fin: this.report2.end_date
                }
                axios.post('/report/estado-proyectos', body, {responseType:'blob', headers: { Authorization: "Bearer " + this.token }}).then(function(response){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', $this.report2.file_name+'.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    $this.report2.loading = false;
                }).catch(function(err){
                    $this.report2.loading = false;
                    $this.showNotification("Ocurrio un error","error");
                    $this.validateError(err);
                })
            }
        },
        generarRerpot3(){
            if(this.report3.end_date != "" && this.report3.start_date != "" && this.report3.file_name != ""){
                
                let $this = this;
                this.report3.loading = true;
                let body = {
                    writer_format:"EXCEL",
                    file_name: this.report3.file_name,
                    fecha_inicio: this.report3.start_date,
                    fecha_fin: this.report3.end_date
                }
                axios.post('/report/facturas', body, {responseType:'blob', headers: { Authorization: "Bearer " + this.token }}).then(function(response){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', $this.report3.file_name+'.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    $this.report3.loading = false;
                }).catch(function(err){
                    $this.report3.loading = false;
                    $this.showNotification("Ocurrio un error","error");
                    $this.validateError(err);
                })
            }
        }
    },
    components:{
        FormTitle,
        "vue-toastr": VueToastr,
        VueToastr,
    }
}
</script>
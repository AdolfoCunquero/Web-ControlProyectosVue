<template>
    <div id="app" class="p-0">
       <v-app  class="p-0">
           <main>
              <v-row>
                  <v-col cols="12" md="8" style="padding:0px; margin:0; height:670px">
                      <img src="@/assets/banner.jpg" width="100%" height="100%"/>
                  </v-col>
                  <v-col cols="12" md="4" style="margin:0; padding:0;">
                      <v-card color="transparent">
                          <v-tabs
                          v-model="tab"
                          color="black"
                          background-color="transparent"
                          class="pt-5"
                          >
                              <v-tab
                                  v-for="item in items"
                                  :key="item.tab"
  
                              >
                                  Control Proyectos
                              </v-tab>
                          </v-tabs>
  
                          <v-tabs-items v-model="tab" >
                              <v-tab-item
                                  :key="'Login'"
                                  style="height:600px;padding:15px;"
                              >
                              <div
                                  class="transition-swing text-h4 mb-1 mt-10"
                                  text="Login"
                              >Login
                              </div>
                              <div class="d-flex flex-column justify-space-between align-center">
                                    <v-img
                                    
                                    width="200"
                                    src="@/assets/logoGrande.png"
                                    ></v-img>
                                </div>
                                    
                                  <div style="padding:25px 50px 50px 50px;margin:0px;" >
                                      <v-card-text> 
                                          <v-form
                                          ref="formLogin"
                                          v-model="loginValid"
                                          >
                                              <v-text-field
                                                  name="login"
                                                  label="User"
                                                  type="text"
                                                  solo
                                                  :rules="rules.textRules"
                                                  :prepend-inner-icon="icons.mdiAccount"
                                                  v-model="loginData.username"
                                              ></v-text-field>
                                              <v-text-field
                                                  id="password"
                                                  name="password"
                                                  label="Password"
                                                  type="password"
                                                  :rules="rules.textRules"
                                                  :prepend-inner-icon="icons.mdiLock"
                                                  solo
                                                  v-model="loginData.password"
                                                  @keyup.enter="validateLogin"
                                              ></v-text-field>     
                                          </v-form>
  
                                          <div class="text-center">
                                              <v-btn
                                                  rounded
                                                  color="primary"
                                                  elevation="10"
                                                  @click.prevent="validateLogin"
                                                  :loading="loading"
                                                  :disabled="loading"
                                                  >
                                                  LOGIN
                                                  </v-btn>
                                              </div>
                                           <v-spacer></v-spacer>
                                      </v-card-text>
                                  </div>
  
                              </v-tab-item>

                          </v-tabs-items>
                      </v-card>
                  </v-col>
              </v-row>
           </main>
           <vue-toastr ref="mytoast"></vue-toastr>
       </v-app>
    </div>
  </template>
  <script>
  
  import {
      mdiAccount,mdiLock   
  
  } from '@mdi/js';
  import axios from 'axios';
  import VueToastr from "vue-toastr";
  
  export default {
    name: "Login",
      components: {
            "vue-toastr": VueToastr,
            VueToastr,
      },
    data() {
        return {
            notification:{
                msg:"",
                type:""
            },
            icons: {
                mdiAccount,
                mdiLock
            },
            loading: false,
            registrationValid: true,
            loginValid: true,
            loginData: {
                username: "",
                password: "",
            },
            rules: {
                emailRules: [
                    v => !!v || "El campo es requerido",
                    v => /.+@.+\..+/.test(v) || "El email no es valido",
                ],
                textRules: [
                    v => !!v || "El campo es requerido",
                ],
            },
            tab: null,
            items: [
                { tab: "Login", content: "" },
            ],
        };
    },
    methods: {
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
        validateLogin: function () {
            if (this.$refs.formLogin.validate()) {
                let $this = this;
                this.loading = true;
                axios.post("auth/login", this.loginData).then(function (response) {
                    let data = response.data;
                    console.log(data);
                    axios.defaults.headers = {
                        "Authorization": "Bearer " + data.token
                    };
                    $this.$session.start();
                    $this.$session.set("token", data.token);
                    //localStorage.controlProyectosToken = data.token;
                    localStorage.selectedItem = 0;
                    $this.loading = false;
                    $this.$router.push({ name: "home", force: true });
                }).catch(function (err) {
                    $this.loading = false;
                    $this.showNotification("Usuario / password incorrecto", "error");
                    $this.loginData.username = "";
                    $this.loginData.password = "";
                    $this.$refs.formLogin.resetValidation();
                    console.log(err);
                });
            }
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = "Login";
            }
        },
    },
}
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .p-0{
      padding: 0px !important; 
      margin: 0px !important;
  }
  
  .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      /* background: url( '../assets/image.jpg') no-repeat center center; */
      background-size: cover;
    }
  </style>
<template>
  <div>
    <v-app-bar v-if="this.$route.name != 'login'" color="primary" class="flex-grow-0" app dark height="50">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>QIT 
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        min-width="50px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
            class="text-right"
            style="float:right"
          >
            <v-avatar
              color="indigo"
              size="30"
              class="elevation-5"
            >
              <span class="white--text text-h6">{{ user.short_name }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card style="width:300px;">
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="indigo"
              >
                <span class="white--text text-h5">{{ user.short_name }}</span>
              </v-avatar>
              <h3 class="mt-2">{{ user.first_name }} {{ user.last_name }}</h3>
              <p class="text-caption mt-1">
                {{ user.username }}
              </p>
              
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Log Out
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-if="this.$route.name != 'login'" app v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Qit</v-list-item-title>
          <v-list-item-subtitle>Control de proyectos</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav >
        <v-list-item-group
          v-model="selectedItem"
          mandatory
          color="indigo"
        >
          <v-list-item v-for="(item, i) in items" :key="i" link @click="redireccionar(item, i)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
              >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'MainView',
  data: () => ({
    drawer: false,
    user:{
      short_name :"",
      first_name :"",
      last_name:"",
      username :""
    },
    token:"",
    items: [],
    selectedItem: 0,
  }),
  mounted(){
    
  },
  created () {
    this.token =  this.$session.get("token");
    axios.defaults.headers = {
        "Authorization":"Bearer "+this.token
    }

    if(this.$route.name != "login"){
      this.getMenu();
      this.getCurrentUser();
    }
  },
  methods:{
    getCurrentUser(){
      let $this = this;
      axios.get("/user/me",{ headers: { Authorization: "Bearer " + this.token } }).then(function(res){
        $this.user = Object.assign({}, res.data.data[0])
      }).catch(function(err){
        console.log(err)
      })
    },
    getMenu(){
      let $this = this;
      axios.get("/module/menu").then(function(res){
        $this.items = res.data.data;
        $this.items.unshift({
          id: 0,
          title: "Home",
          route_name: "home",
          icon: "mdi-home"
        })
      }).catch(function(err){
        console.log(err)
      })
    },
    redireccionar(item, i){
      localStorage.selectedItem = i;
      if(this.$route.name != item.route_name){
        this.$router.push({ name: item.route_name })
      }
    },
    logout(){
      localStorage.selectedItem = 0;
      this.$session.destroy();
      this.$router.push({name:"login"});
    },
  },
  watch: {
      $route: {
        immediate: true,
        handler() {
            document.title = 'Control proyectos';

            if (!this.$session.exists()) {
              if(this.$route.name != "login"){
                this.$router.push({name:"login"});
                return;
              }
            }else{
              this.token =  this.$session.get("token");
              if(this.$route.name == "home"){
                this.getMenu();
                this.getCurrentUser();
              }

              let selected = localStorage.selectedItem;
              if(selected != null){
                this.selectedItem = parseInt(selected);
              }else{
                this.selectedItem = 0;
              }
            }
        }
      },
    },
};
</script>
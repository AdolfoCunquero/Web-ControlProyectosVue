<template>
  <div>
    <v-app-bar color="primary" class="flex-grow-0" app dark height="50">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Proyectos</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
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
          <v-list-item v-for="(item, i) in items" :key="i" link @click="redireccionar(item)">
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
export default {
  name: 'MainView',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Clientes', icon: 'mdi-view-dashboard', route_name:"client" },
      { title: 'Proyectos', icon: 'mdi-account-box', route_name:"project" },
      { title: 'Etapas de proyecto', icon: 'mdi-cog', route_name:"stage" },
      { title: 'Tareas por etapa', icon: 'mdi-cog', route_name:"task" },
      { title: 'Seguimiento', icon: 'mdi-cog', route_name:"tracing" },
      { title: 'Prospecciones', icon: 'mdi-cog', route_name:"prospecting" },
      { title: 'Facturas', icon: 'mdi-cog', route_name:"invoice" },
    ],
    selectedItem: 1,
  }),
  methods:{
    redireccionar(item){
      //router.push(item.route_name)
      this.$router.push({ name: item.route_name })
      //$router.push({ name: item.route_name})
    }
  }
};
</script>
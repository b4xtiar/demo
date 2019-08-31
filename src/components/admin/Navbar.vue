<template>
  <div>
    <v-navigation-drawer v-model="drawer" class="blue-grey darken-3" :permanent="drawer" right app>
      <v-toolbar class="elevation-0">
      </v-toolbar>
      <v-list>
        <router-link to="/admin/">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style="text-align:right;color:white">سەرەکی</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/admin/dukans">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style="text-align:right;color:white">دوکانەکان</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/admin/data" v-if="admin">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">money</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style="text-align:right;color:white">حسابات</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-list-tile avatar>
          <v-btn color="blue darken-2" block @click="dialog = true" dark v-if="!admin">Admin</v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="elevation-0" color="blue darken-4" dark clipped-right fixed>
      <v-spacer></v-spacer>
      <v-toolbar-title>نۆد</v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-toolbar class="elevation-0">
    </v-toolbar>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>
          <v-subheader>Login as Admin</v-subheader>
          <v-text-field label="key" v-model="key"></v-text-field>
          <v-btn block color="blue" dark @click="loginAdmin">submit</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        drawer: null,
        dialog: false,
        key : '',
        admin : false

      }
    },
    methods: {
      logout() {
        this.$cookies.remove('ad')
        this.$router.replace({
          path: '/admin/login'
        })
        window.location.reload()
      },
      checkAdmin() {
        if (localStorage.getItem('admin') == "true") {
          this.admin  = true
        } else {
          this.admin =  false
        }
      },
      loginAdmin() {
        if (this.key == '22446688') {
          localStorage.setItem('admin' , 'true')
          this.dialog = false
        }
        this.checkAdmin()
      },
      logoutAdmin() {
        localStorage.removeItem('admin')
      }
    },
    created() {
      this.checkAdmin()

    },
  }

</script>
<style scoped>
  a {
    color: transparent
  }

</style>

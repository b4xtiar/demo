<template >
<v-app dark>
  <v-container fill-height >
    <v-layout row wrap justify-space-around align-center>
      <v-card style="text-align:center;direction:rtl" class="elevation-4">
        <br>
        <form @submit.prevent="checkLogin" class="mx-5">
          <v-layout row wrap style="text-align:center">
            <h5 style="text-align:center;margin:auto">چونەژورەوە</h5>
          </v-layout>
          <v-layout row wrap justify-space-around>
            <v-flex xs11 sm11 md11 lg8 xl8>
              <v-text-field type="email" label="ئیمەیڵ" append-icon="person" v-model="username" required></v-text-field>
            </v-flex>
            <v-flex xs11 sm11 md11 lg8 x8>
              <v-text-field type="password" label="وشەی نهێنی" append-icon="lock" v-model="password" required>
              </v-text-field>

            </v-flex>
            <v-flex xs11 sm11 md11 lg8 xl8>
              <v-btn block color="primary" type="submit" dark>چونەژورەوە</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <br>
      </v-card>
    </v-layout>
    <v-snackbar v-model="snackbar" bottom>
      {{ msg }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container> 
</v-app>
</template> 
<script>
    import Navbar from './Navbar'
    import fire from '@/firebase/init'
    const db = fire.firestore()
    export default {
      components: {
        Navbar,
      },
      data() {
        return {
          snackbar: false,
          username: "rozh@gmail.com",
          password: "1234",
          msg: ''
        }
      },
      methods: {
        checkLogin() {
          if (this.username && this.password) {
            let ref = db.collection('admin').where('email', '==', this.username).where('password', '==', this.password)
            ref.get().then(r => {
                r.forEach(doc => {
                  if (doc) {
                    this.$cookies.set('ad', doc.id)
                    this.$router.push('./')

                  } else {
                    this.msg = ' وشەی نهینی یاخود ئیمەیڵ هەڵەیە'
                    this.snackbar = true;
                  }
                })
              })
              .catch(e => {
                console.log(e);
              })
          } else {
            this.msg = 'تکایە ئیمەیڵ و وشەی نهێنی داخڵ بکە'
            this.snackbar = true
          }

        }
      },
    }

    </script>

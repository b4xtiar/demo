<template>
  <v-content>
    <Navbar />
    <v-dialog v-model="addDialog" scrollable persistent :overlay="false" max-width="500px"
      transition="dialog-transition">
      <v-card>
        <v-container style="direction:rtl;text-align:right">
          <h3 class="my-3">زیادکردنی دوکان </h3>
          <form @submit.prevent="addDukan">
            <v-layout row wrap justify-space-around="">
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="edit" style="text-align:right" label="ناو" v-model="dukan.name" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="call" style="text-align:right" type="tel" label="ژمارەی تەلەفۆن"
                  v-model="dukan.phone" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="place" style="text-align:right" label="ناونیشان" v-model="dukan.location"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="red" dark block @click="addDialog = false">
                  داخستن
                </v-btn>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="primary" class="mx-1" block type="submit">
                  زیادکردن
                  <v-icon>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-container style="direction:rtl;text-align:center">
      <br>
      <v-btn block color="primary" dark @click="addDialog = true">زیادکردنی دوکان</v-btn>
      <br>
      <h3>لیستی دوکانەکان</h3>
      <v-layout row wrap justify-space-around>
        <v-flex xs12 sm12 md12 lg10 xl8>
          <v-card   class="elevation-3 my-2" style="text-align:right" v-for="d in dukans" :key="d.id" @click="goDukan(d.id)">
            <v-card-text>
              <div class="mb-2 blue--text" style="font-size:19px">{{d.name}}</div>
              {{d.phone}}
            </v-card-text>
            <v-card-actions>
              {{d.location}}
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  import Navbar from './Navbar'
  import fire from '@/firebase/init'
  import {
    log
  } from 'util';
  const db = fire.firestore()
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        addDialog: false,
        loading: true,
        dukan: {},
        dukans: []
      }
    },
    methods: {
      goDukan(id){
        this.$router.push({path : '/admin/dukan/'+id})
      },
      getDukans() {
        this.loading = true
        this.dukans = []
        db.collection('dukan').get()
          .then(doc => {
            doc.forEach(r => {
              let dukan = r.data()
              dukan.id = r.id
              this.dukans.push(dukan)
            })
          })
          .catch(e => {
            console.log(e);
          })
        this.loading = false
      },
      addDukan() {
        db.collection('dukan').add(this.dukan).then(r => {
          this.addDialog = false
          this.dukans.push(this.dukan)
        }).catch(e => {
          console.log(e);
        })
      },
    },

    created() {
      this.getDukans()
    }
  }

</script>

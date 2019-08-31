<template>
  <v-content>
    <Navbar />
    <v-progress-linear :indeterminate="true" class="my-0" v-if="loading"></v-progress-linear>
    <v-container style="direction:rtl;text-align:right">
      <h3 class="my-3">زیادکردنی شار </h3>
      <form @submit.prevent="addCity">
        <v-layout row wrap justify-space-around="">
          <v-flex xs11 sm11 lg3 md3>
            <v-text-field append-icon="edit" style="text-align:right" label=" شار - کوردی" v-model="city" required>
            </v-text-field>
          </v-flex>
          <v-flex xs11 sm11 lg3 md3>
            <v-text-field append-icon="edit" style="text-align:right" label=" شار - عەرەبی" v-model="city_ar"
              required></v-text-field>
          </v-flex>
          <v-flex xs11 sm11 lg3 md3>
            <v-btn color="primary" block type="submit">
              زیادکردن
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-container>
    <v-container style="direction:rtl;text-align:center">
      <h3>لیستی شارەکان</h3>
      <v-layout row wrap  justify-space-around>
        <v-flex xs12 sm12 md12 lg10 xl8>
          <v-data-table  :headers="table_headers" :items="cities" class="elevation-1" loading="true">
            <template v-slot:items="props">
              <td class="text-center">{{ props.item.name.ku }}</td>
              <td class="text-center">{{ props.item.name.ar }}</td>
              <td>
                <v-btn color="error" @dblclick="deleteCity(props.item.id)">سڕینەوە
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn color="default"
                  @click="selectedCity( props.item.id ,  props.item.name.ku ,  props.item.name.ar);dialog = true">
                  گۆڕانکاری
                  <v-icon>edit</v-icon>  
                  </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <form @submit.prevent="updateCity">
          <v-card>
            <v-container style="text-align:right;direction:rtl">
              <v-card-title>
                <h4 style="text-align:right">گۆڕانکاری</h4>
              </v-card-title>
              <v-layout row wrap justify-space-around>
                <v-flex xs11 sm11 md5 lg5>
                  <v-text-field append-icon="person" style="text-align:right" label=" شار - کوردی"
                        v-model="temp" required></v-text-field>
                </v-flex>
                <v-flex xs11 sm11 md5 lg5>
                  <v-text-field append-icon="person" style="text-align:right" label=" شار - عەرەبی"
                        v-model="temp_ar" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-btn color="primary" @click="dialog = false" type="submit">گؤڕانکاری</v-btn>
              <v-btn color="default" @click="dialog = false">داخستن</v-btn>
            </v-container>
          </v-card>
        </form>
      </v-dialog>
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
        dialog: false,
        table_headers: [{
            text: 'ناو - کوردی',
            value: 'name.ku'
          },
          {
            text: 'ناو عەرەبی',
            value: 'name.ar'
          },
          {
            text: 'سڕینەوە',
            sortable: false
          },
          {
            text: 'گؤڕانکاری',
            sortable: false
          },
        ],
        loading: true,
        city: '',
        city_ar: '',
        cities: [],
        temp: '',
        temp_ar: '',
        selected_city: ''
      }
    },
    
    methods: {
      selectedCity(id, e, ee) {
        this.temp = e
        this.temp_ar = ee
        this.selected_city = id


      },
      getCity() {
        this.loading = true
        this.cities = []
        db.collection('city').get()
          .then(doc => {
            doc.forEach(r => {
              let cities = r.data()
              cities.id = r.id
              this.cities.push(cities)
              this.loading = false
            })
          })
          .catch(e => {
            console.log(e);
          })
        
      },
      addCity() {
        db.collection('city').add({
          name: {
            ku: this.city,
            ar: this.city_ar
          }
        }).then(r => {
          this.cities.push({
            id: r.id,
            name: {
              ku: this.city,
              ar: this.city_ar
            }
          })
          this.city = ''
          this.city_ar = ''
        }).catch(e => {
          console.log(e);
        })
      },
      deleteCity(id) {
        db.collection('city').doc(id).delete()
          .then(() => {
            this.cities = this.cities.filter(cat => {
              return cat.id != id
            })
          })
          .catch(e => {
            console.log(e);
          })
      },
      updateCity() {

        db.collection('city').doc(this.selected_city).update({
            name: {
              ku: this.temp,
              ar: this.temp_ar
            }
          })
          .then(() => {
            this.getCity()
          })
          .catch(e => {
            console.log(e);
          })
      }
    },

    created() {
      this.getCity()
    }
  }

</script>

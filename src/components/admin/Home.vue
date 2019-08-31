<template>
  <v-content>
    <Navbar />
    <v-dialog v-model="addDialog" scrollable persistent fullscreen>
      <v-card>
        <v-container style="direction:rtl;text-align:right">
          <h3 class="my-3">کڕینی مریشک</h3>
          <form @submit.prevent="addWasl">
            <v-layout row wrap justify-space-around="">
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" label="ناوی دەواجن" v-model="wasl.name" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" type="number" label="ژمارەی قەفەسەکان" v-model="wasl.qafas_count"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" type="number" label="کێش" v-model="wasl.kg_qafas" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" type="number" label="کێش (صافی)" v-model="wasl.kg_safi" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="money" type="number" style="text-align:right" label="نرخی کیلۆ"
                  v-model="wasl.kg_price" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="money" type="number" style="text-align:right" label="نرخی گشتی"
                  v-model="wasl.price" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-select :items="types" item-text="label" item-value="isNaqd" @change="setType2($event)" label="شێواز">
                </v-select>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="red" dark block @click="addDialog = false">
                  داخستن
                </v-btn>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="primary" class="mx-1" block type="submit">
                  کڕین
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- sell dialog -->
    <v-dialog v-model="sellDialog" persistent fullscreen :overlay="false">
      <v-card>
        <v-container style="direction:rtl;text-align:right">
          <h3 class="my-3">فرۆشتنی مریشک</h3>
          <form @submit.prevent="sellMrishk">
            <v-layout row wrap justify-space-around>
              <v-flex xs12 sm11 lg3 md3>
                <v-select :items="dukans" item-text="name" item-value="id" @change="setDukan($event)" label="دوکان">
                </v-select>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" type="number" label="ژمارەی قەفەسەکان" v-model="sell.qafas_count"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" type="number" label="کێش" v-model="sell.kg" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="money" type="number" style="text-align:right" label="نرخی کیلۆ"
                  v-model="sell.kg_price" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-text-field append-icon="money" type="number" style="text-align:right" label="نرخی گشتی"
                  v-model="sell.price" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-select :items="types" item-text="label" item-value="isNaqd" @change="setType($event)" label="شێواز">
                </v-select>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="red" dark block @click="sellDialog = false">
                  داخستن
                </v-btn>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="primary" class="mx-1" block type="submit">
                  فرۆشتن
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- masraf dialog -->
    <v-dialog v-model="masrafDialog" persistent :overlay="false">
      <v-card>
        <v-container style="direction:rtl;text-align:right">
          <h3 class="my-3">مەسرەفی رۆژانە</h3>
          <form @submit.prevent="addMasraf">
            <v-layout row wrap justify-space-around>

              <v-flex xs12 sm11 lg3 md3>
                <v-text-field style="text-align:right" type="number" label="بڕی پارە" v-model="masraf.price" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm11 lg3 md3>
                <v-textarea label="تێبینی" v-model="masraf.note"></v-textarea>
              </v-flex>


              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="red" dark block @click="masrafDialog = false">
                  داخستن
                </v-btn>
              </v-flex>
              <v-flex xs6 sm6 lg3 md3>
                <v-btn color="primary" class="mx-1" block type="submit">
                  زیادکردن
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-container style="direction:rtl;text-align:center">
      <v-btn block color="blue darken-1" dark @click="addDialog = true">کڕینی مریشک</v-btn>
      <br>
      <v-btn block color="teal darken-1" dark @click="sellDialog = true">فرۆشتنی مریشک</v-btn>
      <br>
      <v-btn block color="red darken-4" dark @click="masrafDialog = true">مەسرەف</v-btn>
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
        sellDialog: false,
        masrafDialog: false,
        loading: true,
        wasl: {},
        masraf: {},
        sell: {},
        dukans: [],
        types: [{
            isNaqd: true,
            label: 'نەقد'
          },
          {
            isNaqd: false,
            label: 'قەرز'
          },
        ]

      }
    },
    methods: {
      setDukan(e) {
        this.sell.dukan = e
      },
      setType(e) {
        this.sell.isNaqd = e
      },
      setType2(e) {
        this.wasl.isNaqd = e
      },
      addWasl() {
        this.wasl._date = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2)
        db.collection('wasl_dawajn').add(this.wasl).then(r => {
          this.addDialog = false
          this.wasl = {}
        }).catch(e => {
          console.log(e);
        })
      },
      addMasraf() {
        this.masraf._date = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (
          '0' +
          new Date().getDate()).slice(-2)
        db.collection('masraf').add(this.masraf).then(r => {
          this.masrafDialog = false
          this.masraf = {}
        }).catch(e => {
          console.log(e);
        })
      },
      sellMrishk() {
        this.sell._date = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2)
        db.collection('wasl_froshtn').add(this.sell).then(r => {
          this.sellDialog = false
          this.sell = {}
        }).catch(e => {
          console.log(e);
        })
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
    },
    created() {
      this.getDukans()
    }
  }

</script>

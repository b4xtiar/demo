<template>
  <v-content>
    <Navbar />
    <v-container style="text-align:right;direction:rtl">
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <form @submit.prevent="updateDukan">
            <v-layout row wrap justify-space-around="">
              <v-flex xs12 sm12 lg4 md4>
                <v-text-field class="px-2" append-icon="person" style="text-align:right" label="ناوی دوکان"
                  v-model="dukan.name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 lg4 md4>
                <v-text-field class="px-2" append-icon="call" style="text-align:right" label="ژمارەی تەلەفۆن"
                  v-model="dukan.phone" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-btn color="primary" dark type="submit" style="float:left">گۆڕانکاری
              <v-icon>edit</v-icon>
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container style="text-align:right;direction:rtl" v-if="adminSatatus">
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-subheader>حساباتی دوکان</v-subheader>
          <v-card color="red darken-4" dark>
            <v-subheader>بڕە پارەی قەرز</v-subheader>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  {{checkQarz}} دینار
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-subheader>حساباتی مانگانە</v-subheader>
          <v-date-picker color="blue darken-4" header-color="blue darken-4" type="month" full-width v-model="date">
          </v-date-picker>
        </v-flex>
      </v-layout>
      <v-subheader>وەسڵەکانی ئەم مانگە</v-subheader>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-card v-for="(w,i) in monthwasl" :key="i" class="mt-2 elevation-5">
            <v-card-title primary-title>
              بەرواری ( {{w._date}} )
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs8 sm8 md8>
                  ژمارەی قەفەس
                </v-flex>
                <v-flex xs4 sm4 md4>
                  {{w.qafas_count}}
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-2>
                <v-flex xs8 sm8 md8>
                  نرخی کیلۆ
                </v-flex>
                <v-flex xs4 sm4 md4>
                  {{w.kg_price}} دینار
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-2>
                <v-flex xs8 sm8 md8>
                  وەزن
                </v-flex>
                <v-flex xs4 sm4 md4 style="direction:ltr">
                  {{w.kg}} kg
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-2>
                <v-flex xs8 sm8 md8>
                  نرخی گشتی
                </v-flex>
                <v-flex xs4 sm4 md4>
                  {{w.price}} دینار
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-2 v-if="w.isNaqd">
                <span style="color:green">
                  واسڵکراوە
                </span>
              </v-layout>
              <v-layout row wrap mt-2 v-if="!w.isNaqd">
                <v-flex xs6 sm6 md6>
                  <span style="color:red">
                    واسڵنەکراوە
                  </span>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-btn color="teal" dark @click="setWaslId(w.id)">واسڵکردن</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="wasldialog" persistent :overlay="false">
      <v-card style="direction:rtl;">
        <v-card-title primary-title>
          کلیک لە ( دڵنیابوون ) بکە بۆ واسڵکردنی پارەکە
        </v-card-title>
        <v-card-actions>
          <v-btn color="error" @click="wasldialog = false">پاشگەزبوونەوە</v-btn>
          <v-btn color="primary" class="mx-1" @click="updateWasl">دڵنیابوون</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-content>
</template>
<script>
  import Navbar from './Navbar'
  import fire from '@/firebase/init'
  import firebase from 'firebase'
  const db = fire.firestore()
  export default {
    components: {
      Navbar,
    },
    watch: {
      '$route'(to, from) {
        this.checkUser()
      }
    },
    data() {
      return {
        id: 0,
        dukan: {},
        loading: true,
        wasldialog: false,
        wasls: [],
        qarz: 0,
        selected_wasl: 0,
        admin : false,
        date: new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)
      }
    },
    computed: {
      adminSatatus(){
        return this.admin
      },
      wasl() {
        let w = this.wasls.filter(r => {
          return r.dukan == this.id
        })
        return w
      },
      monthwasl() {
        let mw = this.wasl.filter(r => {
          return r._date.match(this.date)
        })
        return mw
      },
      checkQarz() {
        let w = this.monthwasl.filter(r => {
          return r.isNaqd == false
        })
        w.forEach(e => {
          this.qarz = parseFloat(this.qarz) + parseFloat(e.price)
        });
        return parseFloat(this.qarz)
      },
    },
    methods: {
      checkAdmin() {
        if (localStorage.getItem('admin') == "true") {
          this.admin  = true
        } else {
          this.admin =  false
        }
      },
      checkUser() {
        const doctorRef = db.collection('dukan').doc(this.id);
        const getDoc = doctorRef.get()
          .then(doc => {
            if (!doc.exists) {
              this.$router.push({
                path: '../not-found'
              })
            } else {
              this.loading = false
              this.dukan = doc.data()
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      },
      updateWasl(){
          this.wasldialog = false
          this.loading = true

          db.collection('wasl_froshtn').doc(this.selected_wasl).update({
              isNaqd : true,
          })
          .then((doc) => { 
              location.reload()
          })
          .catch(e => {
            console.log(e);
          })
      },
      getDukans() {
        this.wasls = []
        db.collection('wasl_froshtn').get()
          .then(doc => {
            doc.forEach(r => {
              let dukan = r.data()
              dukan.id = r.id
              this.wasls.push(dukan)
            })
          })
          .catch(e => {
            console.log(e);
          })
      },
      updateDukan() {
        db.collection('dukan').doc(this.id).update(this.dukan)
          .then((doc) => {
            this.$router.replace({
              path: '/admin/dukans'
            })
          })
          .catch(e => {
            console.log(e);
          })
      },
      setWaslId(id){
          this.selected_wasl = id
          this.wasldialog = true
      }
    },
    created() {
      this.id = this.$route.params.id
      this.checkUser()
      this.getDukans()
      this.checkAdmin()
    },
    mounted() {},
  }

</script>

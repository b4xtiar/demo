<template>
  <div>
    <v-content>
      <v-layout row wrap style="direction:rtl">
        <v-subheader>مانگ دیاری بکە</v-subheader>
        <v-flex xs12 style="direction:ltr">
          <v-date-picker v-model="date" color="blue darken-4" full-width mx-2 class="mt-3" type="month">
          </v-date-picker>
        </v-flex>
      </v-layout>
      <v-layout row wrap mt-3>
        <v-flex xs12 sm12>
          <v-tabs color="default" light right hide-slider>
            <v-tab>
              مەسرەفەکان
            </v-tab>
            <v-tab>
              کڕین
            </v-tab>
            <v-tab>
              فرۆشتن
            </v-tab>
            <v-tabs-items touchless>
              <v-tab-item>
                <v-card flat fill-height>
                  <v-card-text>
                    <v-layout row wrap justify-space-around>
                      <v-flex xs12 sm12 md12 lg12 style="direction:rtl">
                        <v-card v-for="(item, index) in masrafs" :key="index">
                          <v-card-title primary-title style="font-family:arial!important;font-size:25px">
                            {{item.price}}
                          </v-card-title>
                          <v-card-text style="font-size:12px">
                            {{item.note}}
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-layout row wrap justify-space-around>
                      <v-flex xs12 sm12 md12 lg12 style="text-align:right;direction:rtl">
                        <v-card v-for="(w,i) in buys" :key="i" class="mt-2 elevation-5">
                          <v-card-title primary-title>
                            {{w.name}}
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
                                {{w.kg_qafas}} kg
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap mt-2>
                              <v-flex xs8 sm8 md8>
                                وەزنی صافی
                              </v-flex>
                              <v-flex xs4 sm4 md4 style="direction:ltr">
                                {{w.kg_safi}} kg
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
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-layout row wrap justify-space-around>
                      <v-flex xs12 sm12 md12 lg12 style="direction:rtl;text-align:right">
                        <v-card v-for="(w,i) in sells" :key="i" class="mt-2 elevation-5">
                          <v-card-title primary-title v-for="(item, index) in dukan" :key="index"
                            v-if="item.id == w.dukan">
                            {{item.name}}
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
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>

    </v-content>
  </div>
</template>
<script>
  import fire from '@/firebase/init'
  const db = fire.firestore()
  export default {
    data() {
      return {
        date: new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2),
        buy: [],
        sell: [],
        masraf: [],
        dukans: []
      }
    },
    methods: {
      getBuy() {
        this.buy = []
        db.collection('wasl_dawajn').get()
          .then(doc => {
            doc.forEach(r => {
              let dukan = r.data()
              dukan.id = r.id
              this.buy.push(dukan)
            })
            
          })
          .catch(e => {
            console.log(e);
          })
      },
      getSell() {
        this.sell = []
        db.collection('wasl_froshtn').get()
          .then(doc => {
            doc.forEach(r => {
              let dukan = r.data()
              dukan.id = r.id
              this.sell.push(dukan)
            })
          })
          .catch(e => {
            console.log(e);
          })
      },
      getMasraf() {
        this.masraf = []
        db.collection('masraf').get()
          .then(doc => {
            doc.forEach(r => {
              let dukan = r.data()
              dukan.id = r.id
              this.masraf.push(dukan)
            })
          })
          .catch(e => {
            console.log(e);
          })
      },
      getDukans() {
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
      },
    },
    computed: {
      
      dukan() {
        return this.dukans
      },
      masrafs() {

        let a = this.masraf.filter(r => {
          return r._date.match(this.date)
        })
        return a
      },
      sells() {
        let a = this.sell.filter(r => {
          return r._date.match(this.date)
        })
        return a
      },
      buys() {        
        let a = this.buy.filter(r => {
          return r._date.match(this.date)
        })
        return a
      }
    },
    created() {
      this.getDukans()
      this.getMasraf()
      this.getBuy()
      this.getSell()
    },
  }

</script>

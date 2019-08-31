<template>
  <div>
    <Navbar />
    <v-content>
      <v-tabs color="blue darken-4" v-model="selected_tab" dark right hide-slider>
        <v-tab>
           مانگانە
        </v-tab>
        <v-tab>
           ڕۆژانە
        </v-tab>
        <v-tabs-items touchless>
          <!-- <v-tab-item>
            <v-card flat fill-height>
              <v-card-text>
                <v-layout row wrap justify-space-around>
                  <v-flex xs12 lg10 xl8>
                    <YearData />

                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item> -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-layout row wrap justify-space-around>
                  <v-flex xs12 lg10 xl8>
                    <MonthData />

                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-layout row wrap justify-space-around>
                  <v-flex xs12 lg10 xl8>
                    <DayData />

                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-content>
  </div>
</template>
<script>
  import Navbar from './Navbar'
  import DayData from './DayData'
  import MonthData from './MonthData'
  import YearData from './YearData'
  export default {
    components: {
      Navbar,
      DayData,
      YearData,
      MonthData
    },
    data() {
      return {
        selected_tab : 1
      }
    },
  }

</script>

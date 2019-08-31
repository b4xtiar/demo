<template>
  <div>
    <v-content>
      <v-container>
        <v-layout row wrap style="direction:rtl">
          <v-subheader>ساڵ دیاری بکە</v-subheader>
          <v-flex xs12 style="direction:ltr">
            <v-select :items="items"  v-model="date"></v-select>
          </v-flex>
        </v-layout>
        
      </v-container>
    </v-content>
  </div>
</template>
<script>
  import fire from '@/firebase/init'
  const db = fire.firestore()
  export default {
    components: {},
    data() {
      return {
        date: new Date().getFullYear(),

       
        items:[]
      }
    },
    methods: {
        years(){
            for (let index = 2019; index < 2050; index++) {
                this.items.push(index)
            }
        },
    },
    computed: {
    },
    created() {
      this.years()
    },
  }

</script>

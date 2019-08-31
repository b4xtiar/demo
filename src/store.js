import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let local_history = []
let h = localStorage.getItem('search_history');
if (h == null) {
  localStorage.setItem('search_history', JSON.stringify(local_history))
} else {
  local_history = JSON.parse(localStorage.getItem('search_history'))
}
let length = local_history.length - 1
export const store = new Vuex.Store({
  state: {
    dKey: '',
    search_settings: {},
    isDoctor: false,
    isDark: JSON.parse(localStorage.getItem('isDark')),
    doctor: {
      name: {
        ar: '',
        ku: '',
      },
      email: '',
      password: '',
      key: '',
      profile_image: 'https://firebasestorage.googleapis.com/v0/b/tandrusty-263ae.appspot.com/o/doctors%2Fdef.jpg?alt=media&token=85291ede-fa8b-4d1e-ad25-cc5e40ae9bda',
      reg_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      slug: '',
      city: [],
      location_text: {
        ar: '',
        ku: ''
      },
      location: {
        long: 0,
        lat: 0
      },
      about: {
        ku: '',
        ar: ''
      },
      tags: '',
      avg_time: 15,
      phone: '',
      specialist: [],
      isPublic: false,
      isUseSystem: false,
      isBooking: false,
      isActive: true,
      visit_count: 0,
      time_table: [{
        sa: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
        su: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
        mo: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
        tu: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
        we: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
        th: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
        fr: {
          isHoliday: true,
          start_time: '',
          end_time: ''
        },
      }]
    },
    q: '',
    slide_images: [],
    doctors: [],
    history: local_history.slice(1).slice(-5)
  }
})

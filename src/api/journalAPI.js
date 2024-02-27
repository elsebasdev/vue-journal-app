import axios from 'axios'


const journalApi = axios.create({

    baseURL: 'https://vue-vuex-journal-2024-default-rtdb.firebaseio.com/'

})

export default journalApi
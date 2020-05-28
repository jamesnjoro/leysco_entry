import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs:[]
  },
  getter:{
    getJobs: (state)=>{
      return state.jobs
    }
  },
  mutations: {
    retrievedJobs(state,jobs){
      state.jobs = jobs
    },
  },
  actions: {
    retrieveJobs(context){
      return new Promise((resolve,reject)=>{
        axios.get('/jobs')
            .then(response =>{
              context.commit('retrievedJobs', response.data)
              console.log(response.data)
              resolve(response.data)
            })
            .catch(error =>{
              console.log(error)
              reject(error);
            })
      })
    },
    editJob(data){
      return new Promise((resolve,reject)=>{
          axios.post('/jobs/' + data.id,{
          name: data.name,
          description: data.description
        })
            .then(response =>{
              console.log(response.data)
              resolve(response)
            })
            .catch(error =>{
              console.log(error)
              reject(error);
            })
      })
    },
    deleteJob(data){
      return new Promise((resolve,reject)=>{
          axios.get('/jobs/delete' + data.id,{
        })
            .then(response =>{
              console.log(response.data)
              resolve(response)
            })
            .catch(error =>{
              console.log(error)
              reject(error);
            })
      })
    },

  },
})

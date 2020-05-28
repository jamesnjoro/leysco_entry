<template>
   <div>
      <h1 align="center" justify="center">Posts</h1>
      <div v-for="post in posts" :key="post.id">
         <v-card
                 class="ma-4 mx-auto"
                 max-width="500"
         >
            <v-card-text>
               <div>Post ID</div>
               <p class="text--primary">
                  {{post.id}}
               </p>
               <div class="text--primary">
                  {{post.title}}
               </div>
            </v-card-text>
            <v-card-actions>
               <v-btn
                       text
                       color="deep-purple accent-4"
                       @click="ViewPost(post.title, post.body)"
               >
                  Read more
               </v-btn>
            </v-card-actions>
         </v-card>
      </div>
      <v-dialog
              v-model="dialog"
              max-width="500"
      >
         <v-card>
            <v-card-title class="headline">{{CurrentPost.title}}</v-card-title>
            <v-card-text>{{CurrentPost.body}}</v-card-text>

            <v-card-actions>
               <v-spacer></v-spacer>

               <v-btn
                       color="green darken-1"
                       text
                       @click="dialog = false"
               >
                  close
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>
<script>
    export default {
       data(){
          return{
             posts : {},
             dialog: false,
             CurrentPost:{
                title:'',
                body:''
             }
          }
       },
      created() {
         fetch('https://jsonplaceholder.typicode.com/posts')
                 .then(response => response.json())
                 .then(json => this.posts = json)
         .catch(err=>{
            console.log(err)
         })
      },
       methods:{
          ViewPost(title,body){
             this.CurrentPost.title = title
             this.CurrentPost.body = body
             this.dialog = true
          }
       }
    }
</script>
<template>
    <v-data-table
            :headers="headers"
            :items="posts"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Jobs</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" @click="addNew"  v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline"></span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="10" md="10">
                                        <v-text-field v-model="editedJob.name" label="Job Name"></v-text-field>
                                        <small style="color: red" v-if="error && errors.name">{{ errors.name[0] }}</small>
                                    </v-col>
                                    <v-col  cols="12" sm="10" md="10">
                                        <v-textarea v-model="editedJob.description" label="Description"></v-textarea>
                                        <small style="color: red" v-if="error && errors.description">{{ errors.description[0] }}</small>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" :loading="saveLoading" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editJob(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteJob(item)"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>
<script>
    export default {
        data(){
            return{
                error : false,
                saveLoading:false,
                errors: [],
                posts:[],
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Description', value: 'description' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                editedJob:{
                    name: '',
                    description: '',
                    id: ''
                },
                dialog: false,
                isEdit: false
            }
        },
        created() {
            this.getJobs();
        },
        methods:{
            close() {
                this.dialog = false
            },
            save(){
                let path = this.isedit ? '/jobs/' + this.editedJob.id : '/jobs/add'
                this.saveLoading = true
                this.axios.post(path,{
                    name: this.editedJob.name,
                    description:this.editedJob.description
                })
                    .then(response =>{
                        console.log(response.data)
                        this.getJobs()
                        this.saveLoading = false
                        this.dialog = false
                    })
                    .catch(resp =>{
                        this.saveLoading = false
                        console.log(resp)
                        if (resp.response.data.errors) {
                            this.error = true;
                            this.errors = resp.response.data.errors;
                        }
                    })
            },
            getJobs(){
                this.$store.dispatch('retrieveJobs')
                    .then(data=>{
                        this.posts = data
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            editJob(item){
                this.isedit = true
                this.dialog = true
                this.editedJob = item
            },
            deleteJob(item){
                this.axios.get('/jobs/delete/' + item.id)
                .then(data => {
                    console.log(data)
                    this.getJobs()
                })
            },
            addNew(){
                this.editedJob.name = ''
                this.editedJob.description = ''
                this.dialog = true
            }
        },
    }
</script>
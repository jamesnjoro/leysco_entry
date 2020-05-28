<template>
    <div>
        <h1 align="center" justify="center">Users List</h1>
        <template>
            <v-data-table
                    :headers="headers"
                    :items="posts"
                    :items-per-page="5"
                    class="elevation-1"
            ></v-data-table>
        </template>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                headers: [
                    {text: 'Id', value: "id"},
                    { text: 'Name', value: 'name' },
                    { text: 'Email', value: 'email' },
                    { text: 'Phone', value: 'phone' },
                    { text: 'Location', value: 'location' },
                ],
                posts:[]
            }
        },
        created() {
            this.axios.get('/user/list')
            .then(resp=>{
                this.posts =Object.values(resp.data)
            })
        }
    }
</script>
<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <template v-slot:prepend>
                <v-list-item two-line>


                    <v-list-item-content>
                        <v-list-item-title>{{user}}</v-list-item-title>
                        <v-list-item-subtitle>{{status}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list nav >
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        route :to="item.route"

                >

                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-row class="ma-12">
                <v-btn @click="logout" large color="primary">Logout</v-btn>
            </v-row>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Dashboard</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                    fluid
            >
                <slot/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data(){
            return{
                drawer: null,
                status:"Logged In",
                user:this.$auth.user().name,
                items: [
                    { title: 'Posts', icon: 'view_headline', route:'/' },
                    { title: 'Jobs', icon: 'work' , route: '/jobs'},
                    { title: 'Users', icon: 'supervisor_account' , route: '/users' },
                ],
            }
        },
        methods:{
            logout() {
                this.$auth.logout();
                this.$router.push('/login')
            }
        }
    }
</script>
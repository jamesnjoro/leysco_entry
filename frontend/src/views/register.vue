<template>
  <v-app id="inspire">
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <v-col
                  cols="12"
                  sm="8"
                  md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                      color="primary"
                      dark
                      flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                          label="Name"
                          name="name"
                          prepend-icon="person"
                          type="text"
                          v-model="form.name"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.name">{{ errors.name[0] }}</small>
                  <v-text-field
                          label="Email"
                          name="email"
                          prepend-icon="email"
                          type="text"
                          v-model="form.email"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.email">{{ errors.email[0] }}</small>
                  <v-text-field
                          label="Phone"
                          name="phone"
                          prepend-icon="phone"
                          type="number"
                          v-model="form.phone"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.phone">{{ errors.phone[0] }}</small>
                  <v-text-field
                          label="Location"
                          name="location"
                          prepend-icon="place"
                          type="text"
                          v-model="form.location"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.location">{{ errors.location[0] }}</small>
                  <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          type="password"
                          v-model="form.password"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.password">{{ errors.password[0] }}</small>
                  <v-text-field
                          id="password"
                          label="Password Confirmation"
                          name="password_confirmation"
                          prepend-icon="lock"
                          type="password"
                          v-model="form.password_confirmation"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="login" color="primary">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register" :loading="registerLoad" >Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data(){
      return{
        registerLoad:false,
        error:false,
        errors:[],
        form:{
          name: '',
          email:'',
          phone:'',
          location: '',
          password: '',
          password_confirmation: '',
        }

      }
    },
    methods:{
      login(){
        this.$router.push('/login')
      },
      register() {
        this.registerLoad = true;
        this.errors = []
        this.$auth.register({
          data: {
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            location: this.form.location,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
          },
          success: function () {
            this.registerLoad = false;
            this.$auth.login({
              params: {
                email: this.form.email,
                password: this.form.password,
              },
              success: function () {
                this.loginLoad= false;
              },
              rememberMe: true,
              redirect: '/',
              fetchUser: true,
            });
          },
          error: function (resp) {
            this.registerLoad = false;
            this.error = true;
            this.errors = resp.response.data.errors;
          },
          redirect: null
        });
      }
    }


  }
</script>

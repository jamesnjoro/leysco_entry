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
                          label="Email"
                          name="email"
                          prepend-icon="person"
                          type="text"
                          v-model = form.email
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.email">{{ errors.email[0] }}</small>

                  <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          type="password"
                          v-model="form.password"
                  ></v-text-field>
                  <small style="color: red" v-if="error && errors.password">{{ errors.password[0] }}</small>
                  <v-alert v-if="Mainerror" type="error">
                    You have entered invalid email or password
                  </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="register" color="primary">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login" :loading="loginLoad">Login</v-btn>
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
        loginLoad : false,
        error : false,
        errors: [],
        Mainerror:false,
        form:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      login() {
        this.loginLoad = true;
        this.Mainerror= false;
        this.errors= ''
        this.$auth.login({
          params: {
            email: this.form.email,
            password: this.form.password,
          },
          success: function () {
            this.loginLoad= false;
          },
          error: function (resp) {
            this.loginLoad = false;
            if (resp.response.data.errors) {
              this.error = true;
              this.errors = resp.response.data.errors;
            }
            if (resp.response.data.error) {
                this.Mainerror= true;
            }
          },
          rememberMe: true,
          redirect: '/',
          fetchUser: true,
        });
      },
      register(){
        this.$router.push('/register')
      }
    }
  }
</script>

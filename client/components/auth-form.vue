<template>
  <v-dialog
    @click:outside="resetForm"
    v-model="authDialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        class="header__login"
        elevation="0"
        text
        color="#fff"
      >
        <v-icon small>mdi-account</v-icon>
        <span>Войти</span>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card rounded>
        <v-tabs class="d-flex justify-center mt-2">
          <v-tab
            :disabled="isLoading"
            @click="
              authType = 0;
              resetForm();
            "
          >
            Вход
          </v-tab>
          <v-tab
            :disabled="isLoading"
            @click="
              authType = 1;
              resetForm();
            "
          >
            Регистрация
          </v-tab>
        </v-tabs>
        <v-form
          :disabled="isLoading"
          class="header__auth pb-0 pt-6 d-flex flex-column align-center"
          @submit.prevent="auth"
          :class="{ 'px-0': $device.mobile, 'px-6': !$device.mobile }"
          ref="form"
        >
          <v-text-field
            label="Email"
            type="email"
            dense
            outlined
            class="col-10"
            color="primary"
            :error-messages="errorEmail"
            v-model.trim="userData.email"
            append-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            label="Пароль"
            type="password"
            dense
            outlined
            class="col-10"
            color="primary"
            :error-messages="errorPassword"
            v-model.trim="userData.password"
            append-icon="mdi-lock"
          ></v-text-field>
          <div
            v-if="authType === 0"
            class="mt-0 mb-2 pa-0 d-flex justify-space-between col-md-10"
            :class="{
              'flex-column': $device.mobile,
              'align-center': !$device.mobile,
            }"
          >
            <v-checkbox
              hide-details
              hide-spin-buttons
              v-model="userData.rememberMe"
              label="Запомнить меня"
              class="my-0 py-0"
              :class="{ 'pl-6': $device.mobile, 'mt-n2': $device.mobile }"
              dense
            ></v-checkbox>
            <nuxt-link
              :class="{ 'text-center': $device.mobile }"
              to="/restore-password"
              @click.native="authDialog = false"
              >Забыли пароль?</nuxt-link
            >
          </div>
          <div class="header__auth-bottom d-flex justify-center">
            <v-btn
              :loading="isLoading"
              type="submit"
              color="primary mt-0 mb-3"
              >{{ authType === 0 ? 'Войти' : 'Зарегистрироваться' }}</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  email as emailValidator,
  minLength,
  required,
} from 'vuelidate/lib/validators';

export default {
  name: 'auth-form',
  data() {
    return {
      authType: 0,
      authDialog: false,
      isLoading: false,
      userData: {
        email: '',
        password: '',
        rememberMe: false,
      },
    };
  },
  validations: {
    userData: {
      email: {
        required,
        emailValidator,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  computed: {
    ...mapGetters({ errors: 'error' }),
    errorEmail() {
      if (this.$v.userData.email.$dirty && this.$v.userData.email.$invalid)
        return ['Некорректный email'];
      else if (this.errors('signin') || this.errors('signup')) {
        return !this.authType ? this.errors('signin') : this.errors('signup');
      }
    },
    errorPassword() {
      if (
        this.$v.userData.password.$dirty &&
        this.$v.userData.password.$invalid
      ) {
        return (
          (this.authType === 1 && ['Минимальная длина пароля 8']) || [
            'Это поле обязятельно',
          ]
        );
      } else if (this.errors('signin') || this.errors('signup')) {
        return !this.authType ? this.errors('signin') : [];
      }
    },
  },
  methods: {
    ...mapActions({
      action_signin: 'auth/signin',
      action_signup: 'auth/signup',
      action_resetError: 'resetErrors',
    }),
    async auth() {
      this.action_resetError();
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isLoading = true;
        if (this.authType === 0) {
          await this.action_signin(this.userData);
        } else {
          await this.action_signup({
            email: this.userData.email,
            password: this.userData.password,
          });
        }

        this.isLoading = false;

        if (!this.errors('signin')?.length && !this.errors('signup')?.length) {
          this.resetForm();
          this.authDialog = false;
        }
      }
    },
    resetForm() {
      this.$v.$reset();
      this.userData = {
        email: '',
        password: '',
        rememberMe: false,
      };
      this.action_resetError('signin');
      this.action_resetError('signup');
    },
  },
};
</script>

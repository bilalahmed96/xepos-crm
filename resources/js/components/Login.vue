<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <b-card title="Login" class="p-3">
                    <div class="alert alert-danger" v-if="errorMessage">
                        {{ errorMessage }}
                    </div>
                    <b-form @submit.prevent="login">
                        <b-form-group label="Email:" label-for="email" class="mb-2">
                            <b-form-input id="email" v-model="email" type="email" v-validate="'required|email'"
                                name="email"></b-form-input>
                            <span class="text-danger">{{ errors.first('email') }}</span>
                        </b-form-group>

                        <b-form-group label="Password:" label-for="password" class="mb-2">
                            <b-form-input id="password" v-model="password" type="password" v-validate="'required'"
                                name="password"></b-form-input>
                            <span class="text-danger">{{ errors.first('password') }}</span>
                        </b-form-group>

                        <b-button type="submit" variant="primary">Login</b-button>
                    </b-form>
                </b-card>
            </div>
        </div>
    </div>
</template>
  
  
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: null,
        };
    },
    methods: {
        async login() {
            this.$validator.validate().then(async valid => {
                if (!valid) {
                    return 0;
                }
                try {
                    let loginForm = new FormData();
                    loginForm.append('email', this.email);
                    loginForm.append('password', this.password);
                    await this.$store.dispatch('user/login', loginForm).then((res) => {
                        this.$toast.success('User Login Successfully!');
                        this.$router.push('/');
                    }).catch((err) => {
                        this.handleValidationErrors(err);
                    });
                } catch (error) {
                    console.error('error:', error);
                }
            });
        },
        handleValidationErrors(error) {
            if (error && error.status === 422) {
                const validationErrors = error.data.message;
                for (const field in validationErrors) {
                    if (validationErrors.hasOwnProperty(field)) {
                        const messages = validationErrors[field].join('<br>');
                        this.$toast.error('Validation Error', {
                            message: `${field}: ${messages}`,
                        });
                    }
                }
            } else {
                this.$toast.error('An error occurred. Please try again.');
            }
        },
    },
};
</script>
  
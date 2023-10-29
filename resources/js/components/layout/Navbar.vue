<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav class="w-100">
                <b-nav-item to="/">XEPOS CRM</b-nav-item>

                <b-nav-item to="/companies" v-if="!$store.getters['user/isAuth']">Companies</b-nav-item>
                <b-nav-item to="/employees" v-if="!$store.getters['user/isAuth']">Employees</b-nav-item>


                <!-- Right aligned nav items -->
                <!-- Conditionally show Login or Logout based on the authentication status -->
                <span> {{ $store.getters['user/isAuth'] }}</span>
                <b-nav-item to="/login" v-if="!$store.getters['user/isAuth']" class="ms-auto">Login</b-nav-item>
                <b-nav-item v-else class="ms-auto" @click="logout">Logout</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>


<script>
export default {
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout').then((res) => {
                this.$toast.success('Logout successfully!');
                this.$router.push('/login');
            }).catch((err) => {
                this.$toast.error('Please try again, something went wrong!');
            });
        }
    }
}
</script>





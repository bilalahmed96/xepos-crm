<template>
    <div class="container">
        <h1>Dashboard</h1>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2>Companies</h2>
                        <router-link to="/companies" class="btn btn-primary">View Companies</router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2>Employees</h2>
                        <router-link to="/employees" class="btn btn-primary">View Employees</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  

<style scoped>
.container {
    max-width: 1000px;
    margin: 50px auto;
}
</style>
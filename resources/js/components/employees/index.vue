<template>
    <div>
        <b-container>
            <h1 class="my-4">Employees</h1>

            <!-- Add a button to open the "Add Employee" form -->
            <b-button @click="showAddEmployeeForm" class="my-2">Add Employee</b-button>

            <!-- Companies Data Table -->
            <b-table id="employeesTable" striped hover :items="employees" :fields="tableFields" :select-mode="'single'"
                :selected-variant="'info'" v-if="!loading">
                <template v-slot:cell(company_id)="data">
                    {{ getCompanyNameById(data.item.company_id) }}
                </template>
                <template v-slot:cell(actions)="data">
                    <b-button @click="showUpdateEmployeeForm(data.item)">Update</b-button>
                    <b-button @click="removeEmployee(data.item)">Remove</b-button>
                </template>
            </b-table>
            <!-- for loading -->
            <b-skeleton-table :rows="5" :columns="5" :table-props="{ striped: true }" v-else></b-skeleton-table>
            <!-- pagination -->
            <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="totalRows"
                aria-controls="employeesTable"></b-pagination>

            <!-- Add Employee Form -->
            <b-modal ref="addEmployeeModal" title="Add Employee" @ok="addEmployee" hide-footer hide-header-close
                @hidden="onModalHidden">
                <form @submit.prevent="addEmployee">
                    <div class="form-group my-2">
                        <label for="first_name">First Name</label>
                        <input type="text" id="first_name" class="form-control" v-validate="'required'" name="first_name"
                            v-model="employee.first_name">
                        <span v-show="errors.has('first_name')" class="text-danger">{{ errors.first('first_name') }}</span>
                    </div>
                    <div class="form-group my-2">
                        <label for="last_name">Last Name</label>
                        <input type="text" id="last_name" class="form-control" v-validate="'required'" name="last_name"
                            v-model="employee.last_name">
                        <span v-show="errors.has('last_name')" class="text-danger">{{ errors.first('last_name') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="company_id">Select Company</label>
                        <b-form-select id="company_id" v-model="employee.company_id" class="form-control">
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Please select a company
                                    --</b-form-select-option>
                            </template>
                            <b-form-select-option :value="company.id" :key="company.id"
                                v-for="company in $store.state.companies.companies">{{ company.name
                                }}</b-form-select-option>
                        </b-form-select>
                    </div>

                    <div class="form-group my-2">
                        <label for="email">Email</label>
                        <input type="text" id="email" class="form-control" v-validate="'email'" name="email"
                            v-model="employee.email">
                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="phone">Phone</label>
                        <input type="text" id="phone" class="form-control" name="phone" v-model="employee.phone">
                        <span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
                    </div>

                    <button type="submit" class="btn btn-primary">Add Employee</button>
                </form>
            </b-modal>

            <!-- Update Employee Form -->
            <b-modal ref="updateEmployeeModal" title="Update Employee" @ok="updateEmployee" hide-footer hide-header-close
                @hidden="onModalHidden">
                <form @submit.prevent="updateEmployee">
                    <div class="form-group my-2">
                        <label for="first_name">First Name</label>
                        <input type="text" id="first_name" class="form-control" v-validate="'required'" name="first_name"
                            v-model="employee.first_name">
                        <span v-show="errors.has('first_name')" class="text-danger">{{ errors.first('first_name') }}</span>
                    </div>
                    <div class="form-group my-2">
                        <label for="last_name">Last Name</label>
                        <input type="text" id="last_name" class="form-control" v-validate="'required'" name="last_name"
                            v-model="employee.last_name">
                        <span v-show="errors.has('last_name')" class="text-danger">{{ errors.first('last_name') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="company_id">Select Company</label>
                        <b-form-select id="company_id" v-model="employee.company_id" class="form-control">
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Please select a company
                                    --</b-form-select-option>
                            </template>
                            <b-form-select-option :value="company.id" :key="company.id"
                                v-for="company in $store.state.companies.companies">{{ company.name
                                }}</b-form-select-option>
                        </b-form-select>
                    </div>

                    <div class="form-group my-2">
                        <label for="email">Email</label>
                        <input type="text" id="email" class="form-control" v-validate="'email'" name="email"
                            v-model="employee.email">
                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="phone">Phone</label>
                        <input type="text" id="phone" class="form-control" name="phone" v-model="employee.phone">
                        <span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
                    </div>

                    <button type="submit" class="btn btn-primary">Update Employee</button>
                </form>
            </b-modal>
        </b-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            employees: [],
            employee: {
                first_name: '',
                last_name: '',
                company_id: '',
                email: '',
                phone: '',
            },
            editableId: null,
            tableFields: ['first_name', 'last_name', 'company_id', 'email', 'phone', 'actions'],
            currentPage: 1,
            perPage: 1,
            totalRows: null,
            loading: false,
        };
    },
    watch: {
        currentPage(newPage) {
            this.getEmployees(newPage);
        },
    },
    mounted() {
        this.getEmployees();
        this.$store.dispatch('companies/getAllCompanies');
    },
    methods: {
        getCompanyNameById(id) {
            return this.$store.state.companies.companies.find(c => c.id === id).name;
        },
        async getEmployees(page = 1) {
            this.loading = true;
            await this.$store.dispatch('employees/getEmployees', page).then((employees) => {
                this.totalRows = employees.total;
                this.currentPage = employees.current_page;
                this.perPage = employees.per_page;
                this.employees = employees.data;
                this.loading = false;
            });
        },
        showAddEmployeeForm() {
            this.$refs.addEmployeeModal.show();
        },
        addEmployee() {
            this.$validator.validate().then(async valid => {
                if (!valid && this.fileErr) {
                    return 0;
                }
                try {
                    const employeeData = new FormData();
                    employeeData.append('first_name', this.employee.first_name);
                    employeeData.append('last_name', this.employee.last_name);
                    employeeData.append('company_id', this.employee.company_id);
                    employeeData.append('email', this.employee.email);
                    employeeData.append('phone', this.employee.phone);

                    await this.$store.dispatch('employees/addEmployee', employeeData).then((res) => {
                        console.log(res);
                        this.$toast.success('Employee created successfully!');
                        this.getEmployees();
                        this.$refs.addEmployeeModal.hide();
                    }).catch((err) => {
                        this.handleValidationErrors(err);
                    });
                } catch (error) {
                    console.error('error:', error);
                }
            });
        },
        showUpdateEmployeeForm(employee) {
            this.employee.first_name = employee.first_name;
            this.employee.last_name = employee.last_name;
            this.employee.company_id = employee.company_id;
            this.employee.email = employee.email;
            this.employee.phone = employee.phone;
            this.editableId = employee.id;
            this.$refs.updateEmployeeModal.show();
        },
        updateEmployee() {
            this.$validator.validate().then(async valid => {
                if (!valid) {
                    return 0;
                }
                try {
                    const employeeData = new FormData();
                    employeeData.append('first_name', this.employee.first_name);
                    employeeData.append('last_name', this.employee.last_name);
                    employeeData.append('company_id', this.employee.company_id);
                    employeeData.append('email', this.employee.email);
                    employeeData.append('phone', this.employee.phone);
                    employeeData.append('_method', 'put');

                    await this.$store.dispatch('employees/updateEmployee', { employeeId: this.editableId, data: employeeData }).then((res) => {
                        this.$toast.success('Employee updated successfully!');
                        this.getEmployees();
                        this.$refs.updateEmployeeModal.hide();

                    }).catch((err) => {
                        this.handleValidationErrors(err);
                    });
                } catch (error) {
                    console.error('error:', error);
                }
            });
        },
        async removeEmployee(employee) {
            const confirmed = window.confirm("Are you sure you want to remove this employee?");
            if (confirmed) {
                try {
                    await this.$store.dispatch('employees/removeEmployee', { employeeId: employee.id }).then((res) => {
                        this.getEmployees();
                        this.$toast.success('Employee removed successfully!');

                    }).catch((err) => {
                        this.$toast.success('Please try again, something went wrong!');

                    });
                } catch (error) {
                    console.error('error:', error);
                }
            }
            return 0;

        },
        onModalHidden() {
            this.employee = {
                name: '',
                email: '',
            };

            this.editableId = null;
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
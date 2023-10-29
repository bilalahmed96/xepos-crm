<template>
    <div>
        <b-container>
            <h1 class="my-4">Companies</h1>

            <!-- Add a button to open the "Add Company" form -->
            <b-button @click="showAddCompanyForm" class="my-2">Add Company</b-button>

            <!-- Companies Data Table -->
            <b-table id="companiesTable" striped hover :items="companies" :fields="tableFields" :select-mode="'single'"
                :selected-variant="'info'" v-if="!loading">
                <template v-slot:cell(logo)="data">
                    <b-img :src="data.item.logo" fluid rounded="circle" width="100" height="100" alt="Company Logo"
                        v-if="data.item.logo"></b-img>
                    <span v-else>No Image</span>
                </template>
                <template v-slot:cell(actions)="data">
                    <b-button @click="showUpdateCompanyForm(data.item)">Update</b-button>
                    <b-button @click="removeCompany(data.item)">Remove</b-button>
                </template>
            </b-table>
            <!-- for loading -->
            <b-skeleton-table :rows="5" :columns="5" :table-props="{ striped: true }" v-else></b-skeleton-table>
            <!-- pagination -->
            <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="totalRows"
                aria-controls="companiesTable"></b-pagination>

            <!-- Add Company Form -->
            <b-modal ref="addCompanyModal" title="Add Company" @ok="addCompany" hide-footer hide-header-close
                @hidden="onModalHidden">
                <form @submit.prevent="addCompany">
                    <div class="form-group my-2">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" v-validate="'required'" name="name"
                            v-model="company.name">
                        <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="email">Email</label>
                        <input type="text" id="email" class="form-control" v-validate="'required|email'" name="email"
                            v-model="company.email">
                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="logo">Logo</label>
                        <input type="file" id="logo" class="form-control-file" name="logo" @change="onLogoChange">
                        <span class="text-danger" v-if="fileErr">{{ fileErr }} sadadasd</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="website">Website</label>
                        <input type="text" id="website" v-validate="{ url: { require_protocol: true } }"
                            class="form-control" name="website" v-model="company.website">
                    </div>

                    <button type="submit" class="btn btn-primary">Add Company</button>
                </form>
            </b-modal>

            <!-- Update Company Form -->
            <b-modal ref="updateCompanyModal" title="Update Company" @ok="updateCompany" hide-footer hide-header-close
                @hidden="onModalHidden">
                <form @submit.prevent="updateCompany">
                    <div class="form-group my-2">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" v-validate="'required'" name="name"
                            v-model="company.name">
                        <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="email">Email</label>
                        <input type="text" id="email" class="form-control" v-validate="'required|email'" name="email"
                            v-model="company.email">
                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                    </div>

                    <div class="form-group my-2">
                        <label for="logo">Logo</label>
                        <input type="file" id="logo" class="form-control-file" name="logo" @change="onLogoChange">
                        <span class="text-danger" v-if="fileErr">{{ fileErr }} sadadasd</span>
                    </div>

                    <div class="d-flex my-2" v-if="imagePreview">
                        <b-img :src="imagePreview" fluid rounded="circle" width="100" height="100"
                            alt="Company Logo"></b-img>
                    </div>

                    <div class="form-group my-2">
                        <label for="website">Website</label>
                        <input type="text" id="website" v-validate="{ url: { require_protocol: true } }"
                            class="form-control" name="website" v-model="company.website">
                    </div>

                    <button type="submit" class="btn btn-primary">Update Company</button>
                </form>
            </b-modal>
        </b-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            companies: [],
            company: {
                name: '',
                email: '',
                logo: null,
                website: '',
            },
            editableId: null,
            tableFields: ['name', 'email', 'logo', 'website', 'actions'],
            fileErr: null,
            imagePreview: null,
            currentPage: 1,
            perPage: 1,
            totalRows: null,
            loading: false,
        };
    },
    watch: {
        currentPage(newPage) {
            this.getCompanies(newPage);
        },
    },
    mounted() {
        this.getCompanies();
    },
    methods: {
        onLogoChange(event) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);

            const image = new Image();
            image.src = URL.createObjectURL(file);

            image.onload = () => {
                if (image.width >= 100 && image.height >= 100) {
                    this.fileErr = null;
                } else {
                    this.company.logo = null;
                    this.fileErr = "Logo atleast 100 by 100 in size!";
                }
            };
            this.company.logo = file;
        },

        async getCompanies(page = 1) {
            this.loading = true;
            await this.$store.dispatch('companies/getCompanies', page).then((companies) => {
                this.totalRows = companies.total;
                this.currentPage = companies.current_page;
                this.perPage = companies.per_page;
                this.companies = companies.data;
                this.loading = false;

                console.log(this.companies, this.totalRows, this.currentPage, this.perPage);
            });
        },
        showAddCompanyForm() {
            // Show the "Add Company" form modal
            this.$refs.addCompanyModal.show();
        },
        addCompany() {
            this.$validator.validate().then(async valid => {
                if (!valid && this.fileErr) {
                    return 0;
                }
                try {
                    let companyForm = new FormData();
                    companyForm.append('name', this.company.name);
                    companyForm.append('email', this.company.email);
                    companyForm.append('website', this.company.website);

                    if (this.company.logo instanceof File) {
                        // Handle file (logo update)
                        companyForm.append('logo', this.company.logo);
                    }

                    await this.$store.dispatch('companies/addCompany', companyForm).then((res) => {
                        console.log(res);
                        this.$toast.success('Company created successfully!');
                        this.getCompanies();
                        this.$refs.addCompanyModal.hide();
                    }).catch((err) => {
                        this.handleValidationErrors(err);
                    });
                } catch (error) {
                    console.error('error:', error);
                }
            });
        },
        showUpdateCompanyForm(company) {
            console.log(company)
            this.company.email = company.email;
            this.company.name = company.name;
            this.company.website = company.website;

            this.editableId = company.id;
            this.imagePreview = company.logo;

            this.$refs.updateCompanyModal.show();
        },
        updateCompany() {
            this.$validator.validate().then(async valid => {
                if (!valid && this.fileErr) {
                    return 0;
                }
                try {
                    let companyForm = new FormData();
                    companyForm.append('name', this.company.name);
                    companyForm.append('email', this.company.email);
                    companyForm.append('website', this.company.website);
                    companyForm.append('_method', 'put');
                    if (this.company.logo instanceof File) {
                        // Handle file (logo update)
                        companyForm.append('logo', this.company.logo);
                    }
                    await this.$store.dispatch('companies/updateCompany', { companyId: this.editableId, data: companyForm }).then((res) => {
                        this.$toast.success('Company updated successfully!');
                        this.getCompanies();
                        this.$refs.updateCompanyModal.hide();

                    }).catch((err) => {
                        this.handleValidationErrors(err);
                    });
                } catch (error) {
                    console.error('error:', error);
                }
            });
        },
        async removeCompany(company) {
            const confirmed = window.confirm("Are you sure you want to remove this company?");
            if (confirmed) {
                try {
                    await this.$store.dispatch('companies/removeCompany', { companyId: company.id }).then((res) => {
                        this.getCompanies();
                        this.$toast.success('Company removed successfully!');

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
            this.company = {
                name: '',
                email: '',
                logo: null,
                website: '',
            };

            this.editableId = null;
            this.imagePreview = null;
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
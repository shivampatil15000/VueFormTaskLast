<template>
    <div class="container">
        <h2>View Employee Details</h2>
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th data-label="Full Name">Full Name</th>
                        <th data-label="E-Mail">E-Mail</th>
                        <th data-label="Mobile Number">Mobile Number</th>
                        <th data-label="Company Name">Company Name</th>
                        <th data-label="Experience">Experience</th>
                        <th data-label="Actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in getEmployeeData" :key="employee.id">
                        <td>
                            <span v-if="!employee.isEditing">{{ employee.editedEmployee.firstName }} {{
                                employee.editedEmployee.lastName }}</span>
                        </td>
                        <td>
                            <span v-if="!employee.isEditing">{{ employee.editedEmployee.email }}</span>
                        </td>
                        <td>
                            <span v-if="!employee.isEditing">{{ employee.editedEmployee.phone }}</span>
                        </td>
                        <td>
                            <span v-if="!employee.isEditing">{{ employee.editedEmployee.companyName }}</span>
                        </td>
                        <td>
                            <span v-if="!employee.isEditing">{{ employee.editedEmployee.experience }}</span>
                        </td>
                        <td>
                            <button @click="editEmployee(employee)">Edit</button>
                            <button @click="confirmDelete(employee)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ConfirmationPopup @confirmed="deleteEmployee" @canceled="cancelDelete" v-if="isConfirmationPopupVisible">
            <p>Are you sure you want to delete this employee?</p>
        </ConfirmationPopup>
    </div>
</template>
  
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import ConfirmationPopup from './ConformationPopup.vue';

export default {
    components: {
        ConfirmationPopup,
    },
    computed: {
        ...mapGetters(['getEmployeeData', 'isConfirmationPopupVisible']),
    },
    methods: {
        ...mapMutations(['showDeleteConfirmation', 'hideDeleteConfirmation']),
        ...mapActions(['fetchEmployeeData', 'deleteEmployee']),
        editEmployee(employee) {
            this.$router.push({
                name: 'editEmployee',
                query: {
                    editEmployeeId: employee.id,
                    employeeData: JSON.stringify(employee.editedEmployee),
                },
            });
        },
        confirmDelete(employee) {
            this.showDeleteConfirmation(employee);
        },
        cancelDelete() {
            this.hideDeleteConfirmation();
        },
    },
    created() {
        this.fetchEmployeeData();
    },
};
</script>
  
<style scoped lang="scss">
@import '../assets/sass/style.scss';

.container {
    margin-top: 25px;
    @include padding($top: 25px, $right: 20px, $bottom: 25px, $left: 20px);
    @include flexbox($flex-direction: column, $justify-content: center, $align-items: center);
    gap: 30px;

    h2 {
        font-size: 32px;
    }

    .table-responsive {
        overflow-x: auto;

        table {
            border-collapse: collapse;
            @include margin($top: 20px, $right: 0, $bottom: 20px, $left: 0);
        }

        th {
            padding: 10px;
            border: 1px solid #000000;
        }

        tbody {
            border: 1px solid #000000;
        }

        td {
            padding: 10px;
            width: 233px;
            border: 1px solid #000000;
            text-align: center;

            button {
                margin: 5px;
                @include padding($top: 5px, $right: 10px, $bottom: 5px, $left: 10px);
                @include bg-color-and-text-color($bg-color: #0074d9, $text-color: white);
                border: none;
                border-radius: 4px;
                cursor: pointer;

                &:hover {
                    background-color: #0056b3;
                }
            }

            input {
                width: 100%;
                padding: 5px;
                border: 1px solid #ccc;
            }

            select {
                width: 100%;
                padding: 5px;
                border: 1px solid #ccc;
            }
        }
    }
}

@include media-query ($tablet-screen) {
    .table-responsive {
        overflow-x: auto;
    }

    th,
    td {
        display: block;
        width: 100%;
        position: relative;
    }

    td {
        @include flexbox($flex-direction: column);

        button {
            margin: 5px 0;
        }
    }
}
</style>
  
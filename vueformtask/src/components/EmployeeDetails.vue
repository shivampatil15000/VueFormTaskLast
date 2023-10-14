<template>
  <div class="container">
    <h2>Employee Details Form</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" v-model.trim="employee.editedEmployee.firstName"
          @input="clearError('firstNameError'); restrictNumbers('firstName')">
        <div class="error-message" v-if="firstNameError">{{ firstNameError }}</div>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" v-model.trim="employee.editedEmployee.lastName"
          @input="clearError('lastNameError'); restrictNumbers('lastName')">
        <div class="error-message" v-if="lastNameError">{{ lastNameError }}</div>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model.trim="employee.editedEmployee.email" @input="clearError('emailError')">
        <div class="error-message" v-if="emailError">{{ emailError }}</div>
      </div>
      <div class="form-group">
        <label for="phone">Phone number:</label>
        <input type="tel" id="phone" v-model.trim="employee.editedEmployee.phone"
          @input="clearError('phoneError'); restrictNonNumbers('phone')">
        <div class="error-message" v-if="phoneError">{{ phoneError }}</div>
      </div>
      <div class="form-group">
        <label for="company">Company Name:</label>
        <input type="text" id="company" v-model.trim="employee.editedEmployee.companyName"
           @input="clearError('companyNameError')">
        <div class="error-message" v-if="companyNameError">{{ companyNameError }}</div>
      </div>
      <div class="form-group">
        <label for="experience">Experience:</label>
        <select id="experience" v-model.trim="employee.editedEmployee.experience">
          <option value="Fresher">Fresher</option>
          <option value="Experienced 1+">Experienced 1+</option>
          <option value="Experienced 3+">Experienced 3+</option>
        </select>
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employee: {
        editedEmployee: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          experience: 'Fresher',
        },
      },
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
      emptyFieldError: '',
      emailError: '',
      companyNameError: '',
    };
  },
  methods: {
    submitForm() {
      this.clearErrors();

      if (!/^[A-Za-z]+$/.test(this.employee.editedEmployee.firstName)) {
        this.firstNameError = 'First name should only contain letters and no special characters and numbers.';
      }

      if (!/^[A-Za-z]+$/.test(this.employee.editedEmployee.lastName)) {
        this.lastNameError = 'Last name should only contain letters and no special characters and numbers.';
      }

      if (!/^\d{10}$/.test(this.employee.editedEmployee.phone)) {
        this.phoneError = 'Phone number should be a 10-digit number and contain no special characters.';
      }

      if (!/^[A-Za-z][A-Za-z0-9]*@[A-Za-z]+\.[A-Za-z]+$/.test(this.employee.editedEmployee.email)) {
        this.emailError = 'Invalid email format.';
      }

      if (!this.employee.editedEmployee.companyName) {
        this.companyNameError = 'Company Name is required.';
      }

      if (
        !this.employee.editedEmployee.firstName ||
        !this.employee.editedEmployee.lastName ||
        !this.employee.editedEmployee.email ||
        !this.employee.editedEmployee.phone ||
        !this.employee.editedEmployee.companyName
      ) {
        this.emptyFieldError = 'Please fill in all the required fields.';
      }

      if (!this.hasErrors()) {
        this.handleFormSubmission();
      }
    },
    restrictNumbers(fieldName) {
      this.employee.editedEmployee[fieldName] = this.employee.editedEmployee[fieldName].replace(/[0-9]/g, '');
    },
    restrictNonNumbers(fieldName) {
      this.employee.editedEmployee[fieldName] = this.employee.editedEmployee[fieldName].replace(/[^0-9]/g, '');
    },
    clearError(fieldName) {
      this[fieldName] = '';
    },
    clearErrors() {
      this.firstNameError = '';
      this.lastNameError = '';
      this.phoneError = '';
      this.emptyFieldError = '';
      this.emailError = '';
      this.companyNameError = '';
    },
    hasErrors() {
      return (
        this.firstNameError ||
        this.lastNameError ||
        this.phoneError ||
        this.emptyFieldError ||
        this.emailError
      );
    },
    handleFormSubmission() {
      const route = this.$route;
      const router = this.$router;

      if (route.query.editEmployeeId) {
        const employeeId = route.query.editEmployeeId;
        fetch(`https://vuefinaltask-default-rtdb.firebaseio.com/employeeData/${employeeId}.json`, {
          method: 'PUT',
          body: JSON.stringify(this.employee.editedEmployee),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (response.ok) {
              router.push('/view-details');
            } else {
              console.error('Error updating the form:', response.status, response.statusText);
            }
          })
          .catch(error => {
            console.error('Error updating the form:', error);
          });
      } else {
        fetch('https://vuefinaltask-default-rtdb.firebaseio.com/employeeData.json', {
          method: 'POST',
          body: JSON.stringify(this.employee.editedEmployee),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (response.ok) {
              this.clearFields();
              router.push('/view-details');
            } else {
              console.error('Error submitting the form:', response.status, response.statusText);
            }
          })
          .catch(error => {
            console.error('Error submitting the form:', error);
          });
      }
    },
    clearFields() {
      this.employee.editedEmployee.firstName = '';
      this.employee.editedEmployee.lastName = '';
      this.employee.editedEmployee.email = '';
      this.employee.editedEmployee.phone = '';
      this.employee.editedEmployee.companyName = '';
      this.employee.editedEmployee.experience = 'Fresher';
    },
  },
  async mounted() {
    const route = this.$route;
    if (route.query.employeeData) {
      this.employee.editedEmployee = JSON.parse(route.query.employeeData);
    }
  },
};
</script>

<style scoped lang="scss">
@import '../assets/sass/style.scss';

.container {
  @include padding($top: 25px, $right: 0, $bottom: 25px, $left: 0);
  @include margin($top: 25px, $right: 0, $bottom: 25px, $left: 0px);
  @include flexbox($flex-direction: column, $justify-content: center, $align-items: center);
  gap: 30px;

  h2 {
    font-size: 32px;
  }

  .form {
    background-color: white;
    border: 1px solid white;
    width: 100%;
    max-width: 400px;
    @include padding($top: 25px, $right: 28px, $bottom: 25px, $left: 28px);
    @include flexbox($flex-direction: column);
    gap: 25px;
    border-radius: 8px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .form-group {
      @include flexbox($flex-direction: column);

      input,
      select {
        margin-top: 5px;
        @include padding($top: 5px, $right: 8px, $bottom: 5px, $left: 8px);
      }
    }

    .btn {
      @include padding($top: 8px, $right: 15px, $bottom: 8px, $left: 15px);
      @include bg-color-and-text-color($bg-color: rgb(86, 135, 232), $text-color: white);
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      border: none;
      outline: none;
    }

    .error-message {
      color: red;
    }
  }
}

@include media-query ($tablet-screen) {
  .form {
    max-width: 100%;
  }
}
</style>














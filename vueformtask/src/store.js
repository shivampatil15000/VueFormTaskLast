import { createStore } from 'vuex';
export default createStore({
  state: {
    employeeData: [],
    showConfirmationPopup: false,
    selectedEmployee: null,
  },
  mutations: { 
    setEmployeeData(state, data) {
      state.employeeData = data;
    },
    showDeleteConfirmation(state, employee) {
      state.selectedEmployee = employee;
      state.showConfirmationPopup = true;
    },
    hideDeleteConfirmation(state) {
      state.selectedEmployee = null;
      state.showConfirmationPopup = false;
    },
    deleteEmployee(state, employeeId) {
      state.employeeData = state.employeeData.filter((employee) => employee.id !== employeeId);
    },
  },
  actions: {
    async fetchEmployeeData(context) {
      try {
        const response = await fetch('https://vuefinaltask-default-rtdb.firebaseio.com/employeeData.json');

        if (!response.ok) {
          throw new Error('Unable to fetch data');
        }

        const data = await response.json();

        const employees = Object.keys(data).map((id) => ({
          id,
          ...data[id],
          editedEmployee: { ...data[id] },
          isEditing: false,
        }));

        context.commit('setEmployeeData', employees);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    deleteEmployee(context) {
      if (context.state.selectedEmployee) {
        const employeeId = context.state.selectedEmployee.id;
        fetch(`https://vuefinaltask-default-rtdb.firebaseio.com/employeeData/${employeeId}.json`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              context.commit('deleteEmployee', employeeId);
            } else {
              console.error('Failed to delete employee data in Firebase.');
            }
          })
          .catch((error) => {
            console.error('Error deleting employee data:', error);
          });

        context.commit('hideDeleteConfirmation');
      }
    },
  },
  getters: {
    getEmployeeData: (state) => state.employeeData,
    isConfirmationPopupVisible: (state) => state.showConfirmationPopup,
  },
});


















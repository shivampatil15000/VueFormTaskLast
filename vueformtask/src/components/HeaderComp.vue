<template>
  <div class="container">
    <router-link to="/employee-details">
      <button :class="{ 'btns': true, 'active': isAddButtonActive }">{{ addButtonLabel }}</button>
    </router-link>
    <router-link to="/view-details">
      <button :class="{ 'btns': true, 'active': !isAddButtonActive }">View Details</button>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    addButtonLabel() {
      return this.$route.query.editEmployeeId ? 'Edit Details' : 'Add Details';
    },
    isAddButtonActive() {
      return this.$route.path === '/employee-details';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/sass/style.scss';

.container {
  @include flexbox($justify-content: center);
  @include padding($top: 25px, $right: 0, $bottom: 25px, $left: 0);
  background-color: black;
  gap: 10px;

  .btns {
    @include padding($top: 8px, $right: 15px, $bottom: 8px, $left: 15px);
    @include bg-color-and-text-color($bg-color: rgb(86, 135, 232), $text-color: white);
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    outline: none;
  }

  .active {
    background-color: orange;
  }
}
</style>

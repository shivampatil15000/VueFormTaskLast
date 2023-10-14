<template>
  <div class="overlay" v-if="show">
    <div class="confirmation-popup">
      <slot></slot>
      <div class="button-container">
        <button class='popup-btns' @click="confirm">Yes</button>
        <button class='popup-btns' @click="cancel">No</button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  emits:['confirm','cancel'],
  data() {
    return {
      show: true,
    };
  },
  methods: {
    confirm() {
      this.$emit('confirmed');
      this.show = false;
    },
    cancel() {
      this.$emit('canceled');
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/style.scss';


.overlay {
  @include position($position: fixed, $top: 0, $left: 0);
  @include dimensions($width: 100%, $height: 100%);
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.confirmation-popup {
  @include position($position: fixed, $top: 50%, $left: 50%);
  transform: translate(-50%, -50%);
  width: 400px;
  @include padding($top: 15px, $right: 18px, $bottom: 15px, $left: 18px);
  @include bg-color-and-text-color($bg-color: black, $text-color: white);
  @include flexbox($flex-direction: column, $justify-content: center, $align-items: center);
  border: 1px solid black;
  gap: 20px;
  border-radius: 8px;
  z-index: 1001;
  @include media-query ($tablet-screen) {
    width: 80%;
  }

  .button-container {
    display: flex;
    gap: 25px;

    .popup-btns {
      @include padding($top: 8px, $right: 15px, $bottom: 8px, $left: 15px);
      @include bg-color-and-text-color($bg-color: rgb(86, 135, 232), $text-color: white);
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      border: none;
      outline: none;
    }
  }
}
</style>
  
  
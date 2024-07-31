<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable-next-line vue/multi-word-component-names -->
<script setup>
function donatePlease() {
  alert('Thanks for donating !')
  console.log('Donation Successful!')
}
</script>

<template>
  <div>
    <h1>Donations</h1>
    <p>thanks for the donation.</p>
    <buttom class="btn" @click="donatePlease"> Donate </buttom>
  </div>
</template>

<style scoped>
.btn {
  background-color: aqua;
  color: rgb(34, 103, 164);
  padding: 0.5 rem 1 rem;
  border: none;
  border-radius: 0.25 rem;
  cursor: pointer;
  margin-top: 10 px;
}
</style>

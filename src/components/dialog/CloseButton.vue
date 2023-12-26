<template>
  <form method="dialog">
    <button
      class="button"
      autofocus
      @click="$emit('closeModal')"
    >
      Close
    </button>
  </form>
</template>

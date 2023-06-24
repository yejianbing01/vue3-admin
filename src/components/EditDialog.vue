<template>
  <t-dialog :visible="visible" @close="$emit('close')"></t-dialog>
</template>

<script lang="ts" setup>
defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  data: {
    type: Object,
    default: null
  }
})
defineEmits(['close'])
</script>

<style lang="" scoped>

</style>
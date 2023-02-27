<template>
  <div>
    register
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "register",
  setup() {
    const register =ref('abc');
    return {
      register,
    };
  },
});
</script>

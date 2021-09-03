<template>
  <div class="px-2 py-2 mt-2 text-2xl rounded bg-purple">{{ name }}</div>
</template>

<script>
export default {
  name: "Brand",
  props: {
    name: String,
  },
};
</script>

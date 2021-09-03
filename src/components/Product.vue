<template>
  <div>
    <div
      class="flex flex-row items-center justify-between h-20 px-4 pb-2 mb-4 font-bold"
      :class="{
        'bg-black': index % 2 === 0,
        darkbg: index % 2 !== 0,
      }"
    >
      <div>
        <h1 class="text-2xl f">{{ name | truncate(25) }}</h1>
        <h1
          class="inline-block px-2 text-sm text-black bg-white border border-white rounded"
          v-if="weight"
        >
          {{ weight }}g
        </h1>
        <h1
          class="inline-block px-2 ml-2 text-sm text-black bg-green-300 border border-white rounded"
          v-if="test_results_thc"
        >
          {{ test_results_thc }}% THC
        </h1>
        <h1
          v-if="flower_type"
          class="inline-block px-2 ml-2 text-sm text-black border border-transparent rounded flower_type"
        >
          {{ flower_type }}
        </h1>
      </div>
      <div class="flex flex-row">
        <div class="text-2xl text-right" v-if="price">
          ${{ price.toFixed(2) }}
          <p class="text-xs">+ tax</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    name: String,
    tags: Array,
    prices: Array,
    weight: String,
    index: Number,
    test_results_thc: String,
    price: Number,
    flower_type: String,
  },
};
</script>
<style scoped>
.darkbg {
  background: #404040;
}
.flower_type {
  background: #63bfbf;
}
</style>

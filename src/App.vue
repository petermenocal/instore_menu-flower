<template>
  <div id="app" class="text-white bg-black">
    <div
      class="fixed top-0 left-0 right-0 flex flex-row items-center justify-between px-8 py-3 mb-4 text-2xl text-right bg-purple"
    >
      <div class="text-6xl font-bold">FLOWER</div>
      <div class="text-4xl italic">
        <h1 class="text-black ">START EARNING REWARDS TODAY!</h1>
        <h1 class="font-bold">EXHALE REWARDS</h1>
        <div class="float-right">
          <AppLogo />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 pt-48">
      <!-- left -->
      <div class="px-6">
        <!-- p list -->
        <div v-for="(x, i) in grouped" :key="i">
          <Brand :name="i" />
          <div v-for="(product, idx) in x" :key="product.id">
            <Product
              :infused="true"
              :name="product.name"
              :index="idx"
              :weight="product.weight"
              :test_results_thc="(product.test_results_thc * 100).toFixed(2)"
              :price="product.sell_price / 100"
              :flower_type="
                product.flower_type ? product.flower_type.name : null
              "
            />
          </div>
        </div>
      </div>
      <div class="px-6">
        <div v-for="(x, i) in grouped2" :key="i">
          <Brand :name="i" />
          <div v-for="(product, idx) in x" :key="product.id">
            <Product
              :name="product.name"
              :index="idx"
              :weight="product.weight"
              :price="product.sell_price / 100"
              :test_results_thc="(product.test_results_thc * 100).toFixed(2)"
              :flower_type="
                product.flower_type ? product.flower_type.name : null
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "./components/Product.vue";
import Brand from "./components/Brand.vue";
import AppLogo from "./components/AppLogo.vue";
import axios from "axios";
import * as _ from "lodash";
import qs from "qs";

export default {
  name: "app",
  components: { Product, Brand, AppLogo },
  data() {
    return {
      products: [],
      grouped: {},
      grouped2: {},
      timer: "",
    };
  },
  created() {
    this.timer = setInterval(this.getData, 10000);
  },
  methods: {
    pageScroll() {
      window.setInterval(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          window.scrollTo(0, 0);
        } else {
          window.scrollBy({ top: 1500, behavior: "smooth" });
        }
      }, 20000);
    },
    getData() {
      const query = qs.stringify({
        _where: { _or: [{ product_type: 1 }] },
      });
      axios({
        url: `https://cms.exhalebrands.com/products?${query}&_limit=1000`,
        method: "GET",
      }).then((s) => {
        let x = _.sortBy(s.data, "brand.name");
        let chunks = Math.ceil(x.length / 2);
        let xx = _.chunk(x, chunks);
        this.grouped = _.groupBy(xx[0], "brand.name");

        this.grouped = _.mapValues(this.grouped, (subArray) =>
          _.sortBy(subArray, "name")
        );
        this.grouped = Object.keys(this.grouped)
          .sort()
          .reduce((obj, key) => {
            obj[key] = this.grouped[key];
            return obj;
          }, {});

        this.grouped2 = _.groupBy(xx[1], "brand.name");

        this.grouped2 = _.mapValues(this.grouped2, (subArray) =>
          _.sortBy(subArray, "name")
        );
        this.grouped2 = Object.keys(this.grouped2)
          .sort()
          .reduce((obj, key) => {
            obj[key] = this.grouped2[key];
            return obj;
          }, {});
      });
    },
  },
  mounted() {
    this.pageScroll();
    this.getData();
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bg-purple {
  background: #8154bf;
}
</style>

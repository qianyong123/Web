<template>
  <div class="box">{{ type }}</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["type"]);

const typeToColorMap = {
  [-1]: "red",
  [0]: "gray",
  [1]: "red",
};

const color = computed(() => typeToColorMap[props.type]);
</script>

<style>
.box {
  width: 25px;
  height: 25px;
  margin: 2px;
  background: v-bind(color);
}
</style>

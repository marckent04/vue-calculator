<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="calculator">
      <div class="screen" v-text="currentDisplay"></div>
      <div class="mt-7">
        <div class="my-4 flex justify-between flex-wrap gap-x-4 gap-y-4">
          <div
            class="keyboard_key"
            v-for="key in keyboard.keys"
            :class="{ invisible: key === '' }"
            @click="processValue(key)"
            :key="key"
            v-text="key"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Calculator } from "./calculator";
import { Keyboard } from "./keyboard";

const keyboard = new Keyboard();

const calculator = ref(new Calculator());

function processValue(value) {
  const specialKeys = ["c", "="];
  if (!specialKeys.includes(value)) {
    calculator.value.addEntry(value);
    return;
  }

  if (value === "c") {
    calculator.value.clear();
  }

  if (value === "=") {
    calculator.value.calculate();
  }
}

const currentDisplay = computed(() => {
  let calculation = calculator.value.getCalulation();
  const result = calculation.replace(/\*/g, "x").replace(/\//g, "÷");

  if (Number.parseFloat(result) && result.length > 15) {
    return Number.parseFloat(result).toFixed(4);
  }
  return result;
});
</script>

<style>
.calculator {
  @apply w-96 p-8 bg-gray-700;
}
.screen {
  @apply bg-green-700 h-24 px-4 text-6xl flex items-center justify-end;
  font-family: "calculator";
}

.keyboard_key {
  @apply bg-slate-800 h-16 w-16 rounded-xl flex justify-center items-center;
  @apply text-xl text-white font-bold cursor-pointer;
}
</style>

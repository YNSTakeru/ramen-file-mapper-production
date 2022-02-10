<template>
  <div
    v-show="show"
    class="
      secondary--text
      rounded-full
      p-2
      w-30
      h-auto
      text-center
      font-bold
      bg-indigo-600
      hover:bg-indigo-400
      transition
      ease-in-out
      duration-1000
    "
  >
    <a :href="link" target="_blank" rel="noopener">
      <div class="text-sm secondary--text transition ease-in-out duration-1000">
        {{ name }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    show: {
      type: Boolean,
    },
    link: {
      type: String,
    },
  },
};
</script>

<style>
</style>
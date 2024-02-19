<template>
    <button type="button" @click="$emit('download')"
        :class="setBackGround() + 'text-white rounded-full p-2 w-8 h-8 focus:outline-none'">
        <ArrowDownTrayIcon aria-hidden="true" />
    </button>
</template>
<script setup lang="ts">
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
const props = defineProps<{ mood: "light" | "dark"; }>()

const setBackGround = () => {
    if (props.mood === "light") {
        return "bg-gray-800 "
    } else {
        return "bg-purple "
    }
}

defineEmits(["download"]);
</script>
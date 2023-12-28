<template>
  <form class="hidden lg:block">
    <Disclosure
      as="div"
      v-for="section in filters"
      :key="section.id"
      class="border-b border-gray-200 py-6"
      v-slot="{ open }">
      <h3 class="-my-3 flow-root">
        <DisclosureButton
          class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span class="font-medium text-gray-900">{{ section.name }}</span>
          <span class="ml-6 flex items-center">
            <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
            <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel class="pt-6">
        <div class="space-y-4">
          <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
            <input
              :id="`filter-${section.id}-${optionIdx}`"
              :name="`${section.id}[]`"
              :value="option.value"
              type="checkbox"
              v-model="option.checked"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{
              option.label
            }}</label>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </form>
</template>
<script setup lang="ts">
  import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
  import { MinusIcon, PlusIcon } from "@heroicons/vue/20/solid";
  import { useFilter } from "../composable/useFilter";
  import type { FilterType } from "../utils/types";
  const props = defineProps<{ filters: FilterType[] }>();

  const filters = useFilter(props);
</script>

<template>
    <div class="pt-8 sm:flex lg:items-end group">
      <div>
        <div class="flex">
            <span class="text-sm text-gray-500">{{ item.accession }}</span>
            <span class="text-sm text-gray-500 ml-2">{{ item.releaseDate }}</span>
            <span v-if="item.releaseFiles" class="text-sm text-gray-500 ml-2">{{ item.releaseFiles }}</span>
            <span v-if="item.releaseViews" class="text-sm text-gray-500 ml-2">{{ item.releaseViews }}</span>
        </div>
        <RouterLink :to="`/study/${item.accession}`" class="mt-3 text-lg font-medium leading-6 hover:cursor-pointer">
            {{ item.title }}
        </RouterLink>
        <h4 class="mt-2 text-lg text-gray-500">
            {{ item.content }}
        </h4>
      </div>
    </div>   
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { SearchItemType } from '@/utils/dummyDataNew';

export default defineComponent({
    name: 'SearchItem',
    props: {
        item: {
            type: Object as () => SearchItemType,
            required: true
        }
    },
    setup(props) {
        const { item } = props;
        return { item };
    }
});

</script>public/dummyData@/utils/dummyData.js
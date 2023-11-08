<template>
    <!-- <div class="px-4 p-4 bg-slate-200 rounded-md mb-2">
        <div class="flex text-gray-400 bg-gray-2">
            <span class="accession">{{ item.accession }}</span>
            <span class="pl-2 release-date">{{ item.releaseDate }}</span>
            <span v-if="item.releaseFiles" class="pl-2 release-files">{{ item.releaseFiles }}</span>
            <span v-if="item.releaseViews" class="pl-2 release-size">{{ item.releaseViews }}</span>
        </div>
        <div class="font-bold text-base text-purple-700 underline underline-offset-[1px] hover:cursor-pointer">
            {{ item.title }}
        </div>
        <div class="text-sm text-gray-700">
            {{ item.content }}
        </div>
    </div> -->
    <div class="pt-8 sm:flex lg:items-end group">
      <div>
        <div class="flex">
            <span class="text-sm text-gray-500">{{ item.accession }}</span>
            <span class="text-sm text-gray-500 ml-2">{{ item.releaseDate }}</span>
            <span v-if="item.releaseFiles" class="text-sm text-gray-500 ml-2">{{ item.releaseFiles }}</span>
            <span v-if="item.releaseViews" class="text-sm text-gray-500 ml-2">{{ item.releaseViews }}</span>
        </div>
        <h2 class="mt-3 text-lg font-medium leading-6 hover:cursor-pointer">
            {{ item.title }}
        </h2>
        <h4 class="mt-2 text-lg text-gray-500">
            {{ item.content }}
        </h4>
      </div>
    </div>   
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { SearchItemType } from 'public/dummyData.js';

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
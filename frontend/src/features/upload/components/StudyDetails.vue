<template>
    <form @submit.prevent="submitForm(() => emits('details-submitted'))" novalidate>
        <div class="mt-6">
            <LargeInputField label="Study Title" inputId="studyTitle" type="text" :value="studyTitle"
                @update:value="studyTitle = $event" :error="studyTitleError" />
        </div>

        <div>
            <LargeInputField label="Study Description" inputId="studyDesc" type="text" :value="studyDesc"
                @update:value="studyDesc = $event" :error="studyDescError" />
        </div>

        <div>
            <div class="flex items-center mb-2">
                <h4 class="text-white text-lg font-bold pb-1">Authors</h4>
                <button type="button" class="text-white ml-2 w-5 h-5 focus:outline-none hover:text-gray-400"
                    @click.prevent="addAuthorField">
                    <PlusCircleIcon aria-hidden="true" />
                </button>
            </div>

            <div v-for="(author, index) in authors" :key="index" class="flex items-center mt-1">
                <Inputfield :label="'Author ' + (index + 1)" :inputId="'authors_' + index" type="text" :value="author"
                    @update:value="(newValue) => updateAuthor(index, newValue)" :error="authorsError[index]" />
                <button v-if="authors.length > 1 && index !== 0"
                    class="flex items-center text-red-600 hover:text-red-400 w-6 h-6 ml-2 mt-7"
                    @click.prevent="removeAuthorField(index)">
                    <MinusCircleIcon />
                </button>
            </div>
        </div>

        <div class="flex justify-left my-4">
            <div class="flex flex-col justify-left">
                <h4 class="text-white text-sm font-medium mb-2">Upload Metadata</h4>
                <UploadButton v-on:file-uploaded="handleFileUpload" />
                <span v-if="metadata?.name && !metadataError" class="text-xs text-gray-400 mt-1">{{ metadata.name }}</span>
                <span v-if="metadataError" class="text-xs text-red-400 mt-1">{{ metadataError }}</span>
            </div>
        </div>

        <button
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-purpleHover focus:outline-none focus:bg-gray-600"
            type="submit">
            Next
        </button>
    </form>
</template>
<script setup lang="ts">
import Inputfield from "@/components/InputFields/Inputfield.vue";
import LargeInputField from "@/components/InputFields/LargeInputField.vue";
import UploadButton from "@/components/Buttons/UploadButton.vue";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/24/solid";
import { useUpload } from "../composables/useUpload";

const emits = defineEmits(["details-submitted"]);
const {
    studyTitle,
    studyDesc,
    studyTitleError,
    studyDescError,
    authors,
    authorsError,
    metadata,
    metadataError,
    addAuthorField,
    removeAuthorField,
    submitForm,
} = useUpload();

const updateAuthor = (index: number, value: string) => {
    const updatedAuthors = [...authors.value];
    updatedAuthors[index] = value;
    authors.value = updatedAuthors;
};

const handleFileUpload = (file: File | null) => {
    if (file) {
        metadata.value = file;
    }
};

defineExpose({submitForm})
</script>

<template>
    <footer class="shadow bg-purple mt-auto p-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">MOSAIC</span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                    <li>
                        <router-link to="/about">
                            <span class="hover:underline me-4 md:me-6">About</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/help">
                            <span class="hover:underline me-4 md:me-6">Help</span>
                        </router-link>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Docs</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 sm:mx-auto border-gray-700 lg:my-8" />
            <span class="block text-sm  sm:text-center text-gray-400">© 2023 MOSAIC. All Rights Reserved.</span>
        </div>
    </footer>
</template>

# Frontend Flow

### Frontend Project Structure
```
frontend
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ tailwind.css
│  ├─ components
│  │  ├─ Buttons
│  │  │  ├─ DownloadButton.spec.ts
│  │  │  ├─ DownloadButton.vue
│  │  │  ├─ UploadButton.spec.ts
│  │  │  └─ UploadButton.vue
│  │  ├─ FileInputField.spec.ts
│  │  ├─ FileInputField.vue
│  │  ├─ InputFields
│  │  │  ├─ InputField.spec.ts
│  │  │  ├─ Inputfield.vue
│  │  │  ├─ LargeInputField.spec.ts
│  │  │  └─ LargeInputField.vue
│  │  ├─ Loading.vue
│  │  ├─ Navbar
│  │  │  ├─ HamburgerMenu.spec.ts
│  │  │  ├─ HamburgerMenu.vue
│  │  │  ├─ MobileSideMenu.spec.ts
│  │  │  ├─ MobileSideMenu.vue
│  │  │  ├─ NavBar.spec.ts
│  │  │  ├─ NavBar.vue
│  │  │  ├─ SearchBar.spec.ts
│  │  │  └─ SearchBar.vue
│  │  ├─ SiteFooter.spec.ts
│  │  ├─ SiteFooter.vue
│  │  └─ toasts
│  │     ├─ DangerToast.spec.ts
│  │     └─ DangerToast.vue
│  ├─ composables
│  │  └─ useCurrentUser.ts
│  ├─ features
│  │  ├─ about
│  │  │  ├─ components
│  │  │  │  ├─ AboutCard.spec.ts
│  │  │  │  └─ AboutCard.vue
│  │  │  └─ index.vue
│  │  ├─ authentication
│  │  │  ├─ components
│  │  │  │  ├─ LoginPage.spec.ts
│  │  │  │  ├─ LoginPage.vue
│  │  │  │  ├─ RegisterPage.spec.ts
│  │  │  │  └─ RegisterPage.vue
│  │  │  ├─ composables
│  │  │  │  ├─ useLogin.ts
│  │  │  │  └─ useRegister.ts
│  │  │  ├─ images
│  │  │  │  ├─ Beatson.jpg
│  │  │  │  ├─ M-logo.png
│  │  │  │  └─ UofG.png
│  │  │  ├─ index.vue
│  │  │  └─ utils
│  │  │     ├─ types.ts
│  │  │     └─ Validation.ts
│  │  ├─ dashboard
│  │  │  ├─ components
│  │  │  │  ├─ EditStudy.spec.ts
│  │  │  │  ├─ EditStudy.vue
│  │  │  │  ├─ PendingStudies.spec.ts
│  │  │  │  ├─ PendingStudies.vue
│  │  │  │  ├─ PendingStudiesTab.spec.ts
│  │  │  │  ├─ PendingStudiesTab.vue
│  │  │  │  ├─ SearchBar.spec.ts
│  │  │  │  ├─ SearchBar.vue
│  │  │  │  ├─ SideBar.spec.ts
│  │  │  │  ├─ SideBar.vue
│  │  │  │  ├─ Studies.spec.ts
│  │  │  │  ├─ Studies.vue
│  │  │  │  ├─ StudiesTab.spec.ts
│  │  │  │  ├─ StudiesTab.vue
│  │  │  │  ├─ UserDetails.spec.ts
│  │  │  │  └─ UserDetails.vue
│  │  │  ├─ image
│  │  │  │  └─ OIP.jpg
│  │  │  ├─ index.vue
│  │  │  └─ utils
│  │  │     ├─ Enums.ts
│  │  │     └─ types.ts
│  │  ├─ help
│  │  │  ├─ components
│  │  │  │  ├─ HelpCard.spec.ts
│  │  │  │  └─ HelpCard.vue
│  │  │  └─ index.vue
│  │  ├─ home
│  │  │  ├─ components
│  │  │  │  ├─ DatabankCard.spec.ts
│  │  │  │  ├─ DatabankCard.vue
│  │  │  │  ├─ MostViewedStudiesCard.spec.ts
│  │  │  │  └─ MostViewedStudiesCard.vue
│  │  │  └─ index.vue
│  │  ├─ search
│  │  │  ├─ components
│  │  │  │  ├─ BackToStudiesButton.spec.ts
│  │  │  │  ├─ BackToStudiesButton.vue
│  │  │  │  ├─ DownloadButton.spec.ts
│  │  │  │  ├─ DownloadButton.vue
│  │  │  │  ├─ MobileSearchFilter.spec.ts
│  │  │  │  ├─ MobileSearchFilter.vue
│  │  │  │  ├─ ResultNotFound.spec.ts
│  │  │  │  ├─ ResultNotFound.vue
│  │  │  │  ├─ SampleDownloadTable.spec.ts
│  │  │  │  ├─ SampleDownloadTable.vue
│  │  │  │  ├─ SearchFilter.spec.ts
│  │  │  │  ├─ SearchFilter.vue
│  │  │  │  ├─ SearchResultsItem.spec.ts
│  │  │  │  └─ SearchResultsItem.vue
│  │  │  ├─ composable
│  │  │  │  ├─ useFilter.ts
│  │  │  │  └─ useSearchResults.ts
│  │  │  ├─ index.vue
│  │  │  └─ utils
│  │  │     ├─ createFilterFormat.ts
│  │  │     ├─ downloadFile.ts
│  │  │     ├─ filterFormat.ts
│  │  │     ├─ FilterFunctions.ts
│  │  │     ├─ sortYesrs.ts
│  │  │     └─ types.ts
│  │  ├─ study
│  │  │  ├─ components
│  │  │  │  ├─ AssaysDataCard.vue
│  │  │  │  ├─ SampleCard.spec.ts
│  │  │  │  ├─ SampleCard.vue
│  │  │  │  ├─ SamplesTable.spec.ts
│  │  │  │  └─ SamplesTable.vue
│  │  │  ├─ composables
│  │  │  │  ├─ setupStudy.ts
│  │  │  │  └─ useStudy.ts
│  │  │  ├─ index.vue
│  │  │  └─ utils
│  │  │     └─ type.ts
│  │  └─ upload
│  │     ├─ components
│  │     │  ├─ Samples.spec.ts
│  │     │  ├─ Samples.vue
│  │     │  ├─ StudyDetails.spec.ts
│  │     │  └─ StudyDetails.vue
│  │     ├─ composables
│  │     │  └─ useUpload.ts
│  │     ├─ index.vue
│  │     └─ utils
│  │        ├─ types.ts
│  │        └─ Validation.ts
│  ├─ main.ts
│  ├─ router
│  │  ├─ index.ts
│  │  └─ parent.vue
│  ├─ stores
│  │  ├─ authStore.ts
│  │  ├─ dashboardStore.ts
│  │  ├─ index.ts
│  │  ├─ searchStore.ts
│  │  ├─ studyStore.ts
│  │  └─ uploadStudyStore.ts
│  └─ utils
│     ├─ api.ts
│     ├─ applyFilter.ts
│     ├─ axiosWrapper.ts
│     ├─ dummyData.ts
│     ├─ dummyDataNew.ts
│     ├─ sortYesrs.ts
│     ├─ types.ts
│     └─ vuex.d.ts
├─ .env
├─ .env.sample
├─ .gitignore
├─ .vite
├─ dockerfile
├─ env.d.ts
├─ index.html
├─ node_modules
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ favicon.ico
├─ README.md
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.mts
└─ vitest.config.mts
````

## Project Structure

Here is a brief overview of the directory structure:

- `src/`: The main source code directory.
  - `App.vue`: The root Vue component.
  - `main.ts`: The entry point for the Vue application.
  - `router/`: Defines the Vue Router configuration.
  - `stores/`: State management using Pinia.
  - `assets/`: Static assets like styles and images.
  - `components/`: Reusable Vue components.
  - `composables/`: Composition API functions.
  - `features/`: Feature-based modules including their components, utils, and more.
  - `utils/`: Utility functions and helpers.

- `.env`, `.env.sample`: Environment configuration files.

- `dockerfile`: Docker configuration for containerization.

- `package.json`, `package-lock.json`: NPM package configuration and lock file.

- `vite.config.mts`, `tsconfig.json`: Configuration for Vite and TypeScript.

- `tailwind.config.js`, `postcss.config.js`: Configuration for TailwindCSS and PostCSS.

## Testing

The unit test files are in the same directory as their corresponding source files.





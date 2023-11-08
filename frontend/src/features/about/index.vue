<template>
    <div class="card">
        <div class="item">
            <h1>About</h1>
            <p>...</p>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
    }
});
</script>

<style scoped>
div {
    margin-top: 30px;
}
.card {
    justify-content: space-around;
    align-items: center; 
    width: 100%; 
    height: 100vh; 
    margin-top: 20px;
    background-color: #f1f1f1;
    padding: 50px;
    box-sizing: border-box;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 70%;
    margin-inline: 20px;
    border-radius: 25px;
    background-color: rgb(61, 96, 143);
    justify-content: center;
    max-width: 100%; 
    box-sizing: border-box;
}



h1 {
    font-family: 'Lato', sans-serif;
    font-size: 36px;
    color: #ffffff;
    margin-top: 15px;
}

p{
    font-size: 24px;
    color: #ffffff;
    margin-top: 15px;
}
</style>
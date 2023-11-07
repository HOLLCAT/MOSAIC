
<template>
    <div>
        <div class="card">
            <div class="item">
                <h1>Databank</h1>
                <table class="data">
                    <tr>
                        <th>Projects</th>
                        <th>Files</th>
                        <th>Genes</th>
                    </tr>
                    
                    <tr>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none"><path d="M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 29V43" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 36H33H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 4V14H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>123</td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none"><path d="M39 4H11C9.89543 4 9 4.89543 9 6V42C9 43.1046 9.89543 44 11 44H39C40.1046 44 41 43.1046 41 42V6C41 4.89543 40.1046 4 39 4Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 30L31 30" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 36H24" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="17" y="12" width="14" height="10" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>456</td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.0002 45C27.2208 45 32.7276 40.8 32.7276 24C32.7276 7.2 27.2208 3 24.0002 3C20.7797 3 15.2729 7.48302 15.2729 24C15.2729 40.517 20.7797 45 24.0002 45Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.10515 35.0001C6.71545 37.8124 13.2479 40.4211 28.364 31.6211C43.48 22.8211 44.5057 15.8124 42.8954 13.0001C41.2851 10.1878 34.4981 7.72728 19.6367 16.3791C4.77521 25.0308 3.49489 32.1878 5.10515 35.0001Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.10506 13.0001C3.4948 15.8124 4.52046 22.8211 19.6366 31.6211C34.7527 40.4211 41.285 37.8124 42.8953 35.0001C44.5056 32.1878 43.2253 25.0308 28.3638 16.3791C13.5024 7.72728 6.71537 10.1878 5.10506 13.0001Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>789</td>
                    </tr>
                    
                    
                </table>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
export default {
    name: "DataBankCard"
}
</script>
  
<style scoped>
div {
    margin-top: 30px;
}
.card {
    font-family: 'Lato', sans-serif;
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
    font-size: 36px;
    color: #ffffff;
    margin-top: 15px;
}

.data{
    width: 100%;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    margin-top: 40px;
}


td {
    width: 33.33%;
    text-align: center;
    vertical-align: middle; 
    padding: 10px; 
}

</style>
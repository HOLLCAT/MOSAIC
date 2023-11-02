<template>
    <nav>
        <div class="nav-left">
            <h1>MOSAIC</h1>
            <router-link to="/" class="left">Home</router-link>
            <router-link to="/about" class="left">About</router-link>
            <router-link to="/help" class="left">Help</router-link>
        </div>
        <div class="nav-right">
            <input class="search-box" type="text" placeholder="Search ...">
            <router-link to="/login" class="left">Login</router-link>
            <router-link to="/register" class="left">Register</router-link>
        </div>
    </nav>
</template>
  
<script>
export default {
    name: "NavBar"
}
</script>
  
<style scoped>
nav {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 50px;
    background-color: rgb(61, 96, 143);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
  
h1 {
    font: 900 36px;
    color: #ffffff;
    margin-right: 30px;
}
  
.nav-left, .nav-right {
    display: flex;
    align-items: center;
    height: 100%;
}
  
.left {
    height: 100%; 
    margin: 0;  
    text-decoration: none;
    color: #ffffff;
    padding: 5px 15px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    border-radius: 15px;
}
  
.left:hover {
    background-color: rgb(21, 16, 41);
}
  
nav .search-box {
      width: 300px;
      height: 20px;
      padding: 10px 15px;
      border: 1px solid #000;  
      border-radius: 15px; 
      margin: 0 20px;
  }
  
  </style>
  
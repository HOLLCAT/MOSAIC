<template>
    <footer class="mt-auto">
        <div class="footer-content">
            <div class="footer-section about">
                <h2>About us</h2>
                <p>We are............</p>
            </div>
            <div class="footer-section links">
                <h2>Quick Links</h2>
                <ul>
                    <li><router-link to="/" class="lk">Home</router-link></li>
                    <li><router-link to="/about" class="lk">About</router-link></li>
                    <li><router-link to="/help" class="lk">Help</router-link></li>
                    <li><router-link to="/contact" class="lk">contact</router-link></li>
                </ul>
            </div>
            <div class="footer-section contact">
                <h2>Contact</h2>
                <p>Email: 123@haha.com</p>
                <p>Phone: 123456</p>
            </div>
        </div>
        
    </footer>
</template>

<script lang="ts">
export default {
    name: "SiteFooter"
}
</script>

<style scoped>
footer {
    background-color: rgb(61, 96, 143);
    color: #ffffff;
    padding: 20px 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
}

.footer-section {
    width: 30%;
}

.footer-section h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.footer-section p, .footer-section li {
    font-size: 14px;
    margin-bottom: 10px;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li .lk {
    color: #ffffff;
    text-decoration: none;
}

.footer-section ul li a:hover {
    text-decoration: underline;
}


</style>

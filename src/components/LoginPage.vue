<template>
    <div class="login-container">
        <h2>Login Page</h2>

        <label>Username:</label>
        <input v-model="username" type="text" placeholder="Enter username" />

        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Enter password" />

        <button @click="login">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.username && this.password) {
                this.$router.push({
                    path: '/home',
                    query: {
                        username: this.username,
                        password: this.password
                    }
                })
            } else {
                alert("Please fill in all fields.")
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    max-width: 350px;
    margin: 100px auto;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #42b983;
}

label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #369e74;
}
</style>

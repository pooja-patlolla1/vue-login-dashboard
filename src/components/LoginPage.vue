<template>
    <div class="login-container">
        <h1>Login Page</h1>
        <form @submit.prevent="login" class="login-form">
            <label>Username:</label>
            <input v-model="username" type="text" placeholder="Enter username" />
            <label>Password:</label>
            <input v-model="password" type="password" placeholder="Enter password" />
            <label>Email:</label>
            <input v-model="email" type="email" placeholder="Enter email" />
            <label>Phone:</label>
            <input v-model="phone" type="text" placeholder="Enter phone number" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            email: '',
            phone: ''
        }
    },
    methods: {
        login() {
            if (!this.username.trim() || !this.password.trim() || !this.email.trim() || !this.phone.trim()) {
                alert('Please fill in all fields.')
                return
            }

            const userData = {
                username: this.username,
                password: this.password,
                email: this.email,
                phone: this.phone
            }

            localStorage.setItem('user', JSON.stringify(userData))

            this.$router.push({ name: 'HomePage' })
        }
    }
}
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.login-form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input {
    padding: 8px;
    margin-top: 4px;
    margin-bottom: 12px;
}

button {
    padding: 10px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
}
</style>

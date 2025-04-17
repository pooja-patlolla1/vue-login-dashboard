<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.phone" placeholder="Phone" />
      <input v-model="form.password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      const { name, email, phone, password } = this.form;
      if (!name || !email || !phone || !password) {
        alert('All fields are required');
        return;
      }

      const userData = {
        id: Date.now(),
        ...this.form
      };

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      storedUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      localStorage.setItem('currentUser', JSON.stringify(userData));

      this.$router.push('/dashboard');
    }
  }
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
input, button {
  margin: 8px 0;
  padding: 10px;
}
</style>

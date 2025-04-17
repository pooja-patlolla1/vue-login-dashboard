<template>
  <div class="dashboard">
    <h1>Dashboard Page</h1>
    <div class="top-bar">
      <button @click="showAddPopup = true">Add</button>
      <span>Welcome</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.password }}</td>
          <td>
            <button @click="editUser(index)">Edit</button>
            <button @click="deleteUser(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Popup -->
    <div v-if="showAddPopup" class="popup">
      <div class="popup-content">
        <h3>{{ editIndex !== null ? 'Edit' : 'Add' }} User</h3>
        <input v-model="form.name" placeholder="Name" />
        <input v-model="form.email" placeholder="Email" />
        <input v-model="form.phone" placeholder="Phone" />
        <input v-model="form.password" placeholder="Password" />
        <button @click="saveUser">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      form: {
        name: '',
        email: '',
        phone: '',
        password: ''
      },
      showAddPopup: false,
      editIndex: null
    };
  },
  mounted() {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  },
  methods: {
    saveUser() {
      const { name, email, phone, password } = this.form;
      if (!name || !email || !phone || !password) {
        alert('All fields required');
        return;
      }

      if (this.editIndex !== null) {
        this.users[this.editIndex] = { ...this.form, id: this.users[this.editIndex].id };
      } else {
        this.users.push({ ...this.form, id: Date.now() });
      }

      localStorage.setItem('users', JSON.stringify(this.users));
      this.resetForm();
    },
    editUser(index) {
      this.form = { ...this.users[index] };
      this.editIndex = index;
      this.showAddPopup = true;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    resetForm() {
      this.form = { name: '', email: '', phone: '', password: '' };
      this.editIndex = null;
      this.showAddPopup = false;
    },
    cancelEdit() {
      this.resetForm();
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  border: 1px solid #ccc;
}
.popup {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>

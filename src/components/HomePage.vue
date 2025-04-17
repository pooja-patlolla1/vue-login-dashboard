<template>
  <div class="dashboard">
    <h1>Dashboard Page</h1>
    <div class="header">
      <span class="welcome-msg">Welcome {{ user.username }}</span>
      <button @click="showAddPopup = true">Add</button>

    </div>

    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <button @click="edit(index)">Edit</button>
            <button @click="remove(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Popup -->
    <div class="popup" v-if="showAddPopup || editIndex !== null">
      <div class="popup-content">
        <h3>{{ editIndex !== null ? 'Edit' : 'Add' }} User</h3>
        <input v-model="form.username" placeholder="Username" />
        <input v-model="form.password" type="password" placeholder="Password" />
        <input v-model="form.email" placeholder="Email" />
        <input v-model="form.phone" placeholder="Phone" />
        <div class="popup-actions">
          <button @click="save">Save</button>
          <button @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      user: {},
      showAddPopup: false,
      editIndex: null,
      form: {
        username: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  mounted() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      this.user = JSON.parse(storedUser)
      this.users.push({ ...this.user })
    }

    const savedList = localStorage.getItem('users')
    if (savedList) {
      this.users = JSON.parse(savedList)
    }
  },
  methods: {
    save() {
      if (!this.form.username || !this.form.password || !this.form.email || !this.form.phone) {
        alert("All fields are required")
        return
      }

      if (this.editIndex !== null) {
        this.users.splice(this.editIndex, 1, { ...this.form })
      } else {
        this.users.push({ ...this.form })
      }

      this.saveToLocal()
      this.cancel()
    },
    edit(index) {
      this.editIndex = index
      this.form = { ...this.users[index] }
    },
    remove(index) {
      this.users.splice(index, 1)
      this.saveToLocal()
    },
    cancel() {
      this.showAddPopup = false
      this.editIndex = null
      this.form = {
        username: '',
        password: '',
        email: '',
        phone: ''
      }
    },
    saveToLocal() {
      localStorage.setItem('users', JSON.stringify(this.users))
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.welcome-msg {
  font-weight: bold;
  font-size: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table,
th,
td {
  border: 1px solid #ccc;
}

th,
td {
  padding: 10px;
}

button {
  margin: 2px;
  padding: 6px 12px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

}

.popup-content {
  background: white;
  padding: 20px;
  padding-right: 2rem;
  border-radius: 10px;
  min-width: 300px;
}

.popup-content input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 10px;
}

.popup-actions {
  margin-top: 10px;
  text-align: right;
}
</style>

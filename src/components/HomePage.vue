<template>
  <div class="container">
    <h1>Dashboard Page</h1>

    <div class="top-bar">
        <h3>Welcome</h3>
        <button class="add-btn" @click="openAddModal">➕ Add</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in entries" :key="index">
          <td>{{ entry.username }}</td>
          <td>{{ entry.email }}</td>
          <td>{{ entry.phone }}</td>
          <td>{{ entry.password }}</td>
          <td>
            <button @click="openEditModal(index)">✏️ Edit</button>
            <button @click="deleteEntry(index)">🗑️ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ isEdit ? 'Edit Entry' : 'Add Entry' }}</h2>

        <label>Name:</label>
        <input v-model="form.username" />

        <label>Email:</label>
        <input v-model="form.email" />

        <label>Phone Number:</label>
        <input v-model="form.phone" />

        <label>Password:</label>
        <input type="password" v-model="form.password" />

        <div class="modal-buttons">
          <button @click="saveEntry">Save</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entries: [],
      showModal: false,
      isEdit: false,
      editIndex: null,
      form: {
        username: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  },

  created() {
    const savedEntries = localStorage.getItem("entries")
    if (savedEntries) {
      this.entries = JSON.parse(savedEntries)
    } else {
      const { username, password } = this.$route.query
      if (username && password) {
        this.entries.push({
          username,
          email: '',
          phone: '',
          password
        })
      }
    }
  }, // <- ✅ Don't forget this comma

  methods: {
    openAddModal() {
      this.resetForm()
      this.isEdit = false
      this.showModal = true
    },
    openEditModal(index) {
      const entry = this.entries[index]
      this.form = { ...entry }
      this.isEdit = true
      this.editIndex = index
      this.showModal = true
    },
    saveEntry() {
      if (this.isEdit) {
        this.entries[this.editIndex] = { ...this.form }
      } else {
        this.entries.push({ ...this.form })
      }
      this.saveToLocalStorage()
      this.closeModal()
    },
    deleteEntry(index) {
      this.entries.splice(index, 1)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem("entries", JSON.stringify(this.entries))
    },
    closeModal() {
      this.showModal = false
    },
    resetForm() {
      this.form = {
        username: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  }
}
</script>


<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.top-bar h3 {
  margin: 0;
}

.add-btn {
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
}

.modal input {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}
</style>

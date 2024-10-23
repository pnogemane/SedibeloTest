<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h2>User Data Table</h2>
      <q-input
        filled
        v-model="search"
        placeholder="Search users"
        class="q-my-md"
        @input="filterUsers"
      />
      <q-select
        v-model="selectedDesignation"
        :options="designations"
        placeholder="Filter by Designation"
        class="q-my-md"
        @input="filterUsers"
      />
      <q-table
        :rows="filteredUsers"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'DataTable',
  setup() {
    const users = ref([]);
    const filteredUsers = ref([]);
    const search = ref('');
    const selectedDesignation = ref('');
    const designations = ref(['Engineer', 'Manager', 'Technician']);
    const pagination = ref({ page: 1, rowsPerPage: 10 });

    const columns = [
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'surname', label: 'Surname', field: 'surname', sortable: true },
      { name: 'designation', label: 'Designation', field: 'designation' },
    ];

    const loadUsers = async () => {
      const { data } = await axios.get('/path/to/users.json');
      users.value = data;
      filteredUsers.value = data;
    };

    const filterUsers = () => {
      filteredUsers.value = users.value.filter((user) =>
        user.name.toLowerCase().includes(search.value.toLowerCase()) &&
        (!selectedDesignation.value ||
          user.designation === selectedDesignation.value)
      );
    };

    onMounted(() => {
      loadUsers();
    });

    return { filteredUsers, columns, search, selectedDesignation, designations, pagination };
  },
};
</script>

<style scoped>
.q-card {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>

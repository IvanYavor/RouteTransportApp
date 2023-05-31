<template>
  <div>
    <h2>Transport List</h2>
    <router-link to="/transports/create" class="create-button">Create Transport</router-link>
     <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
    </div>
    <table>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Status</th>
          <th>Model</th>
          <th>Purchase Date</th>
          <th>Mileage</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transport in transports" :key="transport._id">
          <td>{{ transport.plateNumber }}</td>
          <td>{{ transport.status }}</td>
          <td>{{ transport.model }}</td>
          <td>{{ formatDate(transport.purchaseDate) }}</td>
          <td>{{ transport.mileage }}</td>
          <td>{{ transport.type }}</td>
          <td>
            <router-link :to="`/transports/${transport._id}/edit`">Edit</router-link>
            <button @click="deleteTransport(transport._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transports: [],
      errorMessage: '',
    };
  },
  mounted() {
    this.fetchTransports();
  },
  methods: {
    fetchTransports() {
      axios.get('http://localhost:3000/api/transports')
        .then((response) => {
          this.transports = response.data.data;
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while fetching the transport: ${error.response.data.error}`;
          console.error(error);
        });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    deleteTransport(id) {
      if (confirm('Are you sure you want to delete this transport?')) {
        axios.delete(`http://localhost:3000/api/transport/${id}`)
          .then(() => {
            this.fetchTransports();
          })
          .catch((error) => {
            this.errorMessage = `An error occurred while deleting the routes: ${error.response.data.error}`;
            console.error(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}

.create-button {
  display: inline-block;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  margin: 10
}

button {
  margin-left: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>

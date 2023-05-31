<template>
  <div>
    <h2>Route List</h2>
    <router-link to="/routes/create" class="create-button">Create Route</router-link>
    <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
    </div>
    <table>
      <thead>
        <tr>
          <th>Start City</th>
          <th>End City</th>
          <th>Distance</th>
          <th>Dispatch Date</th>
          <th>Execution Date</th>
          <th>Transport Type</th>
          <th>Expected Pay</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="route in routes" :key="route._id">
          <td>{{ route.startCity }}</td>
          <td>{{ route.endCity }}</td>
          <td>{{ route.distance }}</td>
          <td>{{ formatDate(route.dispatchDate) }}</td>
          <td>{{ formatDate(route.executionDate) }}</td>
          <td>{{ route.transportType }}</td>
          <td>{{ route.expectedPay }}</td>
          <td>{{ route.status }}</td>
          <td>
            <router-link :to="`/routes/${route._id}/edit`">Edit</router-link>
            <button @click="deleteRoute(route._id)">Delete</button>
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
      routes: [],
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchRoutes();
  },
  methods: {
    fetchRoutes() {
      axios.get("http://localhost:3000/api/routes")
        .then((response) => {
          console.log(response);
          this.routes = response.data.data;
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while fetching the routes: ${error.response.data.error}`;
          console.error(error);
        });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    deleteRoute(id) {
      if (confirm('Are you sure you want to delete this route?')) {
        axios.delete(`http://localhost:3000/api/route/${id}`)
          .then(() => {
            this.fetchRoutes();
          })
          .catch((error) => {
            this.errorMessage = `An error occurred while deleting the route: ${error.response.data.error}`;
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
}

button {
  margin-left: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>


<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="startCity">Start City</label>
        <input type="text" id="startCity" v-model="route.startCity" required>
      </div>
      <div>
        <label for="endCity">End City</label>
        <input type="text" id="endCity" v-model="route.endCity" required>
      </div>
      <div>
        <label for="distance">Distance</label>
        <input type="number" id="distance" v-model="route.distance" required>
      </div>
      <div>
        <label for="dispatchDate">Dispatch Date</label>
        <input type="date" id="dispatchDate" v-model="route.dispatchDate.split('T')[0]" required>
      </div>
      <div>
        <label for="executionDate">Execution Date</label>
        <input type="date" id="executionDate" v-model="route.executionDate.split('T')[0]" required>
      </div>
      <div>
        <label for="transportType">Transport Type</label>
        <select id="transportType" v-model="route.transportType" required>
          <option value="CAR">Car</option>
          <option value="TRUCK">Truck</option>
        </select>
      </div>
      <div>
        <label for="expectedPay">Expected Pay</label>
        <input type="number" id="expectedPay" v-model="route.expectedPay" required>
      </div>
      <div>
        <label for="status">Status</label>
        <select id="status" v-model="route.status" required>
          <option value="WAITING">Waiting</option>
          <option value="EXECUTING">Executing</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <div>
        <label for="transportId">TransportId</label>
        <input type="text" id="transportId" v-model="route.transportId" required>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      route: {
        startCity: '',
        endCity: '',
        distance: '',
        dispatchDate: '',
        executionDate: '',
        transportType: 'CAR',
        expectedPay: '',
        transportId: '',
        status: 'WAITING',
      },
      formTitle: '',
      submitButtonText: '',
      transports: [],
      errorMessage: '',
    };
  },
  created() {
    const routeId = this.$route.params.id;
    if (routeId) {
      this.formTitle = 'Edit Route';
      this.submitButtonText = 'Update';
      this.fetchRoute(routeId);
    } else {
      this.formTitle = 'Create Route';
      this.submitButtonText = 'Create';
    }
    this.fetchTransports();
  },
  methods: {
    fetchRoute(id) {
      axios.get(`http://localhost:3000/api/route/${id}`)
        .then((response) => {
          this.route = response.data.data;
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while fetching the route: ${error.response.data.error}`;
          console.error(error);
        });
    },
    fetchTransports() {
      axios.get('http://localhost:3000/api/transports')
        .then((response) => {
          this.transports = response.data.data;
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while fetching transports: ${error.response.data.error}`;
          console.error(error);
        });
    },
    submitForm() {
      if (this.route._id) {
        this.updateRoute();
      } else {
        this.createRoute();
      }
    },
    createRoute() {
      axios.post('http://localhost:3000/api/route', this.route)
        .then(() => {
          this.$router.push('/routes');
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while creating the route: ${error.response.data.error}`;
          console.error(error);
        });
    },
    updateRoute() {
      axios.patch(`http://localhost:3000/api/route`, { ...this.route, id: this.route._id })
        .then(() => {
          this.$router.push('/routes');
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while updating the route: ${error.response.data.error}`;
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input, select {
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>


<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="plateNumber">Plate Number</label>
        <input type="text" id="plateNumber" v-model="transport.plateNumber" required>
      </div>
      <div>
        <label for="status">Status</label>
        <select id="status" v-model="transport.status" required>
          <option value="AVAILABLE">Available</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>
      <div>
        <label for="model">Model</label>
        <input type="text" id="model" v-model="transport.model" required>
      </div>
      <div>
        <label for="purchaseDate">Purchase Date</label>
        <input type="date" id="purchaseDate" v-model="transport.purchaseDate.split('T')[0]" required>
      </div>
      <div>
        <label for="mileage">Mileage</label>
        <input type="number" id="mileage" v-model="transport.mileage" required>
      </div>
      <div>
        <label for="type">Type</label>
        <select id="type" v-model="transport.type" required>
          <option value="CAR">Car</option>
          <option value="TRUCK">Truck</option>
        </select>
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
      transport: {
        plateNumber: '',
        status: 'AVAILABLE',
        model: '',
        purchaseDate: '',
        mileage: '',
        type: 'CAR',
      },
      formTitle: '',
      submitButtonText: '',
      errorMessage: '',
    };
  },
  created() {
    const transportId = this.$route.params.id;
    if (transportId) {
      this.formTitle = 'Edit Transport';
      this.submitButtonText = 'Update';
      this.fetchTransport(transportId);
    } else {
      this.formTitle = 'Create Transport';
      this.submitButtonText = 'Create';
    }
  },
  methods: {
    fetchTransport(id) {
      axios.get(`http://localhost:3000/api/transport/${id}`)
        .then((response) => {
          this.transport = response.data.data;
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while fetching the transport: ${error.response.data.error}`;
          console.error(error);
        });
    },
    submitForm() {
      if (this.transport._id) {
        this.updateTransport();
      } else {
        this.createTransport();
      }
    },
    createTransport() {
      axios.post('http://localhost:3000/api/transport', this.transport)
        .then(() => {
          this.$router.push('/transports');
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while creating the transport: ${error.response.data.error}`;
          console.error(error);
        });
    },
    updateTransport() {
      axios.patch(`http://localhost:3000/api/transport`, { ...this.transport, id: this.transport._id })
        .then(() => {
          this.$router.push('/transports');
        })
        .catch((error) => {
          this.errorMessage = `An error occurred while updating the transport: ${error.response.data.error}`;
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
</style>

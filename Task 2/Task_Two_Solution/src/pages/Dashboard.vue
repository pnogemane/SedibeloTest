<template>
  <q-page class="q-pa-md">
    <q-layout view="hHh lpR fFf">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Advanced User Visualization</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <PieChart :chartData="chartData" />
          </div>
          <div class="col-6">
            <DataTable />
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import PieChart from '../components/PieChart.vue';
import DataTable from '../components/DataTable.vue';
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

export default {
  name: 'Dashboard',
  components: { PieChart, DataTable },
  setup() {
    const chartData = ref({
      labels: ['Engineers', 'Technicians', 'Managers'],
      datasets: [
        {
          data: [10, 5, 2],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
        },
      ],
    });

    const socket = io('wss://challenge.sedilink.co.za:3006');

    socket.on('update', (data) => {
      // Example WebSocket event handling
      chartData.value.datasets[0].data = data.values;
    });

    onMounted(() => {
      socket.connect();
    });

    return { chartData };
  },
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>

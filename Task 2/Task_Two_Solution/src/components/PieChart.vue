<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h2>Real-Time User Data Pie Chart</h2>
      <canvas ref="pieChart"></canvas>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'PieChart',
  props: ['chartData'],
  setup(props) {
    const pieChart = ref(null);
    let chartInstance = null;

    const initializeChart = () => {
      chartInstance = new Chart(pieChart.value, {
        type: 'pie',
        data: props.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          },
        },
      });
    };

    onMounted(() => {
      initializeChart();
    });

    return { pieChart };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 300px;
}
</style>

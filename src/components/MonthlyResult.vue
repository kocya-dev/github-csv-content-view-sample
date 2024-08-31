<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Monthly</h3>
  </div>
  <Bar :data="data" :options="options" />

  <div style="white-space: pre-wrap">{{ text }}</div>
  <button @click="onClick">click</button>
</template>

<script setup lang="ts">
import { MonthlyData } from '../model/domain/monthlyData'
import { ref, onMounted, computed } from 'vue'
import type { ChartData, ChartOptions } from 'chart.js'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{ msg: string }>()
const month = new MonthlyData(2024, 8)
const text = ref('')

const makeData = async () => {
  const records = await month.get()
  let str = props.msg
  records.forEach((r) => {
    str += `${r.name}, ${r.team}, ${r.cost}\n`
  })
  text.value = str
}

const labels = computed(() => {
  let labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return labels
})

const data: ChartData<'bar'> = {
  labels: ['2024-06', '2024-07', '2024-08', '2024-09'],
  datasets: [
    {
      label: 'タイトル',
      backgroundColor: '#E2E2E2',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}
const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      align: 'start',
      labels: {
        boxWidth: 0
      }
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  }
}
onMounted(async () => {
  await makeData()
})

const onClick = async () => {
  await makeData()
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

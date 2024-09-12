<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Monthly</h3>
  </div>
  <!-- <BarChart :title="text" :labels="labels" :dataList="dataList" /> -->
  <div :v-if="isVisible">
    <!--<Bar :data="tmp" :options="options" />-->
    <!--<div class="h-[100px] w-[100px]">-->
    <div>
      <canvas id="barChartCanvas" style="width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BarChart from './BarChart.vue'
import { MonthlyYearData } from '../model/domain/monthlyYearData'
import type { MonthlyYearDataRecord } from '../model/domain/monthlyYearData'
import type { MonthlyDataRecord } from '../model/domain/monthlyData'
import { ref, onMounted, reactive, computed } from 'vue'
import type { ChartData, ChartOptions, ChartDataset } from 'chart.js'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarController,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{ msg: string }>()
const sourceData = new MonthlyYearData(2024)
const srcRef = ref<MonthlyYearDataRecord>()
const tmp = reactive<ChartData<'bar'>>({ labels: [], datasets: [] })
const isVisible = ref(false)

onMounted(async () => {
  isVisible.value = false
  srcRef.value = await sourceData.find('', 'A')

  const inputData: MonthlyDataRecord[][] | undefined = srcRef.value?.data

  const teams = new Set<string>()
  for (const d of inputData as MonthlyDataRecord[][]) {
    if (!d) continue
    d.map((r) => teams.add(r.team))
  }
  const dataSet: { [key: string]: number[] } = {}
  for (const t of teams) {
    dataSet[t] = new Array(inputData!.length).fill(0)
  }

  for (let i = 0; i < inputData!.length; i++) {
    const d = inputData![i]
    if (!d) continue
    for (const t of teams) {
      const result: number = d.filter((r) => r.team === t).reduce((sum, r) => sum + r.cost, 0)
      if (result) {
        dataSet[t][i] += result
      }
    }
  }

  const makeDataSet: ChartDataset<'bar', (number | [number, number] | null)[]>[] = []
  const colors: string[] = ['#00E2E2', '#80E2E2', '#E200E2', '#E280E2', '#E2E200']
  let i = 0
  for (const t of teams) {
    makeDataSet.push({
      label: t,
      data: dataSet[t],
      backgroundColor: colors[i],
      borderWidth: 1
    })
    i++
  }

  tmp.labels = srcRef.value?.labels
  tmp.datasets = makeDataSet

  const opt: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'xxxxx'
      },
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
        stacked: true,
        ticks: {
          stepSize: 0.002
        }
      }
    }
  }
  var canvas = <HTMLCanvasElement>document.getElementById('barChartCanvas')
  const ctx = canvas.getContext('2d')
  new ChartJS(ctx!, {
    type: 'bar',
    data: {
      labels: srcRef.value?.labels,
      datasets: makeDataSet
    },
    options: opt
  })
  isVisible.value = true
})
/*
const labels = computed(() => {
  return srcRef.value?.labels as string[]
})
const getDataSet = computed(() => {
  return srcRef.value?.data
})
const data = computed(async () => {
  srcRef.value = await sourceData.find('', 'A')

  const inputData: MonthlyDataRecord[][] | undefined = srcRef.value?.data

  const teams = new Set<string>()
  for (const d of inputData as MonthlyDataRecord[][]) {
    d.map((r) => teams.add(r.team))
  }
  const dataSet: { [key: string]: number[] } = {}
  for (const t of teams) {
    dataSet[t] = new Array(inputData!.length).fill(0)
  }

  for (let i = 0; i < inputData!.length; i++) {
    const d = inputData![i]
    for (const t of teams) {
      const result: number = d.filter((r) => r.team === t).reduce((sum, r) => sum + r.cost, 0)
      if (result) {
        dataSet[t][i] += result
      }
    }
  }

  const makeDataSet: ChartDataset<'bar', (number | [number, number] | null)[]>[] = []
  const colors: string[] = ['#00E2E2', '#80E2E2', '#E200E2', '#E280E2', '#E2E200']
  let i = 0
  for (const t of teams) {
    makeDataSet.push({
      label: t,
      data: dataSet[t],
      backgroundColor: colors[i]
    })
    i++
  }

  const tmp: ChartData<'bar'> = {
    labels: srcRef.value?.labels,
    datasets: makeDataSet
  }
  return tmp
})
const options = computed(() => {
  const opt: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'xxxxx'
      },
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
        stacked: true,
        ticks: {
          stepSize: 0.005
        }
      }
    }
  }
  return opt
})
  */
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

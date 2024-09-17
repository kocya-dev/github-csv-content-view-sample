<template>
  <div class="greetings">
    <el-input
      v-model="input"
      style="width: 240px"
      placeholder="Please input"
      @keyup.enter="inputOnEnter"
      @keypress="inputOnPress"
    />
    <el-button type="primary" v-on:click="onButtonSearch">検索</el-button>
  </div>
  <div :v-if="isVisible">
    <div>
      <canvas id="barChartCanvas" style="width: 100%; height: 100%; min-height: 600px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MonthlyYearData } from '../model/domain/monthlyYearData'
import type { MonthlyYearDataRecord } from '../model/domain/monthlyYearData'
import type { MonthlyDataRecord } from '../model/domain/monthlyData'
import { ref, onMounted, reactive, computed, defineComponent } from 'vue'
import type { ChartData, ChartOptions, ChartDataset } from 'chart.js'
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

const props = defineProps()
const sourceData = new MonthlyYearData(2024)
const srcRef = ref<MonthlyYearDataRecord>()
const tmp = reactive<ChartData<'bar'>>({ labels: [], datasets: [] })
const isVisible = ref(false)
const input = ref('')
let inputEnterFlag = false
let chartIns: ChartJS | undefined = undefined

onMounted(async () => {
  await updateChart('')
})

computed(async () => {
  await updateChart(input.value)
})

async function inputOnEnter() {
  if (!inputEnterFlag) {
    return
  }
  inputEnterFlag = false
  await updateChart(input.value)
}
function inputOnPress() {
  inputEnterFlag = true
}

async function onButtonSearch() {
  await updateChart(input.value)
}

async function updateChart(keyword: string) {
  isVisible.value = false
  srcRef.value = await sourceData.find('', keyword)

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
          boxWidth: 20
        }
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 0.05
        }
      }
    }
  }
  var canvas = <HTMLCanvasElement>document.getElementById('barChartCanvas')
  const ctx = canvas.getContext('2d')
  if (chartIns) {
    chartIns.data = {
      labels: srcRef.value?.labels,
      datasets: makeDataSet
    }
    chartIns.update()
  } else {
    chartIns = new ChartJS(ctx!, {
      type: 'bar',
      data: {
        labels: srcRef.value?.labels,
        datasets: makeDataSet
      },
      options: opt
    })
  }
  isVisible.value = true
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

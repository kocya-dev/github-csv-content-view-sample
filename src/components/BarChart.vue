<template>
  <Bar :data="data" :options="options" />
</template>

<script lang="ts">
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
import type { ChartData, ChartOptions } from 'chart.js'
import { ref, onMounted, reactive, computed, defineComponent, h } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  props: {
    title: {
      type: String,
      default: ''
    },
    labels: {
      type: Array<string>,
      required: true
    },
    dataList: {
      type: Array<number>,
      required: true
    }
  },
  setup(props) {
    const data: ChartData<'bar'> = {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          backgroundColor: '#E2E2E2',
          data: props.dataList
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
            stepSize: 0.01
          }
        }
      }
    }
    /*
    return {
      data,
      options
    }
      */
    return () =>
      h(Bar, {
        data,
        options
      })
  },
  computed: {
    data(): ChartData<'bar'> {
      return this.data
    },

    options(): ChartOptions<'bar'> {
      return this.options
    }
  }
})
</script>

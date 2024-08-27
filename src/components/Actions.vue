<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Weekly" name="Weekly">Weekly</el-tab-pane>
    <el-tab-pane label="Monthly" name="Monthly"><MonthlyResult msg="test" /></el-tab-pane>
    <el-tab-pane label="Quaterly" name="Quaterly">Quaterly</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import MonthlyResult from '../components/MonthlyResult.vue'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

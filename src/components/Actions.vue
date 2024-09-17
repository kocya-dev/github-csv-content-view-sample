<template>
  <div class="main-contents">
    <div>
      <el-radio-group v-model="dataType" size="large" @change="handleTypeClick" class="left-menu">
        <el-radio-button label="Actions" value="actions" />
        <el-radio-button label="Storage" value="storage" disabled="true" />
      </el-radio-group>
      <el-radio-group v-model="calcUnit" size="large" @change="handleUnitClick" class="right-menu">
        <el-radio-button label="Weakly" value="Weakly" disabled="true" />
        <el-radio-button label="Monthly" value="Monthly" />
        <el-radio-button label="Quaterly" value="Quaterly" disabled="true" />
      </el-radio-group>
    </div>
    <MonthlyResult />
  </div>
</template>

<script lang="ts" setup>
import MonthlyResult from '../components/MonthlyResult.vue'
import { ref } from 'vue'

const dataType = ref('actions')
const calcUnit = ref('Monthly')

const handleTypeClick = (value: string) => {
  dataType.value = value
}
const handleUnitClick = (value: string) => {
  calcUnit.value = value
}
</script>

<style>
.main-contents {
  display: flex;
  flex-flow: column;
}
.left-menu {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;

  float: left;
}
.right-menu {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;

  float: right;
}
</style>

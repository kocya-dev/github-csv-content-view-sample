<script setup lang="ts">
import LeftTable from 'element-plus'
import Actions from './Actions.vue'

import { ref } from 'vue'
import type { TabsInstance } from 'element-plus'

const tabPosition = ref<TabsInstance['tabPosition']>('left')
</script>

<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="padding: 32px" class="demo-tabs">
      <el-tab-pane label="User"><Actions /></el-tab-pane>
      <el-tab-pane label="Config">Config</el-tab-pane>
      <el-tab-pane label="Role">Role</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.demo-tabs > .el-tabs__content {
  padding: 8px 32px 8px 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>

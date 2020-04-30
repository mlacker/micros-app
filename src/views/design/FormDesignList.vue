<template>
    <section class="form-design-list">
      <div class="list-header">
        <el-input v-model="searchString"></el-input>
        <el-button type="primary" @click="addDefine">添加</el-button>
      </div>
      <div class="list-content">
        <template v-for="it in defines">
          <div class="list-item" :key="it.id">
            <p>{{ it.name }}</p>
            <el-button type="primary" plain @click="editDefine(it.id)">编辑</el-button>
            <el-button type="danger" plain @click="deleteDefine(it.id)">删除</el-button>
          </div>
        </template>
      </div>
      <div class="list-footer"></div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from 'axios';

@Component
export default class FormDesignList extends Vue {
  private searchString = ''
  private defines = []

  private async mounted() {
    await this.loadDefines()
  }

  private async loadDefines() {
    this.defines = (await http.get('/form-api/defines')).data
  }

  private addDefine() {
    this.$router.push('/form-design')
  }

  private editDefine(id: number) {
    this.$router.push(`/form-design/${id}`)
  }

  private async deleteDefine(id: number) {
    await http.delete(`/form-api/defines/${id}`)
  }
}
</script>
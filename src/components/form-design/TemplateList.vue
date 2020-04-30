<template>
  <div class="templates-list">
    <div class="template-category" v-for="category in categories" :key="category.name">
      <p class="category-name">{{ category.name }}</p>
      <ul>
        <li
          class="template-item"
          v-for="template in category.templates"
          :key="template.key"
          draggable="true"
          @dragstart="dragstart($event, template)"
        >{{ template.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TemplateList extends Vue {
  private categories = [
    {
      name: "常规",
      templates: [
        { key: "ms-input", name: "文本" },
        { key: "ms-select", name: "选择" },
        { key: "ms-number", name: "数字" },
        { key: "ms-date", name: "日期" },
        { key: "ms-file", name: "文件" },
        { key: "ms-type", name: "数据源？" }
      ]
    },
    {
      name: "容器",
      templates: [
        { key: "ms-table", name: "表格" },
        { key: "ms-list", name: "列表" },
        { key: "ms-grouping", name: "分组" },
        { key: "ms-layout", name: "布局" }
      ]
    },
    {
      name: "扩展",
      templates: [
        { key: "ms-input:phone", name: "手机号" },
        { key: "ms-input:identity", name: "身份证" },
        { key: "ms-identity", name: "标识" },
        { key: "ms-serial", name: "编号" },
        { key: "ms-richtext", name: "富文本" }
      ]
    }
  ];

  private dragstart(event: DragEvent, template: unknown) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("application/json", JSON.stringify(template));
    }
  }
}
</script>

<style lang="scss">
.templates-list {
  .template-item {
    display: block;
    border-bottom: 1px solid #EBEEF5;
  }
}
</style>
<template>
  <section class="form-design">
    <div class="design-header">
      <el-page-header @back="close" content="表单设计"></el-page-header>
    </div>
    <div class="design-area">
      <template-list class="design-area-left" />
      <component-design class="design-area-center"
        :form="define.form"
        @select="selectComponent" />
      <component-options class="design-area-right" :component="state.selectedComponent" />
    </div>
    <div class="hidden-area">
      <!-- <expression-design></expression-design> -->
      <!-- <workflow-design></workflow-design> -->
    </div>
  </section>
</template>

<script lang="ts">
import { Component as VueComponent, Prop, Vue } from "vue-property-decorator";
import TemplateList from "@/components/form-design/TemplateList.vue";
import ComponentDesign from "@/components/form-design/ComponentDesign.vue";
import ComponentOptions from "@/components/form-design/ComponentOptions.vue";
import Define from '@/library/form/Define';
import Component from '@/library/form/Component';

@VueComponent({
  components: {
    TemplateList,
    ComponentDesign,
    ComponentOptions
  }
})
export default class FormDesign extends Vue {
  @Prop()
  private defineId?: number
  private state = {
    selectedComponent: {}
  }
  private define: Define

  constructor() {
    super()
    this.define = new Define()
    this.define.form.children = [
      Component.create('ms-input'),
      Component.create('ms-number')
    ]
  }

  private selectComponent(component: Component) {
    this.state.selectedComponent = component
  }

  private close() {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss">
.form-design {
  height: 100%;
  display: flex;
  flex-direction: column;

  .design-header {
    height: 48px;
    flex: none;
    border-bottom: 1px solid #DCDFE6;

    .el-page-header {
      line-height: 48px;
    }
  }

  .design-area {
    flex: auto;
    display: flex;

    .design-area-left {
      flex: 0 1 320px;
      background-color: #f1ffff;
      border-right: 1px solid #E4E7ED;
    }

    .design-area-center {
      flex: 1 1 640px;
      background-color: #f1f1ff;
    }

    .design-area-right {
      flex: 0 1 320px;
      border-left: 1px solid #E4E7ED;
      background-color: #f1fff1;
    }
  }
}
</style>
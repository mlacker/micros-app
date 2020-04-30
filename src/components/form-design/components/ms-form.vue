<template>
  <div class="ms-form" @drop="drop" @dragover="dragover">
    <div
      class="component"
      v-for="it in form.children"
      :key="it.id"
      @click="selectComponent(it)"
    >{{ it.name }}</div>
  </div>
</template>

<script lang="ts">
import { Component as VueComponent, Vue, Prop } from "vue-property-decorator";
import Component from "@/library/form/Component";

@VueComponent
export default class MsForm extends Vue {
  @Prop()
  private form!: Component;

  private selectComponent(component: Component) {
    this.$emit("select", component);
  }

  private dragover(event: DragEvent) {
    if (event.dataTransfer?.types.includes("application/json")) {
      event.preventDefault();
    }
  }

  private drop(event: DragEvent) {
    const template = JSON.parse(
      event.dataTransfer?.getData("application/json") || ''
    );

    Component.create(template);

    event.preventDefault();
  }
}
</script>

<style lang="scss">
.ms-form {
  height: 100%;
}
</style>
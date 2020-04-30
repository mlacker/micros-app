<template>
    <div class="component-options">
        options
        <p v-if="component">
            {{ component.name }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component as VueComponent, Vue, Prop } from 'vue-property-decorator';
import Component from '@/library/form/Component';

@VueComponent
export default class ComponentOptions extends Vue {
    @Prop()
    private component?: Component
}
</script>

<style lang="scss">

</style>
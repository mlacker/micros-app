<template>
    <div class="component-design">
        <ms-form :form="form" @select="selectComponent" />
    </div>
</template>

<script lang="ts">
import { Component as VueComponent, Prop, Vue } from 'vue-property-decorator';
import FormComponent from '@/library/form/FormComponent';
import Component from '@/library/form/FormComponent';
import MsForm from './components/ms-form.vue'

@VueComponent({
    components: {
        MsForm
    }
})
export default class ComponentDesign extends Vue {
    @Prop()
    private form!: FormComponent

    private selectComponent(component: Component) {
        this.$emit('select', component)
    }
}
</script>

<style lang="scss">

</style>
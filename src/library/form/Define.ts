import FormComponent from './FormComponent'

export default class Define {
    private id: number
    private name: string
    public form: FormComponent

    constructor() {
        this.id = 0
        this.name = ''
        this.form = new FormComponent()
    }
}
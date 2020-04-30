import Template from './Template'

export default class Component {
    private id: number
    private name: string
    private type: string
    private properties: object
    public children?: Component[]

    protected constructor(name: string, type: string) {
        this.id = 0
        this.name = name
        this.type = type
        this.properties = {}
    }

    static create(template: Template): Component {
        const component = new Component(template.name, template.key)
        return component
    }
}

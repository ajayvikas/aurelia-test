import {inject, customElement, children, bindable, ViewCompiler, ViewFactory,
    ViewResources, Container, ViewSlot, noView, inlineView, containerless} from 'aurelia-framework';
import {GridColumn} from "./grid-column";
@customElement("column-renderer")
@containerless()
@noView()
@inject(Element, ViewCompiler, ViewResources, Container, ViewSlot)
export class GridColumnTransclude {
    @bindable $$item = {};
    @bindable column;
    view = null;
    cellSlot: ViewSlot;
    constructor(element: Element,
                viewComplier, 
                viewResources, 
                container, 
                viewSlot) {
            this.viewComplier = viewComplier;
            this.viewResources = viewResources;
            this.container = container;
            this.viewSlot = viewSlot;
    }
    attached(parentElement) {
        let context = this.column.bindingContext;
        this.view = this.column.viewFactory.create(this.container);
        this.view.bind(this, context);
        let index = this.column.grid.columns.indexOf(this.column);
        this.viewSlot.add(this.view);
        this.viewSlot.attached();
    }
    detached() {
        this.viewSlot.detached();
        this.viewSlot.remove(this.view);
        this.view.unbind();
    }
}

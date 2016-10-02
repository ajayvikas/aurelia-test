import {inject, customElement, children, bindable, BindingEngine, Disposable} from 'aurelia-framework';
import {GridColumn} from "./grid-column";
@inject(Element, BindingEngine)
@customElement("grid")
export class Grid {
    @children("grid-column") columns;
    @bindable items = [];
    internalColumns;
    subscriptions;
    constructor(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
    }
    attached() {
        this.internalColumns = this.columns.filter(c => c.show == true);
        this.subscriptions = this.columns.map(c => this.bindingEngine.propertyObserver(c, "show").subscribe((mew, old) => {
            this.internalColumns = this.columns.filter(c => c.show == true);
        }));
    }
    detached() {
        this.subscriptions.forEach(s => s.dispose());
    }
}
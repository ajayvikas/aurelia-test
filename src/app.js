import {CompositionEngine, CompositionContext, ViewSlot} from 'aurelia-templating';
import {customElement, containerless, computedFrom, inject, declarePropertyDependencies, Container} from "aurelia-framework";
import {Origin} from 'aurelia-metadata'
import {Grid} from './grid';

@inject( Element)
export class Main {
    customers = [];
    customerGrid: Grid;
    constructor() {
        let c = [];
        c.push({id: 1, name: "Jake", state: "IL"});
        c.push({id: 2, name: "Eric", state: "NY"});
        c.push({id: 3, name: "Chris", state: "NH"});
        this.customers = c;
    }
    toggleNameColumn() {
        this.customerGrid.columns[1].show = !this.customerGrid.columns[1].show;
    }
}
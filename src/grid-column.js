import {customElement, bindable, inject, ViewFactory, ViewCompiler, ViewResources, inlineView} from 'aurelia-framework';
import {Grid} from "./grid";

@inject(Element, Grid, ViewCompiler, ViewResources)
@customElement("grid-column")
@inlineView('<template><slot></slot></template>')
export class GridColumn {
    @bindable field;
    @bindable title;
    @bindable public show = true;
    public bindingContext;
    public viewFactory;
    constructor(element, grid, viewCompiler, viewResources) {
        this.element = element;
        this.grid = grid;
        this.viewCompiler = viewCompiler;
        this.viewResources = viewResources;
        let innerHtml = element.innerHTML;
        if (innerHtml.trim() == "") {
            let fieldName = element.getAttribute("field");
            if (fieldName)
                innerHtml = `$\{$$item.${fieldName}}`;
        }
        let template = `<template><label>${innerHtml}</label></template>`;
        this.viewFactory = viewCompiler.compile(template, viewResources);
    }
    bind(bindingContext) {
        this.bindingContext = bindingContext;
    }
    //showChanged(mew, old) {
    //    if (mew == "true") this.show = true;
    //    if (mew == "false") this.show = false;
    //}
}
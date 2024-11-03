/** @odoo-module **/

import {Component} from "@odoo/owl";

export class Todo extends Component {
    static template = "owl_playground.todo";

    static props = {
        id: Number,
        description: String,
        done: Boolean,
        toggleState: {type: Function},
        removeTodo: {type: Function},
    };

    onClick() {
        this.props.toggleState(this.props.id);
    }

    onClickRemove() {
        this.props.removeTodo(this.props.id);
    }
}
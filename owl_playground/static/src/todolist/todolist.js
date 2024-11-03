/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {Todo} from "../todo/todo";


export class TodoList extends Component {
    setup() {
        this.todolist = useState([]);
        this.nextId = 1
    }
    
    addTodo(ev) {
        if (ev.keyCode === 13) {
            this.todolist.push({id: this.nextId, description: ev.target.value, done: false});
            this.nextId = this.nextId + 1;
            ev.target.value = "";
        }
    }

    removeTodo (taskId) {
        const index = this.todolist.findIndex((task) => task.id === taskId);
        if (index >= 0) {
            // remove the element at index from list
            this.todolist.splice(index, 1);
        }
    }

    toggleState(taskId) {
        var task = this.todolist.find(task => task.id === taskId)
        task.done = !task.done;
    }

    static template = "owl_playground.todolist";
    static components = {Todo};
}
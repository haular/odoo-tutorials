/** @odoo-module **/

import {Component, useState, useRef} from "@odoo/owl";
import {Counter} from "./counter/counter";
import {TodoList} from "./todolist/todolist";
import {Card} from "./card/card";

export class Playground extends Component {

    static template = "owl_playground.playground";
    static components = {Counter, TodoList, Card};
}
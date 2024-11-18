/** @odoo-module **/

import {loadJS} from "@web/core/assets";
import {Component, onWillUnmount, useRef, useEffect, onWillStart} from "@odoo/owl";
// const { Component, onWillStart, useRef, onMounted, onWillUnmount } = owl;


export class Piechart extends Component {
    setup() {
        this.canvas = useRef("canvas_ref");
        this.chart = null;

        onWillStart(() => {return loadJS("/web/static/lib/Chart/Chart.js")})
        useEffect(() => this.renderChart());
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        })
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvas.el, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                }]
            },
        });
    }

    static template = "owl_playground.pie_chart";

}
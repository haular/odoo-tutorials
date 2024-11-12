/** @odoo-module **/

import {Component, useSubEnv, onWillStart} from "@odoo/owl";
import {getDefaultConfig} from "@web/views/view";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {Domain} from "@web/core/domain";
import {Card} from "./card/card";


class AwesomeDashboard extends Component {
    setup() {
        this.action = useService("action");
        this.rpc = useService("rpc");

        const statisticsText = {
            average_quantity: 'Average amount of t-shirt by order this month',
            average_time: 'Average time for an order to go from ‘new’ to ‘sent’ or ‘cancelled’',
            nb_cancelled_orders: 'Number of cancelled orders this month',
            nb_new_orders: 'Number of new orders this month',
            total_amount: 'Total amount of new orders this month',
        }

        onWillStart(async () => {
            let id = 1
            const result = await this.rpc("/awesome_tshirt/statistics", {});
            for (const key in statisticsText) {
                this.statistics.push({
                    id: id++,
                    value: result[key],
                    text: statisticsText[key]
                })
            }
            console.log(id)
        });

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.display = {controlPanel: {"top-right": false, "bottom-right": false}}
        this.statistics = []
    }

    customerKabanAction() {
        this.action.doAction('contacts.action_contacts')
    }

    customerSaleOrderAction() {
        this.openOrders("[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]")
    }

    customerSaleOrderCancelAction() {
        this.openOrders(
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))," +
            "('state', '=', 'cancel')]"
        )
    }

    openOrders(domain) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t('Last 7 days'),
            res_model: 'sale.order',
            views: [[false, 'kanban'], [false, 'form']],
            domain: new Domain(domain).toList(),
        });
    }
}

AwesomeDashboard.components = {Layout, Card};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);

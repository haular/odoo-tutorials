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

        onWillStart(async () => {
            const result = await this.rpc("/awesome_tshirt/statistics", {});
            this.statistics = result
        });

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.display = {controlPanel: {"top-right": false, "bottom-right": false}}

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

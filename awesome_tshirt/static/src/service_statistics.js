/** @odoo-module **/

import {registry} from "@web/core/registry";
import {memoize} from "@web/core/utils/functions";

const statisticsService = {
    dependencies: ["rpc"],
    start(env, {rpc}) {
        async function _getStatistics() {
            return await rpc("/awesome_tshirt/statistics", {});
        }

        return {
            'loadStatistics': memoize(_getStatistics),
        };
    },
};

registry.category("services").add("awesome_tshirt.statistics", statisticsService);

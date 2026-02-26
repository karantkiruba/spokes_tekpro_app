// Copyright (c) 2025, spokes and contributors
// For license information, please see license.txt
/* eslint-disable */

{% include "spokes_tekpro_app/visit/report/item_wise_purchase_register_rpt/item_wise_purchase_register_rpt.js" %}
frappe.query_reports["GST Itemised Purchase Register - Rpt"] = frappe.query_reports["Item Wise Purchase Register Rpt"]

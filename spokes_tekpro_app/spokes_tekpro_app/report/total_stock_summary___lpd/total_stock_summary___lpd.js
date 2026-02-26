// Copyright (c) 2025, spokes and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Total Stock Summary - LPD"] = {
	"filters": [
		"fieldname": "with_lpd",
            	"label": "With LPD",
            	"fieldtype": "Check",
            	"default": 0,
            	"reqd": 1
	]
};

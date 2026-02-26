// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors and contributors
// For license information, please see license.txt

frappe.query_reports["Stock Balance Rpt"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Company",
			"default": frappe.defaults.get_default("company")
		},
		{
            "fieldname": "date_range_type",
            "label": "Date Range",
            "fieldtype": "Select",
            "options": [
                "Today",
                "Yesterday",
                "This Week",
                "Last Week",
                "This Month",
                "Last Month",
                "This Quarter",
                "Last Quarter",
                "This Year",
                "Last Year",
                "Last 7 Days",
                "Last 14 Days",
                "Last 30 Days",
                "Last 90 Days",
                "Last 6 Months",
                "Custom"
            ],
            "default": "Today",
            "on_change": function(query_report) {
                set_dates(query_report);
            }
        },
        {
            "fieldname": "from_date",
            "label": "From Date",
            "fieldtype": "Date",
            "hidden": 1,
			"default":frappe.datetime.get_today(),
            //"read_only": 1
        },
        {
            "fieldname": "to_date",
            "label": "To Date",
            "fieldtype": "Date",
            "hidden": 1,
			"default":frappe.datetime.get_today(),
            //"read_only": 1
        },
		{
			"fieldname": "item_group",
			"label": __("Item Group"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Item Group"
		},
		{
			"fieldname": "item_code",
			"label": __("Item"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Item",
			"get_query": function() {
				return {
					query: "erpnext.controllers.queries.item_query",
				};
			}
		},
		{
			"fieldname": "warehouse",
			"label": __("Warehouse"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Warehouse",
			get_query: () => {
				let warehouse_type = frappe.query_report.get_filter_value("warehouse_type");
				let company = frappe.query_report.get_filter_value("company");

				return {
					filters: {
						...warehouse_type && {warehouse_type},
						...company && {company}
					}
				}
			}
		},
		{
			"fieldname": "warehouse_type",
			"label": __("Warehouse Type"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Warehouse Type"
		},
		{
			"fieldname":"include_uom",
			"label": __("Include UOM"),
			"fieldtype": "Link",
			"options": "UOM"
		},
		{
			"fieldname": "show_variant_attributes",
			"label": __("Show Variant Attributes"),
			"fieldtype": "Check"
		},
		{
			"fieldname": 'show_stock_ageing_data',
			"label": __('Show Stock Ageing Data'),
			"fieldtype": 'Check'
		},
	],

	"formatter": function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		if (column.fieldname == "out_qty" && data && data.out_qty > 0) {
			value = "<span style='color:red'>" + value + "</span>";
		}
		else if (column.fieldname == "in_qty" && data && data.in_qty > 0) {
			value = "<span style='color:green'>" + value + "</span>";
		}

		return value;
	}
};

erpnext.utils.add_inventory_dimensions('Stock Balance', 8);
function set_dates(query_report) {
    let range = frappe.query_report.get_filter_value("date_range_type");
    let from_date = null;
    let to_date = null;

    let today = frappe.datetime.get_today();

    frappe.query_report.get_filter('from_date').toggle(false);
    frappe.query_report.get_filter('to_date').toggle(false);
    //frappe.query_report.get_filter('from_date').df.read_only = 1;
    //frappe.query_report.get_filter('to_date').df.read_only = 1;

    if (range === "Today") {
        from_date = to_date = today;
    }
    else if (range === "Yesterday") {
        from_date = to_date = frappe.datetime.add_days(today, -1);
    }
    else if (range === "Last 7 Days") {
        from_date = frappe.datetime.add_days(today, -7);
        to_date = today;
    }
    else if (range === "This Week") {
        from_date = frappe.datetime.week_start();
        to_date = frappe.datetime.week_end();
    }
    else if (range === "Last Week") {
        let start = frappe.datetime.week_start();
        from_date = frappe.datetime.add_days(start, -7);
        to_date = frappe.datetime.add_days(start, -1);
    }
    else if (range === "This Month") {
        from_date = frappe.datetime.month_start();
        to_date = frappe.datetime.month_end();
    }
    else if (range === "Last Month") {
        let this_month_start = frappe.datetime.month_start();
        from_date = frappe.datetime.add_months(this_month_start, -1);
        to_date = frappe.datetime.add_days(this_month_start, -1);
    }
     else if (range === "This Quarter") {
        from_date = frappe.datetime.quarter_start();
        to_date = frappe.datetime.quarter_end();
    }
    else if (range === "Last Quarter") {
        from_date = frappe.datetime.add_months(frappe.datetime.quarter_start(), -3);
        to_date = frappe.datetime.add_days(frappe.datetime.quarter_start(), -1);
    }
    else if (range === "This Year") {
        from_date = frappe.datetime.year_start();
        to_date = frappe.datetime.year_end();
    }
    else if (range === "Last 14 Days") {
        from_date = frappe.datetime.add_days(today, -14);
        to_date = today;
    }
    else if (range === "Last 30 Days") {
        from_date = frappe.datetime.add_days(today, -30);
        to_date = today;
    }
    else if (range === "Last 90 Days") {
        from_date = frappe.datetime.add_days(today, -90);
        to_date = today;
    }
    else if (range === "Last 6 Months") {
        from_date = frappe.datetime.add_months(today, -6);
        to_date = today;
    }
    else if (range === "Last Year") {

        let current_year_start = frappe.datetime.year_start();
        from_date = frappe.datetime.add_months(current_year_start, -12);
        to_date = frappe.datetime.add_days(current_year_start, -1);
    }
else if (range === "Custom") {
    frappe.query_report.get_filter('from_date').toggle(true);
    frappe.query_report.get_filter('to_date').toggle(true);

    let from = frappe.query_report.get_filter('from_date');
    let to = frappe.query_report.get_filter('to_date');

    from.df.read_only = 0;
    to.df.read_only = 0;

    from.refresh_input();
    to.refresh_input();

    query_report.set_filter_value("from_date", null);
    query_report.set_filter_value("to_date", null);

    return;
}
    query_report.set_filter_value("from_date", from_date);
    query_report.set_filter_value("to_date", to_date);
}

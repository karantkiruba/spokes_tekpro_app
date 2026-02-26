frappe.query_reports["Target Report - All"] = {
        "filters": [
	{
        "fieldname":"fiscal_year",
        "label": __("Fiscal Year"),
        "fieldtype": "Link",
        "options": "Fiscal Year",
        "default": "2023-2024",
        "reqd" : 1
        },
       {
        "fieldname":"company",
        "label": __("Company"),
        "fieldtype": "Link",
        "options": "Company",
        "reqd" : 1
        },
        {
        "fieldname":"date",
        "label": __("Date"),
        "fieldtype": "Date",
        "default": frappe.datetime.get_today(),
        "reqd": 1,
        }
        ]
        }


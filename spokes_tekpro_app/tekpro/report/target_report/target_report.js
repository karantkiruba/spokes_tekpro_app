frappe.query_reports["Target Report"] = {
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
        "fieldname":"sales_person",
        "label": __("Sales Person"),
        "fieldtype": "Link",
        "options": "Sales Person",
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


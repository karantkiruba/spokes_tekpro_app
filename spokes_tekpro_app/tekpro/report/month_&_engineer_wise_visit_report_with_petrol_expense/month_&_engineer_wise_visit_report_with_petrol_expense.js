frappe.query_reports["Month & Engineer Wise Visit Report with Petrol Expense"] = {
        "filters": [

	{
                        "fieldname":"year",
                        "label": __("Year"),
                        "fieldtype": "Select",
                        "options": ["2019","2020","2021","2022","2023"],
 
                        "reqd": 1
       },
	{
                        "fieldname":"month",
                        "label": __("Visited Month"),
                        "fieldtype": "Select",
                        "options": ["January","February","March","April","May","June","July","August","September","October","November","December"],
                        "reqd": 1
       },
	{
                        "fieldname":"employee",
                        "label": __("Name of the Engineer"),
                        "fieldtype": "Link",
                        "options": "Employee",
                        "reqd": 1
       }


        ]
        }


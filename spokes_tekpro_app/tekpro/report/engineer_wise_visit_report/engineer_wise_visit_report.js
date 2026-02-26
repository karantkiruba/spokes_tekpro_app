frappe.query_reports["Engineer Wise Visit Report"] = {
        "filters": [

	{
                        "fieldname":"year",
                        "label": __("Year"),
                        "fieldtype": "Select",
                        "options": ["2021","2022","2023","2024","2025","2026"],
 
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


        ],

	onload: function (report) {
    const now = new Date();

    report.set_filter_value("year", now.getFullYear().toString());

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    report.set_filter_value("month", months[now.getMonth()]);
}

        }


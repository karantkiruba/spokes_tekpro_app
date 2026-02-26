# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "spokes_tekpro_app",
			"color": "default",
			"icon": "default",
			"type": "module",
			"label": _("spokes_tekpro_app")
		},
                {
                        "module_name": "tekpro",
                        "color": "grey",
                        "icon": "octicon octicon-file-directory",
                        "type": "module",
                        "label": _("tekpro")
                },
	]

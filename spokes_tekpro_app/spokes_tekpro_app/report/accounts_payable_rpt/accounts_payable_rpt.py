

from spokes_tekpro_app.spokes_tekpro_app.report.accounts_receivable_test.accounts_receivable_test import ReceivablePayableReport


def execute(filters=None):
	args = {
		"party_type": "Supplier",
		"naming_by": ["Buying Settings", "supp_master_name"],
	}
	return ReceivablePayableReport(filters).run(args)

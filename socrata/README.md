# YQL tables for Socrata Open Data "Consumer" API

These YQL tables are for the [Socrata Open Data "Consumer" API](http://opendata.socrata.com/api/docs/).





# 19 finance datasets of the World Bank, hosted at socrata.com
https://finances.worldbank.org/page/datasets


IBRD Statement of Loans - Latest Available Snapshot
https://finances.worldbank.org/Loan-and-Credit-Administration/IBRD-Statement-of-Loans-Latest-Available-Snapshot/sfv5-tf7p
=> http://finances.worldbank.org/api/views/sfv5-tf7p/rows.json


Financial Intermediary Funds Funding Decisions
https://finances.worldbank.org/Financial-Intermediary-Funds/Financial-Intermediary-Funds-Funding-Decisions/ax5s-vav5
=> http://finances.worldbank.org/api/views/ax5s-vav5/rows.json



# Examples

Get the id and name of the first 20 Views.

	SELECT id, name FROM socrata.views(0,20)

Get the id and name of the first 20 Views. Sort them by name. (Please mind that this fetches the 20 Views first, and then sorts them)

	SELECT id, name FROM socrata.views(0,20) | sort(field="name")
	
Normally the result limit is 200 for one call to the Socrata API. YQL does the pagination for you, so you can get more in one call if needed.
Get the id and name of the first 201 Views.
	
	SELECT id, name FROM socrata.views(0,201)
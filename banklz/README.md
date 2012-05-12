# banklz.net

YQL tables for [banklz.net](http://banklz.net).

Allows to retrieve information about German banks, based on their bank code.
The underlying API is provided by [railslove.com](http://railslove.com).
**Only works for banks in Germany!**

## Examples

Get information about one bank with code 10070000. Test it in the [YQL Console](http://developer.yahoo.com/yql/console/?env=https://raw.github.com/spier/yql-tables/banklz/alltables_forked.env#h=SELECT%20*%20FROM%20banklz%20WHERE%20bank_code%3D%2210070000%22)

	SELECT * FROM banklz WHERE bank_code="10070000"
	
Only show name, international bank number (bic), and german bank number of this bank 

	SELECT bank-name, bic, code FROM banklz WHERE bank_code="10070000"

Show the first 200 banks (ordered by code)

	SELECT * FROM banklz

Show the first 350 banks

	SELECT * FROM banklz(0,350)



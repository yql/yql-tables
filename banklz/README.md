# banklz.net

YQL tables for [banklz.net](http://banklz.net).

Allows to retrieve information about banks, based on their bank code.
The underlying API is provided by [railslove.com](http://railslove.com).
**Only works for banks in Germany!**

## Examples

Get information about one bank with code 10070000

	SELECT * FROM banklz WHERE bank_code="10070000"
	
Only show name, international bank number (bic), and german bank number of this bank 

	SELECT bank-name, bic, code FROM banklz WHERE bank_code="10070000"

Show the first 200 banks (ordered by code)

	SELECT * FROM banklz

Show the first 350 banks

	SELECT * FROM banklz(0,350)



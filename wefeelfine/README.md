# wefeelfine.org API

YQL tables for the [API](http://www.wefeelfine.org/api.html) of [wefeelfine.org](http://www.wefeelfine.org).

# Examples

* Select the latest 20 collected feelings

		SELECT * FROM wefeelfine.feelings
	
* Select the more feelings (up to 1500 maximum)

		SELECT * FROM wefeelfine.feelings WHERE count=50
	
* Select specific feelings

		SELECT * FROM wefeelfine.feelings WHERE feeling="happy"
		SELECT * FROM wefeelfine.feelings WHERE postdate="2010-12-24"

* Retrieve the full URL of an image

		SELECT * FROM wefeelfine.imageurl WHERE postdate="2006-04-27" AND imageid="p9tzFPjjoxHmtOlujQ7HvQ" 

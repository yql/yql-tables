# wefeelfine.org API

Access to the [API](http://www.wefeelfine.org/api.html) for the data from [wefeelfine.org](http://www.wefeelfine.org).

# Examples

* Select the latest 10 collected feelings
	SELECT * FROM wefeelfine.feelings
	
* Select the more feelings (up to 1500 maximum)
	SELECT * FROM wefeelfine.feelings WHERE count=50
	
* Select specific feelings
	SELECT * FROM wefeelfine.feelings WHERE feeling="happy"
	SELECT * FROM wefeelfine.feelings WHERE gender="femalie"




Use "https://raw.github.com/spier/yql-tables/wefeelfine/wefeelfine/wefeelfine.xml";
Use "https://raw.github.com/spier/yql-tables/wefeelfine/wefeelfine/wefeelfine.imageurl.xml";
SELECT * FROM wefeelfine WHERE  postdate="2006-04-27" AND imageid="p9tzFPjjoxHmtOlujQ7HvQ" AND imagesize="asdf";


http://images.wefeelfine.org/data/images/2006/04-27/1yjdG6D4wMP-fKxgDSNm1Q_full.jpg


-- retrieve the URL for an image
USE "https://raw.github.com/spier/yql-tables/wefeelfine/wefeelfine/wefeelfine.feelings.xml";
USE "https://raw.github.com/spier/yql-tables/wefeelfine/wefeelfine/wefeelfine.imageurl.xml";
SELECT * FROM wefeelfine.imageurl WHERE postdate="2006-04-27" AND imageid="p9tzFPjjoxHmtOlujQ7HvQ";

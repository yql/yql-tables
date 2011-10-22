# YQL tables for APIs of USA Today

Provides access to the [APIs of USA Today][usatoday] via YQL.

NOTE: 
Currently these tables only create YQL mappings for the Article API.
Feel free to add further tables for the APIS of Reviews, Census, etc.
and send a pull request.

## Examples of using the YQL tables

Before you can run the examples below, you need to request an API key from [USA Today][usatoday].
Then you can load the [YQL console][console] and try the examples below, always replacing
`YOUR_API_KEY` with your own API key.

### topnews

** articles from **topnews** (by default returns 10 results)

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.topnews;
	
** more articles from **topnews** (in this case 20)

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.topnews(0,20);

** articles from **topnews** that fall into a certain **section**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.topnews WHERE section='tech';

### searching

* articles matching a **search query**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.search WHERE search='Germany';
	
** articles from a certain **reporter**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.search WHERE reporter='Zillgitt';	

** articles with a given **tag**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.search WHERE tag='barack obama';

### sections

* articles from a specific **section**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.section WHERE section='health';

* articles from a specific **section** and **time range**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.section WHERE section='tech' AND fromdate='2011-10-14' AND todate='2011-10-15';

* **most read** article from a specific **section**

	SET api_key="YOUR_API_KEY" ON usatoday;
	SELECT * FROM usatoday.articles.section WHERE section='tech' AND most='read';


[usatoday]: http://developer.usatoday.com
[console]: http://yhoo.it/usatoday_yql



# YQL Datatables for the API of the Associated Press

The API of the Associated Press requires you to register for an API key. Register for a key at http://developer.ap.org/
There are different Levels of Service, if you you just want to test out the API then I recommend applying for "Sandbox" level.

*References:*

* [AP Developer and our API (Application Programming Interface)](http://developer.ap.org/)
* [YQL Documentation](https://developer.yahoo.com/yql/guide/)

# Example YQL queries

You can try out the following queries in the YQL Console, once your have an API key. Load the YQL console with these AP datatables by using the following link: http://yhoo.it/f3tkrV

## ap.breakingnews.categories

* get all breaking news categories

		SET apiKey='YOUR-KEY-HERE' ON ap; 
		SELECT * FROM ap.breakingnews.categories;
		
* get all breaking news categories, just returning title and link URL

		SET apiKey='YOUR-KEY-HERE' ON ap; 
		SELECT title,link.href FROM ap.breakingnews.categories;		

## ap.breakingnews.content

* get 2 articles from category ID 31990 with full content

		SET apiKey='YOUR-KEY-HERE' ON ap; 
		SELECT * FROM ap.breakingnews.content WHERE categoryID=31990 AND count=2 AND contentOption=2;

* get id,title, and author from the last 5 articles from category ID 31990 (removing duplicate articles by using YQLs unique() functions)

		SET apiKey='YOUR-KEY-HERE' ON ap; 
		SELECT id,title,author FROM ap.breakingnews.content WHERE categoryID=31990 AND count=5 AND contentOption=2 | unique(field="id")

## ap.search

* search for articles contining "oil spill"

		SET apiKey='YOUR-KEY-HERE' ON ap; 
		SELECT title,link.href FROM ap.search WHERE searchTerms="oil spill";
		
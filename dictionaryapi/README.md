# YQL tables for the Merriam-Webster Dictionary API

The [Merriam-Webster Dictionary API](http://www.dictionaryapi.com) is made up of several API endpoints with almost identical syntax. Examples of the API calls are: 

- http://www.dictionaryapi.com/api/v1/references/sd4/xml/baseball?key=YOUR-KEY-GOES-HERE
- http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=YOUR-KEY-GOES-HERE

This YQL table makes accessing the different dictionaries more straight forward by moving them into one API, with different dictionaries. YQL calls look like this:

	SELECT * FROM dictionaryapi WHERE dictionary='collegiate' AND word='hypocrite' AND api_key='YOUR-KEY-GOES-HERE';	
	SELECT * FROM dictionaryapi WHERE dictionary='medical' AND word='doctor' AND api_key='YOUR-KEY-GOES-HERE';
	
The dictionaries that can be accessed via YQL are:

- **collegiate** 	=> Merriam-Webster's Collegiate® Dictionary with Audio
- **thesaurus** 	=> Merriam-Webster's Collegiate® Thesaurus
- **spanish** 		=> Merriam-Webster's Spanish-English Dictionary with Audio
- **medical** 		=> Merriam-Webster's Medical Dictionary with Audio
- **learners** 		=> Merriam-Webster's Learner's Dictionary with Audio
- **sd2** 				=> Merriam-Webster's Elementary Dictionary with Audio (Grades 3-5)
- **sd3**					=> Merriam-Webster's Intermediate Dictionary with Audio (Grades 6-8)
- **sd4** 				=> Merriam-Webster's School Dictionary with Audio (Grades 9-11)	

## Usage Example in YQL Console

	USE "https://raw.github.com/spier/yql-tables/dictionaryapi/dictionaryapi/dictionaryapi.xml" AS dictionaryapi;
	SELECT * FROM dictionaryapi WHERE dictionary='collegiate' AND word='hypocrite' AND api_key='YOUR-KEY-GOES-HERE';

## Please mind that the different dictionaries require different API keys!!!
# YQL Datatables for klout.com

These YQL datatables allow you to easily query [Klout][klout] data via the [klout.com API][klout_api].

[klout]: http://klout.com
[klout_api]: http://developer.klout.com/docs/read/api/API

# Examples of Usage

First load all YQl datatables for klout.com like this:

	USE "https://raw.github.com/spier/yql-tables/klout/klout/klout.score.xml";
	USE "https://raw.github.com/spier/yql-tables/klout/klout/klout.user.show.xml";
	USE "https://raw.github.com/spier/yql-tables/klout/klout/klout.user.topics.xml";
	USE "https://raw.github.com/spier/yql-tables/klout/klout/klout.user.influenced_by.xml";
	USE "https://raw.github.com/spier/yql-tables/klout/klout/klout.user.influencer_of.xml";

Then try either of the YQL queries below. You will need an API key.

## Score for one user

	SELECT * 
	FROM klout.score 
	WHERE api_key="YOUR_API_KEY_HERE" AND users="sebastianspier"
	
## Score for multiple users	

HINT: You can use this syntax to query multiple users for all other queries below as well.

	SELECT * 
	FROM klout.score 
	WHERE api_key="YOUR_API_KEY_HERE" AND users IN ("a","b","c","d","e","f")
	
## User details

	SELECT * 
	FROM klout.user.show 
	WHERE api_key="YOUR_API_KEY_HERE" AND users="sebastianspier"	

## User topics

	SELECT * 
	FROM klout.user.topics 
	WHERE api_key="YOUR_API_KEY_HERE" AND users="sebastianspier"
	
## Influencers

	SELECT * 
	FROM klout.user.influencer_of 
	WHERE api_key="YOUR_API_KEY_HERE" AND users="sebastianspier"

## Influencers

	SELECT * 
	FROM klout.user.influenced_by 
	WHERE api_key="YOUR_API_KEY_HERE" AND users="sebastianspier"


# TODO

The Klout API allows to query a maximum of 5 users in one call.
With YQL you can query more than 5 in one call though, as YQL will translate your query into multiple calls to the Klout API.

As the Klout API rate limit is 10 calls per second, I assume you could query up to 50 users per call (but I have not tried this).

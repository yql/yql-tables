# YQL tables for the ProgrammableWeb API

This is an incomplete set of YQL tables for the [ProgrammableWeb API](http://api.programmableweb.com/). Make sure to read the API documentation in order to explore the full potential of this API.

# Examples

## Find mashups of an API

	SELECT * FROM pw.mashups 
	WHERE apis="google-maps" AND apikey="YOUR_API_KEY"
	
## Display ProgrammableWeb Members from San Francisco

	SELECT * FROM pw.members 
	WHERE query="San Francisco" AND apikey="YOUR_API_KEY"
	
## Retrieve Data of Multiple ProgrammableWeb Members

	SELECT * FROM pw.members 
	WHERE (username="jmusser" OR username="duvander" OR username="spier")
	AND apikey="YOUR_API_KEY"
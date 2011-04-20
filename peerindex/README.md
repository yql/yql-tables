# YQL Datatables for peerindex.net

http://dev.peerindex.net/docs

# Examples of Usage

## Query one twitter user

	USE "https://github.com/spier/yql-tables/raw/peerindex/peerindex/peerindex.profile.xml";  
	SET api_key="YOUR_API_KEY_HERE" ON peerindex;

	SELECT * FROM peerindex.profile WHERE id="PeerIndex"

## Query multiple twitter users

	USE "https://github.com/spier/yql-tables/raw/peerindex/peerindex/peerindex.profile.xml";  
	SET api_key="YOUR_API_KEY_HERE" ON peerindex;
	
	SELECT * FROM peerindex.profile WHERE id="davewiner" OR id="kaykas"  
	
## Advanced: Use twitter search API to find users that are mentioning @peerindex frequently. Then identify the peerindex for these users.	

	USE "https://github.com/spier/yql-tables/raw/peerindex/peerindex/peerindex.profile.xml";  
	SET api_key="YOUR_API_KEY_HERE" ON peerindex;

	SELECT twitter,name,url,peerindex FROM peerindex.profile WHERE id IN (
		SELECT from_user FROM twitter.search WHERE q='peerindex' AND rpp='100' 
		| unique(field="from_user_id_str") | sort(field="yahoo:repeatcount") | tail(10) | reverse()
	) 
	| sort(field="peerindex",descending="true")
# YQL Datatables for peerindex.net

YQL datatables for the [PeerIndex API][peerindex_api].

Note: When you are using the [YQL community tables][yql_community_tables] then you can leave away all the `USE ...` statements in the examples below.

# Examples of Usage

First you need to include the YQL datatables into the [YQL console][yql_console] and set your PeerIndex API key: 

	USE "https://github.com/spier/yql-tables/raw/peerindex/peerindex/peerindex.profile.xml";  
	USE "https://github.com/spier/yql-tables/raw/peerindex/peerindex/peerindex.show.xml";  
	SET api_key="YOUR_API_KEY_HERE" ON peerindex;

## Get the PeerIndex of one twitter user

	SELECT * FROM peerindex.show WHERE id="sebastianspier"
	
### Result

	<json>
	    <name>Sebastian Spier</name>
	    <twitter>sebastianspier</twitter>
	    <slug>sebastianspier</slug>
	    <known>1</known>
	    <authority>32</authority>
	    <activity>45</activity>
	    <audience>33</audience>
	    <peerindex>33</peerindex>
	    <url>http://pi.mu/i2VL</url>
	    <topics>internet and web</topics>
	    <topics>languages</topics>
	    <topics>api</topics>
	    <topics>open source</topics>
	    <topics>software engineering</topics>
	    <benchmark>
	        <name>technology and internet</name>
	        <resonance>41</resonance>
	        <activity>44</activity>
	        <audience>-1</audience>
	    </benchmark>
	    [...]
	    </benchmark>
	    <topics_score>
	        <term>open source</term>
	        <resonance>30</resonance>
	    </topics_score>
	    [...]
	</json>	
	
	
## Query multiple twitter users
	
	SELECT * FROM peerindex.show WHERE id="davewiner" OR id="sebastianspier"  
	
## Advanced: Use twitter search API to find users that are mentioning @peerindex frequently. Then identify the peerindex for these users.	

	SELECT twitter,name,url,peerindex FROM peerindex.profile WHERE id IN (
		SELECT from_user FROM twitter.search WHERE q='peerindex' AND rpp='100' 
		| unique(field="from_user_id_str") | sort(field="yahoo:repeatcount") | tail(10) | reverse()
	) 
	| sort(field="peerindex",descending="true")
	
	
[peerindex_api]: http://dev.peerindex.com/docs
[yql_community_tables]: https://developer.yahoo.com/yql/console/?q=show%20tables&env=store://datatables.org/alltableswithkeys	
[yql_console]: https://developer.yahoo.com/yql/console
	
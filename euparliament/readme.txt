European Parliament Open Data Tables for YQL
Created by Ted DRAKE, Yahoo Inc.

For more information on the data and to get your own API key, visit the European Parliament developer site: http://api.epdb.eu/#data Get your own API key by emailing contact@buhlrasmussen.eu

Description:
There are many different tables that can be combined. Each table will provide an overview of the data. You can then get specific information. Also note, there are three different sources with similar methods. For instance, you can find legislation per year from the EURLEX, PRELEX, and Commission databases. Each will use the year attribute.  Some, such as the legal basis may have different id values for the various data sources.


Sample YQL requests:

Get list of legislation refering to article 113 on the common commercial policy in the Treaty Establishing the European Community
SELECT * FROM euparliament.prelex.legalbasis WHERE legal_basis="Commission%3A++++Trait%C3%A9%2FCEE%2Fart+113" AND key="YOURkey"

Get list of acts in a year
SELECT * FROM euparliament.prelex.year WHERE year="1989" AND key="YOURkey"
SELECT * FROM euparliament.eulex.year WHERE year="1989" AND key="YOURkey"
SELECT * FROM euparliament.commission.year WHERE year="1989" AND key="YOURkey"

 
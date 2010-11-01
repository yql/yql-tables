FCC Open Data Tables for YQL
Created by Ted DRAKE, Yahoo Inc.

For more information on the data, visit the FCC web site: http://reboot.fcc.gov/developer


Sample YQL requests:  

get test results by name
select * from fcc.consumer.broadband.test where (latitude, longitude) in (select latitude,longitude from geo.placefinder(1) where text="Los Angeles")

get the places from an rss feed

getRenewals service
select * from fcc.data.renewals where commonName="Verizon Wireless" and limit="3"

getIssued service
select * from fcc.data.licenses.issued where commonName="Verizon Wireless" and limit="3"

getEntities service
select * from fcc.data.entities where  limit="3"

getCategories
select * from fcc.data.categories where commonName="Verizon Wireless" and limit="3"

getStatus
use "http://doglr.com/fcc/fcc-status-view.xml" AS fcc.view;select * from fcc.data.licenses.status where commonName="Verizon Wireless" and limit="3"

get only the active element (slow performance)
select * from fcc.data.licenses.status where commonName="Verizon Wireless" and statDesc like 'Active%'

getCommonNames
select * from fcc.data.common.name where commonName="Verizon Wireless" and limit="3"   


Changelog 

Nov. 1, 2010 
Initial checkin of tables.   
Removed temp file 
Renamed files with dot syntax for table use    
update readme's sample requests 

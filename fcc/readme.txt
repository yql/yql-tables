FCC Open Data Tables for YQL
Created by Ted DRAKE, Yahoo Inc.

For more information on the data, visit the FCC web site: http://reboot.fcc.gov/developer


Sample YQL requests:  

get test results by name
use "http://doglr.com/fcc/fcc-cons-bb-test.xml" AS fcc.bbtest; select * from fcc.bbtest where (latitude, longitude) in (select latitude,longitude from geo.placefinder(1) where text="Los Angeles")

get the places from an rss feed

getRenewals service
use "http://doglr.com/fcc/fcc-renewals-view.xml" AS fcc.view;select * from fcc.view where commonName="Verizon Wireless" and limit="3"

getIssued service
use "http://doglr.com/fcc/fcc-issued-view.xml" AS fcc.view;select * from fcc.view where commonName="Verizon Wireless" and limit="3"

getEntities service
use "http://doglr.com/fcc/fcc-entities-view.xml" AS fcc.view;select * from fcc.view where  limit="3"

getCategories
use "http://doglr.com/fcc/fcc-categories-view.xml" AS fcc.view;select * from fcc.view where commonName="Verizon Wireless" and limit="3"

getStatus
use "http://doglr.com/fcc/fcc-status-view.xml" AS fcc.view;select * from fcc.view where commonName="Verizon Wireless" and limit="3"

get only the active element (slow performance)
use "http://doglr.com/fcc/fcc-status-view.xml" AS fcc.view;select * from fcc.view where commonName="Verizon Wireless" and statDesc like 'Active%'

getCommonNames
use "http://doglr.com/fcc/fcc-common-name-view.xml" AS fcc.view;select * from fcc.view where commonName="Verizon Wireless" and limit="3"   


Changelog 

Nov. 1, 2010 Initial checkin of tables.

DonorsChoose Open Data Tables for YQL
Created by Ted DRAKE, Yahoo Inc.

For more information on the data and to get your own API key, visit the DonorsChoose developer site: http://developer.donorschoose.org/documentation/project-listing

Description:
This open table is for DonorsChoose's project listings. You can get the following information: title, photo, location, description, amount needed, etc. Get your own API key by emailing apikey@donorschoose.org


Sample YQL requests:

Find projects in Charlotte, North Carolina.
SELECT * FROM donorschoose.projectlist WHERE zone="301" AND community="10007:3" AND APIKey="DONORSCHOOSE"

Find low-cost projects for special education classes
SELECT * FROM donorschoose.projectlist WHERE subject7="-7" AND costToComplete="1" AND APIKey="DONORSCHOOSE"

Find partially funded music programs that big.
SELECT * FROM donorschoose.projectlist WHERE subject1="12" AND costToComplete="4" AND partiallyFunded="yes" AND APIKey="DONORSCHOOSE"

Find iPad based projects
SELECT * FROM donorschoose.projectlist WHERE keywords="ipad" AND APIKey="DONORSCHOOSE"
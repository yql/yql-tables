Recovery.gov open table

This YQL table allows you to track the money spent via the Recovery Act.  http://recovery.gov

Access the most recently updated Recipient Reported data
to build applications for the web, desktop, or mobile devices. Information on how to access the API
and describes the various parameters for retrieving data at http://www.recovery.gov/FAQ/Developer/Pages/RecoveryAPI.aspx.    
                                                                                                                              
Sample queries:
View recovery items in California for 2010
SELECT * FROM recovery.data WHERE recipient_state="CA"  AND calendar_year="2010" limit 15 offset 2

View recovery grants issued to Verizon
SELECT * FROM recovery.data WHERE recipient_name="VERIZON COMMUNICATIONS INC."

View recovery grants issued by the FCC in New York that have been completed
SELECT * FROM recovery.data WHERE funding_agency_code="2700" AND project_status="4"  AND pop_state_cd="NY" limit 25 offset 1  

Changelog
November 2, 2010
Initial creation and addition to github

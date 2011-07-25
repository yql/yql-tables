# YQL tables for silobreaker.com

[silobreaker API documentation](http://api.silobreaker.com/ApiReference.htm)


## TODO
- make types batchable

## Notes
- /documents - max pagesize is 250 (not documented)
- /topStories - "noStories" max seems to be 50 (not documented)
- /entityGraph - "noNodes" max seems to be 100 (not documented)

## Possible API modifications
- "type" is not a good parameter name because there is also another parameter called "types". Should be called "format" instead
- /topStories - "Extras" should be named "extras"
- /documents - endpoint has one parameter "types". the possible values should not contain spaces
BevMo YQL table[s]
==================

bevmo.search
------------

__Description__
  
Searches BevMo's database for any term you specify (and returns suggestions if you were way off).

__Parameters__

- query(string): a term to search for

__Example:__

    use "https://github.com/danbeam/yql-tables/raw/master/bevmo/bevmo.search.xml";
    select * from bevmo.search where query='rex goliath';

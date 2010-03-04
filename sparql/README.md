SPARYQL
-------

SPARQL + YQL = SPARYQL

Try these queries in the [YQL Console][1]

1. Example 1: get all triples from a FOAF file
   <pre><code>
   use "http://triplr.org/sparyql/sparql.xml" as sparql;
   select * from sparql where query="PREFIX foaf: &lt;http://xmlns.com/foaf/0.1/&gt; SELECT $s $p $o FROM &lt;http://www.dajobe.org/foaf.rdf&gt; WHERE { $s $p $o } LIMIT 10"
     and service="http://sparql.org/sparql"
   </code></pre>

2. Example 2: get friend's nick and names from a FOAF file
   <pre><code>
   use "http://triplr.org/sparyql/sparql.xml" as sparql;
   select * from sparql where query="PREFIX foaf: &lt;http://xmlns.com/foaf/0.1/&gt; SELECT $nick $name FROM &lt;http://www.dajobe.org/foaf.rdf&gt; WHERE { $x a foaf:Person . $x foaf:nick $nick . $x foaf:name $name }"
     and service="http://sparql.org/sparql"
   </code></pre>

3. Example 3 - select just one field: value of object triple
   <pre><code>
   use "http://triplr.org/sparyql/sparql.xml" as sparql;
   select result.o.value from sparql where query="PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT $s $p $o FROM <http://www.dajobe.org/foaf.rdf> WHERE { $s $p $o } LIMIT 10"
     and service="http://sparql.org/sparql"
   </code></pre>

***

  [1]: http://developer.yahoo.com/yql/console/

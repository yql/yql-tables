<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:yql="http://query.yahooapis.com/v1/schema/table.xsd">
<!-- <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:yql="http://query.yahooapis.com/v1/schema/table.xsd" xpath-default-namespace="http://query.yahooapis.com/v1/schema/table.xsd"> -->
	
<xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01//EN" />

<xsl:template match="/">
<html>
	<head>
		<title>YQL Table</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
		<script>
			$(document).ready(function() {
				// get the table name from the URL
				var reg_exp = /([a-zA-Z0-9\.]+)\.xml$/i;
				var matches = reg_exp.exec( document.location.href );			
				
				if (matches.length == 2) {
					var table_name = matches[1] ;
					
					// set this table name as the title
					$("#table_name").html( table_name );
					
					// set this table name in the sampleQueries
					$(".sampleQuery").each(function() {
							t = $(this).html().replace(/\{table\}/g,table_name);
							$(this).html(t);
					});
					
					// make all sampleQueries clickable
					$(".sampleQuery").each(function(index) {
						yql_query_str = $(this).html();
						js_call = "javascript:execute_yql('" + yql_query_str.replace(/"/g,"\"") + "')";
						$(this).html("<a>"+ yql_query_str  +"</a>");
						//console.log( $(this).html() );
						$(this).find("a").attr("href",js_call);
						
						//console.log( $(this).find("a") );
						//console.log(js_call);

					});
					
				} // end if
			});	
			
			function execute_yql(yql_query_str) {
				table_url = document.location.href;
				yql_query_str = "USE \"" +  table_url + "\"; " + yql_query_str;
				
				console_url = "http://developer.yahoo.com/yql/console/?q=" + escape(yql_query_str);
				console.log(yql_query_str);
				console.log(console_url);
				window.open(console_url);		
			}	
		</script>
	</head>
  <body>
	
    <h1 id="table_name"> </h1>

		<table id="tableinfo">
			<tbody>
				<tr>
					<td valign="top" align="right" style="font-weight:bold;white-space:nowrap">Author:</td>
					<td style="word-break:break-all;"> <xsl:value-of select="/yql:table/yql:meta/yql:author"/> </td>
				</tr>
				<tr>
					<td valign="top" align="right" style="font-weight:bold;white-space:nowrap">Description:</td>
					<td style="word-break:break-all;"> <xsl:value-of select="/yql:table/yql:meta/yql:description"/> </td>
				</tr>
				<tr>
					<td valign="top" align="right" style="font-weight:bold;white-space:nowrap">Documentation:</td>
					<td style="word-break:break-all;"> 
						<a href="{/yql:table/yql:meta/yql:documentationURL}"> <xsl:value-of select="/yql:table/yql:meta/yql:documentationURL"/> </a> </td>
				</tr>
				<tr>
					<td valign="top" align="right" style="font-weight:bold;white-space:nowrap">Sample Query:</td>
					<td style="word-break:break-all;">
						<ul>
							<xsl:for-each select="/yql:table/yql:meta/yql:sampleQuery">
								<li class="sampleQuery"> <xsl:value-of select="."/>  </li>
					    </xsl:for-each>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>

  </body>
</html>
</xsl:template>

</xsl:stylesheet>
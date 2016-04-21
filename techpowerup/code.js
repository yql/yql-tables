var console = console || {
	info: 	function () {},
	log: 	function () {
		for each(var item in arguments) {
			y.log(item);
		}
	},
	debug: 	function () {},
	warn: 	function () {},
	error: 	function () {}
};

//trim the String
if (!String.prototype.trim) {
   String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}

var validation = null, 
	regex = {}, 
	query = null, 
	d = null, 
	url = '', 
	xpath = '//*[@id="page"]/div[1]/article/div/table/tbody/tr', 
	baseURL = 'http://www.techpowerup.com/gpuz/';

if (id) {
    url = baseURL + id + '/';
}

query = y.query("select * from html where url=@url and xpath=@xpath and compat=@compat", {url: url, xpath: xpath, compat: 'html5'});
var resultObj = y.xmlToJson(query.results);
if (resultObj.results) {
    validation = <validation></validation>;
    var data = [<data></data>, <data></data>];
    for each (var rows in resultObj.results.tr) {
        for (var name in rows) {
        	
            var colData = Array.isArray(rows[name]) ?  rows[name] : [rows[name]];
            for (var i in colData) {
	            var value = (colData[i].content) ? colData[i].content.toString().trim() : colData[i].toString().trim();
	            if (name == 'th') {
	                data[i] = <data><key>{value}</key></data>;
	            } else {
	                data[i].appendChild(<value>{value}</value>);
                        console.log(data[i]);
                        validation.appendChild(data[i]);
	            }
            }
        }
    }
}

response.object = validation;
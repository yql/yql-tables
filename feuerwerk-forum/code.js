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

function getFormattedDate(date) {
        var str = date.getFullYear() + "-" + (parseInt(date.getMonth())+1) + "-" + date.getDate()
        return str;
}

//trim the String
if (!String.prototype.trim) {
   String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

var results = null, 
	regex = {}, 
	query = null, 
	d = null, 
	url = '', 
	xpath = '/html/body/div/div/div/div/form', 
	baseURL = 'http://www.feuerwerk-forum.de';
	
//regex title	
regex.title = {};
regex.title.place = '\\[(.*?)\\]'; // place
regex.title.ws = '(\\s+)'; // White Space 1
regex.title.name = '(.*)'; // event name
regex.title.p = new RegExp(regex.title.place + regex.title.ws + regex.title.name, ['i']);
//regex clock
regex.clock.p = /(((?:2[0-3]||(([0-9]||0[0-9])||1[0-9]))))(:||\\.)([0-5][0-9])/i;
regex.clock.getClock = function(str) {
	console.log(this);
	var results = this.clock.p.exec(str);
	return {
		time: (parseInt(results[1]) + ':' + parseInt(results[6])), 
		h: results[1], 
		m: results[6]
	};
}
//select the calendar -- 1 default germany
calendar = calendar || 1;
if (date) {
    d = Date.parse(date);
} else {
    d = new Date();
}

url = baseURL+'/calendar.php?do=getinfo&day=' + getFormattedDate(d) + '&c=' + calendar;
query = y.query("select * from html where url=@url and xpath=@xpath", {url: url, xpath: xpath});
var resultObj = y.xmlToJson(query.results);
if(resultObj.results) {
    var forms = resultObj.results.form;
    results = <results></results>;
    for (var key in forms) {
                var itemDate = null,
                itemID = null,
                itemPlace = '',
                itemName = '',
                itemTitle = '',
                itemEventType = '',
                itemInfoUrl = '',
                itemInfoDesc = '',
                itemInfo = '',
                item = forms[key];
        itemDate = d;
        itemTitle       = item.table.tr[0].td.p;
        
        for each (var div in item.table.tr[3].td.div) {
            if(div.strong) {
                var type = div.strong.toString().trim().toLowerCase();
                if (type == "Art der Veranstaltung".toLowerCase()) {
                    itemEventType   = div.p;
                } else if (type == "DurchfÃ¼hrende Firma".toLowerCase()) {
                    itemEventCompany   = div.p;
                } else if (type == "Weitere Informationen".toLowerCase()) {
                     if(div.p && div.p.a) {
                        itemInfoUrl     = div.p.a.href;
                        itemInfoDesc    = div.p.a.content;
                    }
                } else {
                    itemInfo += <description>{div}</description>;
                }
            }
            
        }
       
        //time = item.table.tr[3].td.div[2].p;
        for each(var input in item.input) {
            if(input.name == 'e') {
                itemID = input.value;
            }
        }-l


        var m = regex.title.p.exec(itemTitle);
        if (m != null)
        {
          var itemName=m[3];
          var itemPlace=m[1];
        }
        var event = <event>
            <id> {itemID} </id>
            <title> {itemTitle} </title>
            <name> {itemName} </name>
            <place> {itemPlace} </place>
            <date>{itemDate}</date>
            <url>{url}</url>
            <eventType>{itemEventType}</eventType>
            <info>
                <url>{itemInfoUrl}</url>
                <desc>{itemInfoDesc}</desc>
            </info>
            <postMember>
                <url>{baseURL +'/'+ item.table.tr[2].td.table.tr.td[0].a.href}</url>
                <name>{item.table.tr[2].td.table.tr.td[0].a.content}</name>
            </postMember>
            <value>{y.jsonToXml(item)}</value>
        </event>
        if(itemInfo) event.appendChild(itemInfo);
        results.appendChild(event);
        
    }
}

response.object = results;
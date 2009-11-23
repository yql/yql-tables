/*
Javascript "SOAP Client" library

Copyright (C) 2006  Matteo Casati http://www.guru4.net/
Copyright (C) 2009  Tom Hughes-Croucher http://kid666.com/

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

SOAPClient = function() {

	SOAPClientParameters = function() {

		var pl = new Array();

		var serialize = function(o) {
			var s = "";
			switch (typeof(o))
			{
				case "string":
				s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				break;
				case "number":
				case "boolean":
				s += o.toString();
				break;
				case "object":
				// Date
				if (o.constructor.toString().indexOf("function Date()") > -1) {
					var year = o.getFullYear().toString();
					var month = (o.getMonth() + 1).toString();
					month = (month.length == 1) ? "0" + month: month;
					var date = o.getDate().toString();
					date = (date.length == 1) ? "0" + date: date;
					var hours = o.getHours().toString();
					hours = (hours.length == 1) ? "0" + hours: hours;
					var minutes = o.getMinutes().toString();
					minutes = (minutes.length == 1) ? "0" + minutes: minutes;
					var seconds = o.getSeconds().toString();
					seconds = (seconds.length == 1) ? "0" + seconds: seconds;
					var milliseconds = o.getMilliseconds().toString();
					var tzminutes = Math.abs(o.getTimezoneOffset());
					var tzhours = 0;
					while (tzminutes >= 60) {
						tzhours++;
						tzminutes -= 60;
					}
					tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
					tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
					var timezone = ((o.getTimezoneOffset() < 0) ? "+": "-") + tzhours + ":" + tzminutes;
					s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
				} else if (o.constructor.toString().indexOf("function Array()") > -1) {
					// Array
					for (var p in o) {
						if (!isNaN(p)) {
							// linear array
							(/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
							var type = RegExp.$1;
							switch (type) {
								case "":
								type = typeof(o[p]);
								case "String":
								type = "string";
								break;
								case "Number":
								type = "int";
								break;
								case "Boolean":
								type = "bool";
								break;
								case "Date":
								type = "DateTime";
								break;
							}
							s += "<" + type + ">" + serialize(o[p]) + "</" + type + ">";
						} else {
							// associative array
							s += "<" + p + ">" + serialize(o[p]) + "</" + p + ">";
						}
					}
				} else {
					// Object or custom function	
					for (var p in o) {
						s += "<" + p + ">" + serialize(o[p]) + "</" + p + ">";
						break;
					}
				}
				default:
				break;
				// throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
			}
			return s;
		};

		return {
			add : function(name, value) {
				pl[name] = value; 
			},

			toXml : function() {

				default xml namespace = "";
				var xml = <></>;
				for(var p in pl)
				{
					switch(typeof(pl[p])) 
					{
						case "string":
						case "number":
						case "boolean":
						case "object":
						xml += <{p}>{serialize(pl[p])}</{p}>;
						break;
						default:
						break;
					}
				}
				return xml;
			}
		};
	};

	var username = null;
	var password = null;

	var wsdlCache = [];

	var toBase64 = function(input) {
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var output = "";
		var chr1,
		chr2,
		chr3;
		var enc1,
		enc2,
		enc3,
		enc4;
		var i = 0;

		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
			keyStr.charAt(enc3) + keyStr.charAt(enc4);
		}
		while (i < input.length);

		return output;
	};

	var getTypeFromWsdl = function(elementname, wsdlTypes) {
		var type = wsdlTypes[elementname] + "";
		return (type == "undefined") ? "": type;
	};

	var getTypesFromWsdl = function(wsdl) {
		var wsdlTypes = new Array();
		// IE
		var ell = wsdl.getElementsByTagName("s:element");
		var useNamedItem = true;
		// MOZ
		if (ell.length == 0)
		{
			ell = wsdl.getElementsByTagName("element");
			useNamedItem = false;
		}
		for (var i = 0; i < ell.length; i++)
		{
			if (useNamedItem)
			{
				if (ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null)
				wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
			}
			else
			{
				if (ell[i].attributes["name"] != null && ell[i].attributes["type"] != null)
				wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
			}
		}
		return wsdlTypes;
	};

	var extractValue = function(node, wsdlTypes) {
		var value = node.nodeValue;
		switch (getTypeFromWsdl(node.parentNode.nodeName, wsdlTypes).toLowerCase())
		{
			case "s:string":
			return (value != null) ? value + "": "";
			case "s:boolean":
			return value + "" == "true";
			case "s:int":
			case "s:long":
			return (value != null) ? parseInt(value + "", 10) : 0;
			case "s:double":
			return (value != null) ? parseFloat(value + "") : 0;
			case "s:datetime":
			if (value == null) {
				return null;
			}
			else {
				value = value + "";
				value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length: value.lastIndexOf(".")));
				value = value.replace(/T/gi, " ");
				value = value.replace(/-/gi, "/");
				var d = new Date();
				d.setTime(Date.parse(value));
				return d;
			}
			default:
		}
	};

	var node2object = function(node, wsdlTypes) {
		// null node
		if (node == null)
		return null;
		// text node
		if (node.nodeType == 3 || node.nodeType == 4)
		return extractValue(node, wsdlTypes);
		// leaf node
		if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return node2object(node.childNodes[0], wsdlTypes);
		var isarray = getTypeFromWsdl(node.nodeName, wsdlTypes).toLowerCase().indexOf("arrayof") != -1;
		// object node
		if (!isarray)
		{
			var obj = null;
			if (node.hasChildNodes())
			obj = new Object();
			for (var i = 0; i < node.childNodes.length; i++)
			{
				var p = node2object(node.childNodes[i], wsdlTypes);
				obj[node.childNodes[i].nodeName] = p;
			}
			return obj;
		}
		// list node
		else
		{
			// create node ref
			var l = new Array();
			for (var i = 0; i < node.childNodes.length; i++)
			l[l.length] = node2object(node.childNodes[i], wsdlTypes);
			return l;
		}
		return null;
	};

	var soapresult2object = function(node, wsdl) {
		var wsdlTypes = getTypesFromWsdl(wsdl);
		return node2object(node, wsdlTypes);
	};

	var onSendSoapRequest = function(method, wsdl, response) {

		//get namespace
		var ns = wsdl.@["targetNamespace"];
		
		var path = "response.." + method + "Result";

		default xml namespace = ns;
		var nd = eval(path);

		//if (nd.length == 0)
		//nd = getElementsByTagName(req.responseXML, "return");
		// PHP web Service?
		/*if (nd.length == 0)
		{
			if (req.responseXML.getElementsByTagName("faultcode").length > 0)
			{
				if (async || callback)
				o = new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
				else
				throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
			}
		}
		else
		*/
		
		return nd;
	};

	var sendSoapRequest = function(url, method, parameters, wsdl) {
		
		// get namespace
		default xml namespace = "http://schemas.xmlsoap.org/wsdl/http/";
		ns = wsdl.@["targetNamespace"];

		// build SOAP request
		var soap = new Namespace('http://schemas.xmlsoap.org/wsdl/soap/');
		var sr = <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><{method} xmlns={ns}>{parameters.toXml()}</{method}></soap:Body></soap:Envelope>;
	
		//var post = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + sr.toString();
		post = sr;
		var xmlHttp = y.rest(url);		
		
		if (SOAPClient.username && SOAPClient.password) {
			// Some WS implementations (i.e. BEA WebLogic Server 10.0 JAX-WS) don't support Challenge/Response HTTP BASIC, so we send authorization headers in the first request
			xmlHttp.header("Authorization", "Basic " + toBase64(username + ":" + password));
		}

		if (ns.lastIndexOf(/\//) != ns.length - 1) {
			var soapaction = ns + "/" + method;
		} else {
			var soapaction = ns + method;
		}
		xmlHttp.header("SOAPAction", soapaction);
		xmlHttp.header("Content-Type", "text/xml; charset=utf-8");
		xmlHttp.accept("application/xml");

		var response = xmlHttp.post(post).response;
		
		return response;
	};

	var loadWsdl = function(url, method, parameters) {
		var wsdl = wsdlCache[url];

		// if available get from cache
		if(wsdl + "" != "" && wsdl + "" != "undefined") {
			return wsdl;
		} else {
		// otherwise get wsdl and cache it
			var xmlHttp = y.rest(url + "?wsdl");
			wsdl = xmlHttp.get().response;
		
			wsdlCache[url] = wsdl;
			
			return wsdl;
			
		}
		
	};

	return {
		invoke : function(url, method, parameters) {
			wsdl = loadWsdl(url, method, parameters);
			
			var response = sendSoapRequest(url, method, parameters, wsdl);
			//return response;
			var obj = onSendSoapRequest(method, wsdl, response);
			
			var response = <></>;
			response += obj.*;
			
			return response;
			
			//o = soapresult2object(nd, wsdl);
		}
		
		spawnParameters : function() {
			return new SOAPClientParameters;
		}
	};
}();
	



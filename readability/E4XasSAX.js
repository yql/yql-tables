/*
	Explenation:
		I tried to run readabilitySAX on YQL and it failed on larger pages after just
		a couple of ms (it ran out of instructions). Therefore, I wrote this script  
		to fake the existence of the sax parser.
*/

function saxParser(xml, callbacks){
	if(typeof xml !== 'xml')
		throw 'requires xml to process!';
	else if(typeof callbacks !== 'object')
		throw 'please provide callbacks!';
	
	var emptyFunction = function(){},
		onopentag = callbacks.onopentag || emptyFunction,
		onclosetag = callbacks.onclosetag || emptyFunction,
		ontext = callbacks.ontext || emptyFunction; //todo: support further events, options for trim & spaces
	
	function parse(node){
		var elem = {name:node.name().localName,attributes:{}}, 
		    attributeNodes = node.attributes(), 
		    attrNum = attributeNodes.length();
		for(var j = 0; j < attrNum; j++){
		  elem.attributes[attributeNodes[j].name()+''] = attributeNodes[j].toString();
		}
		onopentag(elem);
		
		var childs = node.children(), num = childs.length(), nodeType;
		for(var i = 0; i < num; i++){
			nodeType = childs[i].nodeKind();
			if(nodeType === "text") ontext(childs[i].toString().trim());
    		else if(nodeType === "element") parse(childs[i]);
    		//else if(nodeType === "comment") [...]
		}
		onclosetag(elem.name);
	}
	
	parse(xml);
}
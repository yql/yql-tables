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
		onattribute = callbacks.onattribute,
		ontext = callbacks.ontext || emptyFunction,
		oncomment = callbacks.oncomment || emptyFunction;
		//todo: support further events, options for trim & space normalisation
	
	function parse(node){
		var elem = {name:node.name().localName,attributes:{}}, 
		    attributeNodes = node.attributes(), 
		    attrNum = attributeNodes.length(),
		    j = 0;
		
		for(; j < attrNum; j++){
		  elem.attributes[attributeNodes[j].name()+''] = attributeNodes[j].toString();
		}
		onopentag(elem);
		
		if(onattribute)
			for(j in elem.attributes) onattribute({ name: j, value: elem.attributes[j] });
		
		var childs = node.children(), num = childs.length(), nodeType;
		for(var i = 0; i < num; i++){
			nodeType = childs[i].nodeKind();
			if(nodeType === "text") ontext(childs[i].toString());
    		else if(nodeType === "element") parse(childs[i]);
    		else if(nodeType === "comment") oncomment(childs[i].toString());
    		//[...]
		}
		onclosetag(elem.name);
	}
	
	parse(xml);
}
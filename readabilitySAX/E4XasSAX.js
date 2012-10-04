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
	
	//todo: support further events, options for trim & space normalisation
	
	function parse(node){
		var name = node.name().localName,
		    attributes = {},
		    attributeNodes = node.attributes(), 
		    attrNum = attributeNodes.length(),
		    j = 0;
		
		for(; j < attrNum; j++){
		  attributes[attributeNodes[j].name()+''] = attributeNodes[j].toString();
		}
		
		callbacks.onopentag(name, attributes);
		
		var childs = node.children(), num = childs.length(), nodeType;
		for(var i = 0; i < num; i++){
			nodeType = childs[i].nodeKind();
			if(nodeType === "text") callbacks.ontext(childs[i].toString());
    			else if(nodeType === "element") parse(childs[i]);
    			//else if(nodeType === "comment") callbacks.oncomment(childs[i].toString());
    			//[...]
		}
		callbacks.onclosetag(name);
	}
	
	parse(xml);
}
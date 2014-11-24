
/*
 * Function called for any ListMessage api call
 */

function listMessagesReq(){
	
	var method = 'ListMessages';
	var params = '[{}]';
	
	
	//If Null then set to Inbox - This creates a problem when executed with Search hence not having any default value for fid in inputs element
	if(inputs['fid'] == null){
		inputs['fid'] = "Inbox";
	}
	
	var fid = escape(inputs['fid']);
	
	params = '[{' +
                 '    "fid"           : "' + fid + '",' +
                 '    "startMid"      : ' + inputs['startMid'] + ',' +
                 '    "numMid"        : ' + inputs['numMid'] + ',' +
                 '    "startInfo"     : ' + inputs['startInfo'] + ',' +
                 '    "numInfo"       : ' + inputs['numInfo'] +
                 '}]';

	content = '{' +
	           		'"method" : "' + method + '",' +
		          	'"params" : ' + params +
		      '}';

	var listMsgReq = '{' +
		            	'"method" : "' + method + '",' +
		            	'"params" : ' + params +
		            '}';

	return listMsgReq;
}

/*
 *  Function used for building GetMessage request
 */

function buildMsgParams(){
	
	
	var messageIds = [];

	var methodReq = {
		method : "GetMessage",
		params : []
	};
			
	var message = [];
			
	for(i=0; i<mids.length; i++) {
		message.push({
			"mid": mids[i].toString()
	 	});
	}
			
	methodReq.params.push({
		"fid": inputs['fid'],
		"message" : message ,
		"charsetHint" : inputs['charsetHint']
	});

	return methodReq;

}

/*
 * Function to build Search Message request
 */


function searchMessagesReq(){
	
	
	/*
		'"to": "' +inputs['to']+ '"' + ',' +
		'"from": "' +inputs['from']+ '"' + ',' +
		'"cc": "' +inputs['cc']+ '"' + ',' +
		'"bcc": "' +inputs['bcc']+ '"' + ',' +
		'"subject": "' +inputs['subject']+ '"' + ',' +
		'"attachmenttype": "' +inputs['attachmenttype']+ '"' + ',' +
		'"attachmentname": "' +inputs['attachmentname']+ '"' + ',' +
		'"attachment": "' +inputs['attachment']+ '"' + ',' +
		'"attachmentlanguages": "' +inputs['attachmentlanguages']+ '"' + ',' +
		'"attachmentcount": "' +inputs['attachmentcount']+ '"' + ',' +
		'"flags": "' +inputs['flags']+ '"' + ',' +
	*/
	var ymwsMethod = "SearchMessages";
	
	var searchParams = new String();	

	if (inputs['to'] != null){
		searchParams += 'to:"' +inputs['to']+ '" '; 
	}
	//Using fr instead of from because YQL query gets confused.
	if (inputs['fr'] != null){
		searchParams += 'from:"' +inputs['fr']+ '" ';
	}
	if (inputs['cc'] != null){
		searchParams += 'cc:"' +inputs['cc'] + '" ';
	}
	if (inputs['bcc'] != null){
		searchParams += 'bcc:"' +inputs['bcc'] + '"' + ' ' ;
	}
	if (inputs['subject'] != null){
		searchParams += 'subject:"' +inputs['subject']+ '" '  ;
	}
	if (inputs['attachmenttype'] != null){
		searchParams += 'attachmenttype:"' +inputs['attachmenttype'] + '"' + ' ' ;
	}
	if (inputs['attachmentname'] != null){
		searchParams += 'attachmentname:"' +inputs['attachmentname'] + '"' + " ";
	}
	if (inputs['attachment'] != null){
		searchParams += 'attachment:"' +escape(inputs['attachment']) +'"' + " ";
	}
	if (inputs['attachmentlanguages'] != null){
		searchParams += 'attachmentlanguages:"' +escape(inputs['attachmentlanguages'])+ '"' + " " ;
	}
	if (inputs['attachmentcount'] != null){
		searchParams += 'attachmentcount:"' +escape(inputs['attachmentcount']) + '"' +' ' ;
	}
	if (inputs['flags'] != null){
		searchParams += 'flags:"' +escape(inputs['flags']) +'"' + " ";
	}
	if (inputs["fid"] != null){
		searchParams += 'folder:' +escape(inputs['fid'])+ ' ';	
	}
	if (inputs['query'] != null){
		searchParams += inputs['query'];
	}
	
	var jsonStr = JSON.stringify(searchParams);
	//y.log(jsonStr);

	// get parameters for the given cascade method
	var params = '[{' +
			'     "search": {' +
								'"query":' +jsonStr+ 
							'}' +',' +
				 '"numInfo": "' +inputs['numInfo'] +'",' + 
				 '"numMid": "' +inputs['numMid']+ '",' +
				 '"sortKey": "'+inputs['sortKey']+ '",' +
				 '"sortOrder": "' +inputs['sortOrder']+ '",' +
				 '"refineBy": "' +inputs['refineBy']+ '"' +
			 '}]';

			
	var content = '{' +
	            '"method" : "' + ymwsMethod + '",' +
	            '"params" : ' + params +
        	  '}';

	return content;
	
}

var document = {getElementsByTagName:function(value) { return null; }};

y.include("http://oauth.googlecode.com/svn/code/javascript/oauth.js");
y.include("http://oauth.googlecode.com/svn/code/javascript/sha1.js");

function sendRequest(args)
{
   switch(args.method) {
   	 case 'POST': 
       return postRequest(args);
     case 'PUT':
       return putRequest(args);
     case 'DELETE':
       return deleteRequest(args);
     case 'GET':
     default:
       return getRequest(args);
   }
   return null;
}

function getRequest(args)
{
   var auth = (args.accessor) ? oAuthSignRequest(args) : null;

   var rsp = null;
   try {
      if(auth) request.header('Authorization', auth.header);
      rsp = request.get().response;
   } catch(err) {
      rsp = {'result':'failure', 'error': err};
   }
   return rsp;
}

function postRequest(args)
{
   var data = oAuthBuildContent(args.parameters);
   var auth = (args.accessor) ? oAuthSignRequest(args) : null;

   var rsp = null;
   try {
      if(auth) request.header('Authorization', auth.header);
      rsp = request.post( data ).response;
   } catch(err) {
      rsp = {'result':'failure', 'error': err};
   }
   return rsp;
}

function putRequest(args)
{
   var data = oAuthBuildContent(args.parameters);
   var auth = (args.accessor) ? oAuthSignRequest(args) : null;

   var rsp = null;
   try {
      if(auth) request.header('Authorization', auth.header);
      rsp = request.put( data ).response;
   } catch(err) {
      rsp = {'result':'failure', 'error': err};
   }
   return rsp;
}

function deleteRequest(args)
{
   var auth = (args.accessor) ? oAuthSignRequest(args) : null;
   
   var rsp = null;
   try {
      if(auth) request.header('Authorization', auth.header);
      rsp = request.del().response;
   } catch(err) {
      rsp = {'result':'failure', 'error': err};
   }
   return rsp;
}

function oAuthBuildContent(content) 
{
   var components = [];
   for(var i=0, count=content.length; i<count; i++) {
      var item = content[i];
      var key = item[0];
      var value = encodeURIComponent(item[1]);
      
      components.push(key+'='+value);
   }
   return components.join('&');
}

function oAuthSignRequest(args)
{
   var accessor = args.accessor;
   
   var message = {};
   message.action = args.action || request.url;
   message.method = args.method || 'GET';
   message.parameters = args.parameters || null;
   
   OAuth.setTimestampAndNonce(message);
   OAuth.setParameter(message, "oauth_consumer_key", accessor.consumerKey);
   OAuth.setParameter(message, "oauth_version", '1.0');

   if(accessor.token) {
      OAuth.setParameter(message, "oauth_token", accessor.token);
   }
   
   OAuth.SignatureMethod.sign(message, accessor);
   
   var realm = accessor.realm || '';
   var header = OAuth.getAuthorizationHeader(realm, message.parameters);
   var auth = {message:message, accessor:accessor, header:header};
   
   if(args.debug==true) {
      y.log(auth);
   }
   
   return auth;
}
function getLongURL(url){
	var response = y.rest(url).followRedirects(false).head();
	if(response.status === 301 || response.status === 302)
		return getLongURL(response.headers.location);
	else return url;
}
var fs 			= 	require('fs'),
	url 		= 	require('url')
	query 		= 	require('querystring'),
	httpProxy 	= 	require('http-proxy');
	
	
var analyzer = (function(){
	var config = {
		port		:	8080,
		host		:	'all',
		logfile		:	'log.txt',
		toLogged	:	''
	};
	function init(){
		process.argv.forEach(function (val, index, array) {
		  switch(val){
		  	case '-p':
		  	case '--port':
		  		config.port = array[index + 1];
		  		break;
		  	case '--host':
		  	case '-h':
		  		config.host = array[index + 1];
		  		break;
		  	case '-l':
		  	case '--l':
		  		config.logfile = array[index + 1];
		  	default:
		  		break;
		  }
		});
	};
	function logData(data){
		fs.exists(config.logfile, function(exists) {
  			if (!exists) {
  				fs.writeFile(config.logfile, data + "\n", function(err) {
				    if (err){
						console.log("Can't write to " + config.logfile + " ,following exception occured!");
						throw err;
					}
				}); 
  			} else {
  				fs.appendFile(config.logfile,data + "\n",function(err){
					if (err){
						console.log("Can't write to " + config.logfile + " ,following exception occured!");
						throw err;
					}
				});
  			}
		});
	};
	function requestAnalyzer(request){ 
		if (config.host != 'all' && request.headers['host'] != config.host)
			return;
		var params = {
			host:'',
			url:'',
			get:'',
			post:'',
			cookies:'',
		};
		params.host 	= 	request.headers['host'];
		params.url		=	request.url;
		params.get		=	url.parse(request.url,true).query;
		params.cookies	=	request.headers.cookie;
		if(request.method	==	'POST') {
			var body='';
	        request.on('data', function (data) {
				body +=data;
	        });
			request.on('end',function(){        
				params.post =  query.parse(body);
			});
	    }
	    logData(JSON.stringify(params));
	    	
	};
	return {
		config	:	config,
		init	:	init,
		analize : 	requestAnalyzer
	};
})();

analyzer.init();


httpProxy.createServer(function(request,response,proxy){	
	proxy.proxyRequest(request, response, {
    	host: request.headers['host'],
    	port: 80
  	});
  	
  	analyzer.analize(request);
  	
}).listen(analyzer.config.port);

console.log("\n\n\nProxy server is ready on localhost:"+ analyzer.config.port + " for " + analyzer.config.host + " host(s)");
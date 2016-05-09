var https = require('https');
var token = "EAACEdEose0cBAImorAWIPHSQyzZCgkwZCoW2JPyL1gRJKMIURxNU254HDxLVJw2cyoZArCDG4DB0sgF81HisZAa6soZBTIGTsgWfAiDD6rQV0pPa1NQ1VZC3cFLhgcC1hCZAr0bgguJsT04KSx85sZAvfUItpz3FVZCuGLMxvxjSZBhEDZBpSA30Jyo";

exports.getFbData = function(accessToken, apiPath, callback) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: apiPath + '?access_token=' + token, //apiPath example: '/me/friends'
        method: 'GET'
    };
    console.log('Trying to hit the URL " ' + options.host + ':' + options.port + options.path);
    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from facebook.getFbData: ' + e.message)
    });

    request.end();
}
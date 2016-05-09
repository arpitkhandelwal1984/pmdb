var https = require('https');
var token = "EAACEdEose0cBAJOuFNtHbceEakZAoiRsXYWDEUZBh2cvdwHFNcJd0FmDEfxpesvpe0qO2uxUFvPpjJpwhIo2u4ltjfYf3vFcNlhYr5gk4OLnVp7QoZBvuGuoSdnAyFg6g9Pw6WLO2GL4rG8YAYVe9fjJHNZAvQCFIsWUyDxAgz4hm0NlLJQA";

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
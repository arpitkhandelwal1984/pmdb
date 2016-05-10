var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var fbConfig = require('../fb.js');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl,
			profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name", "displayName", "profileUrl", "about"]
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

       	// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	        User.findOne({ 'id' : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
					console.log("Returning saved user from mongodb");
	                return done(null, user); // user found, return that user
	            } else {
					console.log("User not found in mongodb.");
	                // if there is no user found with that facebook id, create them
	                var newUser = new User();

					// set all of the facebook information in our user model
	                newUser.fb.id    = profile.id; // set the users facebook id	                
	                newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user	                
	                newUser.fb.firstName  = profile.name.givenName;
	                newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	                newUser.fb.displayName = profile.displayName;
                    newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
					newUser.fb.gender = profile._json.gender;
                    newUser.fb.picture = 'https://graph.facebook.com/' + profile.id + '/picture?width=9999&height=9999';
                    newUser.fb.profileUrl = profile.profileUrl;
					newUser.fb.about = "I am a Test User created by my master Arpit to test his latest invention PMDB.";
                    
                    // save our user to the database
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;

	                    // if successful, return the new user
	                    //return done(null, newUser);
                        return done(null, newUser);
	                });
	            }

	        });
        });

    }));

};

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var monk = require('monk');
var db = monk('mongodb://alianjum:seecs123@ds035290.mongolab.com:35290/r_fusion');
passport.use(new LocalStrategy(
	function(username, password, done)
    {
        console.log(username);
        var user = db.get('user');
        user.findOne({username:username,password:password},{},function(e,docs){
            console.log("get User");
            if (!docs)
            {
                return done(null, false);
            }
            else
            {
                return done(null, docs);
            }
        });   
	}
));

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
});

passport.deserializeUser(function(id, done)
{
        console.log('deserialzing');
        var user = db.get('user');
        user.findOne({_id:_id},{},function(e,docs){
            console.log("get User");
            if (!docs)
            {
                return done(null, false);
            }
            else
            {
                return done(null, docs);
            }
        });
});

module.exports = passport;
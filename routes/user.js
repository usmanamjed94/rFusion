var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var auth= require(".././routes/auth.js");
var geocoder = require('geocoder');
// Save function for sign up
exports.save= function(req, res){
    console.log(req.body);
    var db= req.db;
    var user=req.body;
    var userCollection= db.get('user');
    userCollection.insert({
                name: user.nameUser,
                username: user.username,
                phone: user.phone,
                password: user.passUser,
                longitude: user.longitude,
                latitude: user.lattitude,
                bloodgroup: user.bloodgroup,
                willingness: user.willingness
            }, function (err, doc) {
            if (err) {
                // If it failed, return error
                console.log("error");
                console.log(err);
                res.send({ success : false, message : 'authentication failed' });
            }
            else {
                res.send({ success : true, message : 'authentication succeeded' });
            }
        });
};

// Return User information from id
exports.returnUser = function(req, response)
{
    if (!req.session.user)
    {
        response.status(500).json({ success: false});
    }
    else
    {
        var db = req.db;
        var data={};
        var userNumber=req.query.userNumber;
        var user = db.get('user');  //Aschnornous Problem
        user.findOne({_id:req.session.user},{},function(e,docs){
            console.log("get User");
            data=  docs;
            console.log(data);
            response.status(200).send(data);
        });
    }
};

// Getting the donors from the database
exports.donors= function(req, response)
{
     //If user is present
    if (!req.session.user)
    {
        response.render('rFusion/signin.html');
    }
    else
    {
        // Geocoding
        geocoder.geocode(req.body.address, function (err, data) {
            var db = req.db;
            if (data.results.length === 0) {
                return response.send({ success: false, location: false});
            }
            else {
                var lattitudeStart = data.results[0].geometry.location.lat - 0.75;
                var lattitudeEnd = data.results[0].geometry.location.lat + 0.75;
                var longitudeStart = data.results[0].geometry.location.lng - 0.75;
                var longitudeEnd = data.results[0].geometry.location.lng + 0.75;
                var originalLocation = {lattitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng};
                console.log(originalLocation);
                var user = db.get('user');
                user.find({},{fields :{_id:0,username:0,password:0}},function(e,docs){
                    console.log("get User");
                    data=  docs;
                    if (data.length === 0) {
                        return response.send({ success: false, location: true, position: originalLocation, message: data});
                    }

                    else {
                        response.status(200).json({success: true, location: true, position: originalLocation, message: data});
                    }
                });
            }
        });
    }
};
// Upate function for profile
exports.update = function(req, res)
{
    var db = req.db;
    var user = db.get('user');
    user.update({_id:req.session.user},{
            name: req.body.nameUser,
            username: req.body.username,
            phone: req.body.phone,
            pass: req.body.passUser,
            longitude: req.body.longitude,
            latitude: req.body.lattitude,
            bloodgroup: req.body.bloodgroup,
            willingness: req.body.willingness
        },{});
};

exports.login= function(req, res, next)
{
    auth.authenticate('local', function(err, user, info)
    {
        if (err)
        {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user)
        {
            return res.send({ success : false, message : 'authentication failed' });
        }

        if (user)
        {
            req.session.user = user._id;
            return res.send({ success : true, message : 'authentication succeeded' });
        }
    })(req, res, next)
};
//Log out user
exports.logout = function(req, response)
{
    req.session.user = null;
    response.render('rFusion/index.html');
};
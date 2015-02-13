exports.index= function(req, res) 
{
    res.render('rFusion/index.html');
};
//Login Route
exports.login = function(req, response)
{
    response.render('rFusion/signin.html');
};
//Signup Page Route
exports.signup = function(req, response)
{
    response.render('rFusion/signup.html');
};
//thankyou page
exports.thankyou = function(req, response)
{
    response.render('rFusion/thankyou.html');
};
//Search Map Route
exports.map = function(req, response)
{
    if (!req.session.user)
    {
        response.render('rFusion/signin.html');
    } else
    {
        response.render('rFusion/search.html');
    }

};
//Signup Page Route
exports.updatePage = function(req, response)
{
    if (!req.session.user)
    {
        response.render('rFusion/signin.html');
    }
    else
    {
        response.render('rFusion/update.html');
    }

};
//User Route
exports.user = function(req, response)
{
    console.log('hala');
    console.log(req.session.user);
    if (!req.session.user)
    {
        response.render('rFusion/signin.html');
    } else
    {
        response.render('rFusion/blogpost.html');
    }

};
// Getting the rDiaries along with their comments
exports.rdiaries = function(req, response)
{
    // Check whether the user is signed in or not
    if (!req.session.passport.user)
    {
        response.render('rFusion/signin.html');
    }
    // If user is present ; then save the text information to the
    else
    {
//        var databaseObj = new database();
//        var sql="SELECT * FROM diaries limit 10";
//        databaseObj.connection.connect();
//        databaseObj.connection.query(sql, function (err, results)
//        {
//            for (var key in results)
//            {
//                var userQuery="SELECT * FROM User WHERE id = '"+ results[key].userID  +"' limit 1";
//
//                databaseObj.connection.query(userQuery,function (err, secondResult)
//                {
//                    results[key].userID = secondResult;
//                });
//            } (function(){console.log(results)});
//            if (err)
//            {
//                throw err;
//                response.status(500).json({status:'The server could\'nt return any content.'});
//            }
//            else
//            {
//                response.status(200).json(results);
//            }
//        });
    }
};

//rDiaries Saving Route
exports.rdiariesSave = function(req, response)
{
    // Check whether the user is signed in or not
    if (!req.session.passport.user)
    {
        response.render('rFusion/signin.html');
    }

    // If user is present ; then save the text information to the
    else
    {
//        var d = new Date(); // for now
//        var t =  d.getHours() +':'+ d.getMinutes() + ':' + d.getSeconds();
//
//        var databaseObj = new database();
//        var data  = {story: req.body.text, userID: req.user.id, date: new Date(), time: t};
//        var table = 'diaries';
//
//        databaseObj.save(data,table,response);
    }

};

//rDiary Route
exports.diarypost = function(req, response)
{
    if (!req.session.user)
    {
        response.render('rFusion/signin.html');
    } else
    {
        response.render('rFusion/blogpost.html');
    }

};
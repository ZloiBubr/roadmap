var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);
var authentication = require('../middleware/authentication')


var jira = require('../routes/updatejira');
var roadmap = require('../routes/roadmapdata');
var versiondata = require('../routes/versiondata');
var ClearDB = require('../middleware/createDb').Clear;
var registration = require("../middleware/registration");
var users = require("../middleware/users");

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'PLEX-UXC Report Tool' });
});
//public
router.post('/login', authentication.authenticate);
router.post("/register", registration.register);

//json
router.post('/updatejira', jira.post);
router.get('/roadmapdata', roadmap.get);
router.get('/versiondata', versiondata.get);
router.get("/api/users", users.query);
router.get("/api/users/:id", users.get);
router.post("/api/users/:id", users.save);

router.get('/update_progress', function (req, res) {
    req.socket.setTimeout(1000 * 60 * 10);
    res.writeHead(200, {'Content-Type': 'text/event-stream'});
    jira.rememberResponse(req, res);
});

//handlers
router.get('/cleandb', function(req, res) {
    ClearDB(res, function (err, res) {
        if (err) {
            var errMessage = "!!!!!!!!!!!!!!!!!!!! DB Cleanup error happened!";
            log.error(errMessage);
            log.error(err);
            res.send(403, errMessage);
        }
        else {
            res.send(200, 'OK');
        }
    });
});

module.exports = router;

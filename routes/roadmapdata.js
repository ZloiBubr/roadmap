/**
 * Created by Siarhei Hladkou (shladkou) on 3/7/14.
 */
var roadMapData = require('../middleware/roadmapData');

exports.get = function (req, res) {
    roadMapData.getData(req, res);
};
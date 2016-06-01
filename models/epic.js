/**
 * Created by Siarhei Hladkou (shladkou) on 3/5/14.
 */
var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    key:        { type: String, unique: true, index: true },
    summary:    String,
    created:    Date,
    duedate:    Date,
    assignee:   String,
    status:     String,
    labels:     String,
    resolution: String,
    fixVersions:[String],
    priority:   String,
    components: [String],
    uri:        String
});

exports.Epic = mongoose.model('Epic', schema);
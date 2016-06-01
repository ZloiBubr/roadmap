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
    epicKey:    String,
    uri:        String
});

exports.Story = mongoose.model('Story', schema);
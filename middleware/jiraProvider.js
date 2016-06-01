/**
 * Created by Siarhei Hladkou (shladkou) on 2/26/14.
 */
var util = require('util');
var config = require('../config');
var log = require('../libs/log')(module);

var Epic = require('../models/epic').Epic;
var Story = require('../models/story').Story;
var OriginalJiraIssue = require('../models/originalJiraIssue').Issue;
var Version = require('../models/Version').Version;

var _ = require('underscore');
var async = require('async');
var cache = require('node_cache');
var sessionSupport = require('./sessionsupport');
var helpers = require('./helpers');
var jiraHelpers = require('./jiraHelpers');
var mongoose = require('./../libs/mongoose');
var Q = require('q');
var JiraApi = require('jira').JiraApi;

var updateInProgress = false;



exports.rememberResponse = function (req, res) {
    sessionSupport.setResponseObj('updateDb', req, res);
    UpdateProgress(0, "storyDbObj");
};

var UpdateProgress = function (progress, type) {
    sessionSupport.notifySubscribers('updateDb', "progress", '{"' + type + '":' + progress.toString() + "}");
    if (progress > 0) {
        LogProgress("**********" + type + " Progress " + progress.toString() + "% **********");
    }
};

var LogProgress = function (text, error) {
    if (error) {
        var errorText = error === null ? "not evaluated" : error.message === null ? error : error.message;
        sessionSupport.notifySubscribers('updateDb', "errmessage", text + ", reason - " + errorText);
        log.error(text);
        log.error(error);
    }
    else {
        sessionSupport.notifySubscribers('updateDb', "logmessage", text);
        log.info(text);
    }
};

exports.updateJiraInfo = function (debugMode, fullUpdate, removeMode, jiraUser, jiraPassword, callback) {
    if (updateInProgress) {
        callback();
    }

    updateInProgress = true;

    var progressCounter = 0;
    var updateSpan = 0;

    if (removeMode) {
        fullUpdate = true;
    }

    var jira = debugMode ? null : 
                           new JiraApi(config.get("jiraAPIProtocol"), config.get("jiraUrl"), config.get("jiraPort"), jiraUser, jiraPassword, '2');
    var issues = [];
    var issuesMap = {};

    async.series([
        function (callback) {
            jiraHelpers.calcUpdateInterval(debugMode, function (span, err) {
                if (err) {
                    callback(err);
                }
                else {
                    updateSpan = span;
                    callback();
                }
            });
        },
        function (callback) {
            jiraHelpers.WriteVersion(true, debugMode, callback);
        },
        function (callback) {
            LogProgress("**** Step 1: collect issue keys from JIRA");
            Step1CollectIssueKeys(debugMode, fullUpdate, updateSpan, jira, issues, issuesMap, callback);
        },
        function (callback) {
            LogProgress("**** Step 2: collect issues from JIRA");
            Step2CollectIssues(removeMode, debugMode, progressCounter, jira, issues, callback);
        },
        function (callback) {
            LogProgress("**** Step 3: remove deleted issues from database");
            Step3DeleteIssues(removeMode, debugMode, issuesMap, callback);
        },
        function (callback) {
            LogProgress("**** Step 4: drop collections from DB");

            async.series([
                function (callback) { return jiraHelpers.collectionDrop(Epic, LogProgress, callback); },
                function (callback) { return jiraHelpers.collectionDrop(Story, LogProgress, callback); },
            ],
                function (err) {
                    callback(err);
                });
        },
        function (callback) {
            LogProgress("**** Step 5: collect Epics");
            Step5CollectEpics(callback);
        },
        function (callback) {
            LogProgress("**** Step 6: collect Stories");
            Step6CollectStories(callback);
        },
        function (callback) {
            jiraHelpers.WriteVersion(false, debugMode, callback);
        },
        function (callback) {
            LogProgress("---- Update Finished ----");
            cache.clearAllData();
            callback();
        }
    ],
    function (err) {
        if (err) {
            LogProgress("**** Update Failed ****", err);
        }
        else {
            LogProgress("**** Update Succeed ****");
        }
    });

    callback();
};

function Step1CollectIssueKeys(debugMode, fullUpdate, updateSpan, jira, issues, issuesMap, callback) {
    //do not call jira update for debug
    if (debugMode) {
        callback();
        return;
    }

    var startKey = 0;
    var loopFlag = true;

    var span = updateSpan < 1 ? 72 : updateSpan;
    span = span > 0 ? span + 1 : 2;
    var queryString = fullUpdate ? "project = " + config.get("project") + " ORDER BY key ASC" : 
                                    util.format("project = " + config.get("project") + " AND updated > -%sh ORDER BY key ASC", span);


    UpdateProgress(0, "storyDbObj");

    async.whilst(function () {
        return loopFlag;
    },
    function (callback) {

        LogProgress("**** collecting issue keys: from " + startKey + " to " + (startKey + 1000).toString());

        var optional = {};
        optional.maxResults = 1000;
        optional.startAt = startKey;
        optional.fields = ["issuetype"];
        startKey += 1000;

        jira.searchJira(queryString, optional, function (error, jiraIssues) {
            if (error) {
                LogProgress("Collect issues error happened!", error);
                callback(error);
                return;
            }
            if (jiraIssues != null) {
                _.each(jiraIssues.issues, function (issue) {
                    issues.push(issue.key);
                    issuesMap[issue.key] = issue.key;
                });
                if (jiraIssues.issues.length == 0 || jiraIssues.issues.length < 1000) {
                    loopFlag = false;
                }
                callback();
            }
            else {
                loopFlag = false;
                callback();
            }
        });
    },
    function (err) {
        callback(err);
    });
}

function Step2CollectIssues(deleteMode, debugMode, progressCounter, jira, issues, callback) {
    //do not call jira update for debug or delete
    if (deleteMode || debugMode) {
        callback();
        return;
    }
    LogProgress("**** Collecting " + issues.length + " issues");
    var lastProgress = 0;
    async.eachLimit(issues, 1, function (issueKey, callback) {
        var jiraIssue = {};
        jiraIssue.issue = {};
        async.series([
            function (callback) { return jiraHelpers.getFullJiraIssue(jira, issueKey, jiraIssue, LogProgress, callback); },
//            function (callback) { return jiraHelpers.updateWorklogForJiraIssue(jira, jiraIssue, LogProgress, callback); },
            function (callback) { return jiraHelpers.saveJiraIssueToDB(jiraIssue, callback); }
        ],
        function (err) {
            LogProgress(++progressCounter + ":" + issueKey + " : Issue Collected");
            var progress = Math.floor(progressCounter * 100 / issues.length);
            if (progress != lastProgress) {
                lastProgress = progress;
                UpdateProgress(progress, "storyDbObj");
            }
            callback();
        });
    },
    function (err) {
        callback(err);
    });
}

function Step3DeleteIssues(removeMode, debugMode, issuesMap, callback) {
    if (!removeMode || debugMode) {
        callback();
        return;
    }

    var stream = OriginalJiraIssue.find().stream();

    stream.on('data', function (doc) {
        if (issuesMap[doc.key] == undefined) {
            doc.remove();
        }
    }).on('error', function (err) {
        callback(err);
    }).on('close', function () {
        callback();
    });
}

function Step5CollectEpics(callback) {
    var stream = OriginalJiraIssue.find({ issuetype: 'Epic' }).stream();

    var count = 0;

    stream.on('data', function (doc) {
        stream.pause();
        var epic = doc.object;
        Epic.findOne({ key: epic.key }, function (err, epicDbObj) {
            if (!epicDbObj) {
                epicDbObj = new Epic();
            }
            epicDbObj.key = epic.key;
            epicDbObj.uri = config.get("jiraBrowseUri") + epic.key;
            epicDbObj.summary = epic.fields.summary;
            epicDbObj.duedate = epic.fields.duedate == null ? null : new Date(epic.fields.duedate);
            epicDbObj.assignee = epic.fields.assignee == null ? "" : epic.fields.assignee.displayName;
            epicDbObj.status = epic.fields.status.name;
            epicDbObj.resolution = epic.fields.resolution == null ? "" : epic.fields.resolution.name;
            epicDbObj.labels = epic.fields.labels;
            if(epic.fields.fixVersions != null) {
                _.each(epic.fields.fixVersions, function(fixVersion) {
                    epicDbObj.fixVersions.push(fixVersion.name);
                });
            }
            epicDbObj.priority = epic.fields.priority.name;
            if(epic.fields.components != null) {
                _.each(epic.fields.components, function(component) {
                    epicDbObj.components.push(component.name);
                });
            }

            epicDbObj.save(function (err) {
                if (err) {
                    callback(err);
                }
                LogProgress(++count + ":" + epic.key + " : Epic Saved");
                stream.resume();
            });
        });
    }).on('error', function (err) {
        callback(err);
    }).on('close', function () {
        LogProgress(count + " Epics Total");
        callback();
    });
}

function Step6CollectStories(callback) {
    var stream = OriginalJiraIssue.find({ issuetype: 'Story' }).stream();

    var count = 0;

    stream.on('data', function (doc) {
        stream.pause();
        var story = doc.object;
        var epicLink = story.fields.customfield_10008; //Epic link

        Story.findOne({ key: story.key }, function (err, storyDbObj) {
            if (!storyDbObj) {
                storyDbObj = new Story();
            }

            storyDbObj.key = story.key;
            storyDbObj.uri = config.get("jiraBrowseUri") + story.key;
            storyDbObj.summary = story.fields.summary;
            storyDbObj.status = story.fields.status.name;
            storyDbObj.resolution = story.fields.resolution == null ? "" : story.fields.resolution.name;
            storyDbObj.reporter = story.fields.reporter.displayName;
            storyDbObj.labels = story.fields.labels;
            storyDbObj.assignee = story.fields.assignee == null ? "" : story.fields.assignee.displayName;
            storyDbObj.epicKey = epicLink;
            storyDbObj.created = story.fields.created;
            storyDbObj.updated = story.fields.updated;
            if(story.fields.fixVersions != null) {
                _.each(story.fields.fixVersions, function(fixVersion) {
                    storyDbObj.fixVersions.push(fixVersion.name);
                });
            }
            if(story.fields.components != null) {
                _.each(story.fields.components, function(component) {
                    storyDbObj.components.push(component.name);
                });
            }

            storyDbObj.save(function (err) {
                if (err) {
                    callback(err);
                }
                LogProgress(++count + ":" + story.key + " : Story Saved");
                stream.resume();
            });
        });
    }).on('error', function (err) {
        callback(err);
    }).on('close', function () {
        LogProgress(count + " Stories Total");
        callback();
    });
}







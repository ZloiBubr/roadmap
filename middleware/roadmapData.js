var helpers = require('../middleware/helpers');
var Epic = require('../models/epic').Epic;
var Story = require('../models/story').Story;
var async = require('async');
var _ = require('underscore');
var cache = require('node_cache');
var config = require("../config");
var log = require('../libs/log')(module);

exports.getData = function (req, res) {
    cache.getData("roadmapDataRows", function (setterCallback) {
        getRoadmapData(function (data) {
            setterCallback(data);
        });
    }, function (value) { res.json(value); });
};

function RoadmapData() {
    this.Epics = [];
}

var components = {};

function getRoadmapData(rootCallback) {
    var roadmapData = new RoadmapData();
    roadmapData.Epics = [];

    async.series([
        function (mainCallback) {
            Epic.find({}, function (err, epics) {
                async.eachSeries(epics, function (epic, epicCallback) {
                    processComponents(epic);
                    Story.find({ epicKey: epic.key }, function (err, stories) {
                        if (stories != null && stories.length > 0) {
                            async.eachSeries(stories, function (story, storyCallback) {
                                processComponents(story);
                                if(story.fixVersions.length > 0) {
                                    async.eachSeries(story.fixVersions, function (version, versionCallback) {
                                        var epicVersionObj = getEpicVersionObj(roadmapData.Epics, epic, version);
                                        epicVersionObj.stories.push(story);
                                        versionCallback();
                                    });
                                }
                                else {
                                    var epicVersionObj = getEpicVersionObj(roadmapData.Epics, epic, "999 Undefined");
                                    epicVersionObj.stories.push(story);
                                }
                                storyCallback();
                            },
                            function () {
                                epicCallback();
                            });
                        }
                        else {
                            epicCallback();
                        }
                    });
                },
                function () {
                    mainCallback();
                });
            });
        },
        function () {

            roadmapData.Components = Object.keys(components);

            roadmapData.Epics.sort(function (o1, o2) {
                var a = o1.name;
                var b = o2.name;
                return a > b ? 1 : a < b ? -1 : 0;
            });
            roadmapData.Components.sort();

            roadmapData.Components.push("Undefined");
            rootCallback(roadmapData);
        }
    ]);
}

function processComponents(origObj) {
    if(origObj.components.length > 0) {
        _.each(origObj.components, function(component) {
           components[component] = component;
        });
    }
}

function getEpicVersionObj(epics, epic, fixVersion) {
    var epicVersionObj = _.findWhere(epics,
        {
        name: epic.summary,
        fixVersion: fixVersion
        }
    );
    if(epicVersionObj === null || epicVersionObj === undefined) {
        epicVersionObj = {};
        epicVersionObj.name = epic.summary;
        epicVersionObj.fixVersion = fixVersion;
        epicVersionObj.epic = epic;
        epicVersionObj.stories = [];

        epics.push(epicVersionObj);
    }
    return epicVersionObj;
}


var STATUS = require('../public/jsc/models/statusList').STATUS;
var RESOLUTION = require('../public/jsc/models/statusList').RESOLUTION;

exports.isActive = function(status, resolution) {
    return !(status == STATUS.CLOSED.name &&
    (resolution == RESOLUTION.OUTOFSCOPE.name ||
    resolution == RESOLUTION.OBSOLETE.name ||
    resolution == RESOLUTION.DUPLICATE.name ||
    resolution == RESOLUTION.REJECTED.name ||
    resolution == RESOLUTION.CANCELED.name));
};

exports.isResolved = function(page) {
    return page.status == STATUS.RESOLVED.name ||
    page.status == STATUS.CLOSED.name ||
    page.status == STATUS.PRODUCTION.name ||
    page.status == STATUS.PMREVIEW.name ||
    page.status == STATUS.LAREADY.name ||
    page.status == STATUS.ACCEPTED.name;
};

exports.updateStatus = function(page) {
    var newStatus = page.status;
    if(page.status == STATUS.CLOSED.name && (
        page.resolution == RESOLUTION.DONE.name ||
        page.resolution == RESOLUTION.FIXED.name ||
        page.resolution == RESOLUTION.IMPLEMENTED.name ||
        page.resolution == RESOLUTION.RESOLVED.name ||
        page.resolution == RESOLUTION.APPROVED.name
        )) {
        newStatus = STATUS.ACCEPTED.name;
    }
    if((page.status == STATUS.CLOSED.name ||
        page.status == STATUS.RESOLVED.name) && (
        page.resolution == RESOLUTION.CANCELED.name ||
        page.resolution == RESOLUTION.REJECTED.name ||
        page.resolution == RESOLUTION.OUTOFSCOPE.name ||
        page.resolution == RESOLUTION.OBSOLETE.name
        )) {
        newStatus = STATUS.CANCELED.name;
    }
    if(page.pmhfinish != undefined) {
        newStatus = STATUS.PMREVIEW.name;
    }
    if(page.lafinish != undefined) {
        newStatus = STATUS.LAREADY.name;
    }
    return newStatus;
};


exports.isBlocked = function(status) {
    return status == STATUS.BLOCKED.name;
};

exports.isDeferred = function(status) {
    return status == STATUS.DEFERRED.name;
};

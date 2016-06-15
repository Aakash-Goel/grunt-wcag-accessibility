/*
 * grunt-wcag-accessibility validation helper
 * https://github.com/vikas-kumar-singh/grunt-wcag-accessibility
 *
 * Copyright (c) 2016 Vikas Kumar Singh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function generateHTMLReport(options) {
    var grunt = require('grunt'),
        handlebars = require('handlebars'),
        filePath,
        template,
        folderPath = "";

    if (grunt.file.exists(options.reportLocation + "/report.json")) {
        var currentErrorFileObj = grunt.file.readJSON(options.reportLocation + "/report.json");
    } else {
        grunt.fatal("Unable to find the source json data");
    }

    if (grunt.file.exists(options.errorTemplate)) {
        var htmlTemplate = grunt.file.read(options.errorTemplate);
    } else {
        grunt.log.error("Error: Provided Path for HTML Template file '" + (options.errorTemplate) + "' is not found.");
        return;
    }

    template = handlebars.compile(htmlTemplate);

    var newDateObj = new Date(),
        datePortion = (newDateObj.getMonth() + 1) + "-" + newDateObj.getDate() + "-" + newDateObj.getFullYear(),
        timePortion = newDateObj.toTimeString(),
        time = timePortion;
    timePortion = timePortion.substr(0, timePortion.lastIndexOf(":")).replace(/:/g, "_");

    folderPath = "WCAG_Errors_" + datePortion + "_" + timePortion;;

    for (var k in currentErrorFileObj) {
        var dataObj = {
            reportName: k,
            date:datePortion,
            time:time,
            level:options.accessibilityLevel,
            data:currentErrorFileObj[k]
        }
        grunt.log.ok('Generating Reports at ' + options.reportLocation);
        var fileName = k.replace(/[,<>=?|*:./"%]/g, '_');
        filePath = options.reportLocation + "/" + folderPath + "/" + fileName + "_accessibility_report.html";
        grunt.file.write(filePath, template(dataObj));
    }

};

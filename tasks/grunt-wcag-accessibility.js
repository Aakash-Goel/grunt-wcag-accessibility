
/*
 * Grunt AccessSniff Task helper
 * https://github.com/vikas-kumar-singh/grunt-wcag-accessibility
 *
 * Copyright (c) 2016 Vikas Kumar Singh
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    var accessSniff = require('access-sniff'),
        generateHtmlReport = require('./lib/generateHTMLReport');
        
    grunt.registerMultiTask('accessibility', 'Use HTML codesniffer to grade accessibility', function() {
       
        var done = this.async();
        var options = this.options({});
        var tempReportType = '';
        var defaults = {
            reportLocation: 'reports/html',
            urls: this.filesSrc.length > 0 ?  this.filesSrc : 'http://www.google.com',
            reportType: 'html',
            errorTemplate: __dirname+"/template/errorHTML.html"
        }
        options.reportType = options.reportType || defaults.reportType;
        options.reportLocation = options.reportLocation || defaults.reportLocation;
        options.errorTemplate = options.errorTemplate || defaults.errorTemplate;
        options.urls = options.urls || defaults.urls;

        if (options.reportType.toLowerCase() == 'html') {
            tempReportType = options.reportType.toLowerCase();
            options.reportType = 'json';
        }

        accessSniff
            .default(options.urls, options)
            .then(function(report) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                if (options.reportLocation) {
                    accessSniff.report(report, {
                        location: options.reportLocation,
                        reportType: options.reportType
                    });
                }

                grunt.log.ok('Testing Complete');
                done();
            })
            .then(function() {
                if (tempReportType == 'html') {
                    generateHtmlReport(options);
                }
                grunt.log.ok('Report Generated at ' + options.reportLocation);
            })
            .catch(function(error) {
                grunt.fail.warn("Something went wrong, please check configurations");
                grunt.fail.warn(error);
            });
    });

};

Grunt WCAG Accessibility
===================

Uses [AccessSniff](https://github.com/yargalot/AccessSniff) and [HTML Codesniffer](http://github.com/squizlabs/HTML_CodeSniffer) to grade your site's accessibility using different levels of the WCAG guidelines.

------------------------------


Getting Started
-------------

Install this grunt plugin next to your project's Gruntfile.js with: 

    npm install grunt-wcag-accessibility

Or save it in your **package.json** file

    npm install grunt-wcag-accessibility --save


----------

How to use?
-----------------
Place this in your Gruntfile.js

    options: {
            accessibilityLevel: 'WCAG2AA',
            force: true,
            maxBuffer: '1024*1024',
            verbose: false,
            reportLevels: {
                notice: false,
                warning: false,
                error: true
            }
        },
        report: {
            options: {
                urls: ['http://www.w3schools.com/',
                    'http://www.tutorialspoint.com/'
                ]
            }
        }

----------

Report Generation
----------------
You can generate report in 4 formats:

 - HTML
 - JSON
 - CSV
 - TXT

Default is the HTML Report.

Options
----------------

View [AccessSniff](https://github.com/yargalot/AccessSniff) options for all available options.

Contributing
------------

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

Credits 
---------
Steven John Miller (http://www.stevenjohnmiller.com/) : https://github.com/yargalot/grunt-accessibility

Squizlabs : https://github.com/squizlabs/HTML_CodeSniffer


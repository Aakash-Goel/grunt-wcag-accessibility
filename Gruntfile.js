module.exports = function(grunt) {

    // Time Grunt
    require('time-grunt')(grunt);

    // Load Development scripts
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    // Load Grunt Accessibility
    grunt.loadTasks('tasks');

    grunt.initConfig({

        accessibility: {
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
                options:{
                    urls:['http://www.w3schools.com/',
                        'http://www.tutorialspoint.com/'
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', ['accessibility']);
};

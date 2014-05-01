module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    coffee: {
      build: {
        files: [
          {
            'javascripts/main.js': ['javascripts/*.coffee']
          }]
      }
    },
    connect: {
      server: {
       options: {
         base: '',
         keepalive: false
       }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['javascripts/*.coffee', '*.html'],
        tasks: ['coffee'],
        options: {
          spawn: false
        }
      }
    },
    usebanner: {
      build: {
        src: ["javascripts/main.js"],
        options: {
          banner: '/*                                                                                       ' +
                '\n * Chrome Draw - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %>' +
                '\n * http://github.com/leapmotion/leapjs-rigged-hand/                                      ' +
                '\n *                                                                                       ' +
                '\n * Copyright <%= grunt.template.today(\"yyyy\") %> LeapMotion, Inc                       ' +
                '\n *                                                                                       ' +
                '\n * Licensed under the Apache License, Version 2.0 (the "License");                       ' +
                '\n * you may not use this file except in compliance with the License.                      ' +
                '\n * You may obtain a copy of the License at                                               ' +
                '\n *                                                                                       ' +
                '\n *     http://www.apache.org/licenses/LICENSE-2.0                                        ' +
                '\n *                                                                                       ' +
                '\n * Unless required by applicable law or agreed to in writing, software                   ' +
                '\n * distributed under the License is distributed on an "AS IS" BASIS,                     ' +
                '\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.              ' +
                '\n * See the License for the specific language governing permissions and                   ' +
                '\n * limitations under the License.                                                        ' +
                '\n *                                                                                       ' +
                '\n */                                                                                      ' +
                '\n'
        }
      }
    }

  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['coffee', 'usebanner', 'connect', 'watch'])
};                            

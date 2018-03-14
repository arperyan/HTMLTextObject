define( ["qlik", "jquery", "text!./template.html", "css!./style.css","css!./textAngular.css","./textAngular-rangy.min","./textAngular-sanitize.min","./textAngular.min"],
function ( qlik, $, templateHTML) {
  'use strict';

  var $injector = angular.injector( ['ng'] );
  var $http = $injector.get( "$http" );

  return {
    template: templateHTML,
    definition: {
      type: "items",
      component: "accordion",
      items: {
        settings: {
          uses: "settings"
        },
        custom: {
          component: "expandable-items",
          type: "items",
          label: "Custom",
          items: {
            extensionHTML: {
              label: "Extension HTML",
              type: "items",
              items: {
                html: {
                  ref: "custom.html",
                  label: "HTML",
                  type: "string",
                  expression: "optional",
                  defaultValue: ""
                }
              }
            }
          }
        }
      }
    },
    snapshot: {
      canTakeSnapshot: true,
      export: true
    },
    controller: function($scope, $element){
      $scope.focus = function(event){
        event.target.focus();
      }
      $scope.saveHTML = function(){
        var text = $element.find(".example-text-area").text()
        var patchDefs = [{
          qOp: "replace",
          qPath: "/custom/html",
          qValue: JSON.stringify(text)
        }]
        $scope.backendApi.applyPatches( patchDefs, false );
      }
    },
  }
});

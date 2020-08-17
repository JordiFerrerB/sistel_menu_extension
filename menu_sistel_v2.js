define([
  "qlik",
  "jquery",
  "./src/properties",
  "./src/initialproperties",
  "css!./src/css/main.css",
  "css!./src/css/scoped-bootstrap.css",
  "text!./src/partials/template.ng.html",
  "./src/js/bootstrap.bundle.min",
], function (
  qlik,
  $,
  props,
  initProps,
  cssContent,
  bootstrapCSS,
  htmlTemplate,
  bootstrapjs
) {
  "use strict";

  return {
    definition: props,
    initialProperties: initProps,
    template: htmlTemplate,
    controller: [
      "$scope",
      function ($scope) {
        $scope.navigate = function (object) {
          if (object.isLocalSheet) {
            qlik.navigation.gotoSheet(object.hoja_destino);
          } else {
            window.open(object.url_destino);
          }
        };

        $scope.hoverEnterEvent = function (event) {
          var style = {
            "background-color":
              $scope.layout.color_fondo_resaltado.color + " !important",
            color: (event.target.style.color =
              $scope.layout.color_fuente_resaltada.color + " !important"),
          };

          //Allow submenus to overlap other objects
          $scope.setObjectIndex(2147483629);

          //Add hover styles
          if (event.target.className.includes("hover-effected")) {
            $(event.target).css(style);
          }
        };

        $scope.overlapCollapsedMenu = function(menu){
          var isExpanded = $('.menu-sistel .navbar-toggler').attr('aria-expanded');
          var index;
          if(isExpanded == "false"){ //Expanding menu
            index = 2147483629;
          }
          else{
            index = 0; //Collapsing menu
          }
          $scope.setObjectIndex(index);
        }

        $scope.setObjectIndex = function(index){
          $(document.body)
            .find(".qv-object-menu_sistel_v2")
            .parent()
            .parent()
            .parent()
            .parent()
            .css("z-index", index);
        }

        $scope.hoverExitEvent = function (event) {
          var style = {
            "background-color": $scope.layout.color_fondo.color + " !important",
            color: $scope.layout.color_fuente.color + " !important",
          };

          //Remove hover styles
          if (event.target.className.includes("hover-effected")) {
            $(event.target).css(style);
          }

          //Close submenu on mouseleave
          if (event.target.className.includes("submenu-option")) {
            var parentMenu = $(event.target).parent(".dropdown-menu");
            var numHoverItems = parentMenu.find(".submenu-option:hover").length;

            if (numHoverItems == 0) {
              var label = parentMenu.attr("aria-labelledby");
              $("#" + label).dropdown("toggle");
              //Prevent menu from overlapping unwanted objects
              $scope.setObjectIndex(1);
            }
          }
          else{
            $scope.setObjectIndex(1);
          }
        };
      },
    ],
  };
});

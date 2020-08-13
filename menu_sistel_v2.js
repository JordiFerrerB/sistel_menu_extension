define(['qlik', 'jquery',
    './src/properties', './src/initialproperties',
    'css!./src/css/main.css',
    'css!./src/css/scoped-bootstrap.css',
    'text!./src/partials/template.ng.html',
    './src/js/bootstrap.min'
], 

function(qlik, $, props, initProps, cssContent, bootstrapCSS ,htmlTemplate, bootstrapjs){
    'use strict';

    $( '<style>' ).html(cssContent).appendTo( 'head' );
    //$( '<style>' ).html(bootstrapCSS).appendTo( 'head' );

    return {
        definition: props,
        initialProperties: initProps,
        template: htmlTemplate,
        controller: ['$scope', function ($scope) {

            $scope.initialize = function(){
                //$(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","2147483629");
            }

            $scope.navigate = function(to){
                qlik.navigation.gotoSheet(to);
            }

            $scope.hoverEnterEvent = function(event){
                var style = {
                    'background-color': $scope.layout.color_fondo_resaltado.color + ' !important',
                    'color' :  event.target.style.color = $scope.layout.color_fuente_resaltada.color + ' !important'
                };

                //Add hover styles
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }

                //Allow submenus to overlap other objects
                $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","2147483629");
            }

            $scope.hoverExitEvent = function(event){
                var style = {
                    'background-color': $scope.layout.color_fondo.color + ' !important',
                    'color' :  $scope.layout.color_fuente.color + ' !important'
                }

                //Remove hover styles
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }

                //Close submenu on mouseleave
                if(event.target.className.includes('submenu-option')){
                    var parentMenu = $(event.target).parent('.dropdown-menu');
                    var numHoverItems = parentMenu.find('.submenu-option:hover').length;
                    console.log("Leaving with " + numHoverItems + " items selected");
                    
                    if(numHoverItems == 0){
                        var label = parentMenu.attr('aria-labelledby');
                        $('#' + label).dropdown('toggle');
                        console.log(label);
                        //Prevent menu from overlapping unwanted objects
                        $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","1");
                    }
                }
            }
        }]
    }
});
define(['qlik', 'jquery',
    './src/properties', './src/initialproperties',
    'css!./src/css/main.css',
    'css!./src/css/scoped-bootstrap.css',
    'text!./src/partials/template.ng.html',
    './src/js/bootstrap.bundle.min'
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
                //Permite superponer el menú a otros objetos
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
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }
                $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","2147483629");
                //$(event.target).find('.nav-link, i').css(style);
            }

            $scope.hoverExitEvent = function(event){
                var style = {
                    'background-color': $scope.layout.color_fondo.color + ' !important',
                    'color' :  $scope.layout.color_fuente.color + ' !important'
                }
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }

                if(event.target.className.includes('dropdown-toggle') && $(event.target).data('toggle') != 'dropdown'){
                    $(event.target).dropdown('toggle');
                }
                else if(event.target.className.includes('dropdown-menu')){
                    var label = $(event.target).attr('aria-labelledby');
                    $('#'+ label).dropdown('toggle');
                }

                $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","1");
            }
        }]
    }
});
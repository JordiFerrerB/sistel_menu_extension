define(['qlik', 'jquery',
    './src/properties', './src/initialproperties',
    'css!./src/css/main.css',
    'css!./src/css/scoped-bootstrap.css',
    'text!./src/partials/template.ng.html',
<<<<<<< HEAD
    './src/js/bootstrap.bundle.min'
=======
    './src/js/bootstrap.min'
>>>>>>> 7963341ab8a4155c668074c98b1815a8ad6bcbf8
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
<<<<<<< HEAD
                //Permite superponer el menú a otros objetos
=======
>>>>>>> 7963341ab8a4155c668074c98b1815a8ad6bcbf8
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
<<<<<<< HEAD
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }
                $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","2147483629");
                //$(event.target).find('.nav-link, i').css(style);
=======

                //Add hover styles
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }

                //Allow submenus to overlap other objects
                $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","2147483629");
>>>>>>> 7963341ab8a4155c668074c98b1815a8ad6bcbf8
            }

            $scope.hoverExitEvent = function(event){
                var style = {
                    'background-color': $scope.layout.color_fondo.color + ' !important',
                    'color' :  $scope.layout.color_fuente.color + ' !important'
                }
<<<<<<< HEAD
=======

                //Remove hover styles
>>>>>>> 7963341ab8a4155c668074c98b1815a8ad6bcbf8
                if(event.target.className.includes('hover-effected')){
                    $(event.target).css(style);
                }

<<<<<<< HEAD
=======
                //Close submenu on mouseleave
>>>>>>> 7963341ab8a4155c668074c98b1815a8ad6bcbf8
                if(event.target.className.includes('dropdown-toggle') && $(event.target).data('toggle') != 'dropdown'){
                    $(event.target).dropdown('toggle');
                }
                else if(event.target.className.includes('dropdown-menu')){
                    var label = $(event.target).attr('aria-labelledby');
                    $('#'+ label).dropdown('toggle');
                }

<<<<<<< HEAD
=======
                //Prevent menu from overlapping unwanted objects
>>>>>>> 7963341ab8a4155c668074c98b1815a8ad6bcbf8
                $(document.body).find(".qv-object-menu_sistel_v2").parent().parent().parent().parent().css("z-index","1");
            }
        }]
    }
});
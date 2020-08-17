define(["qlik", "text!./data/lui-icons.json"], function (qlik, luiIcons) {
  "use strict";

  var sheets = [];

  //Obtén todas las hojas del documento, sin repeticiones
  function getSheets() {
    sheets = [];
    var app = qlik.currApp();
    app.getAppObjectList("sheet", function (data) {
      data.qAppObjectList.qItems.forEach((s) => {
        var found = false;
        //Impide que se añadan duplicados
        for (var i = 0; i < sheets.length && !found; i++) {
          if (s.qInfo.qId == sheets[i].value) {
            found = true;
          }
        }

        if (!found) {
          sheets.push({
            value: s.qInfo.qId,
            label: s.qMeta.title,
          });
        }
      });
    });
  }

  getSheets();

  var menuColores = {
    type: "items",
    ref: "colores",
    label: "Colors",
    items: {
      color_fondo: {
        label: "Background color",
        ref: "color_fondo",
        type: "object",
        component: "color-picker",
        defaultValue: {
          color: "#009EE3",
          index: "-1",
        },
      },
      color_fuente: {
        label: "Font color",
        ref: "color_fuente",
        type: "object",
        component: "color-picker",
        defaultValue: {
          color: "#fffff",
          index: "-1",
        },
      },
      color_resaltado: {
        label: "Background hover color",
        ref: "color_fondo_resaltado",
        type: "object",
        component: "color-picker",
        defaultValue: {
          color: "#999",
          index: "-1",
        },
      },
      texto_resaltado: {
        label: "Font hover color",
        ref: "color_fuente_resaltada",
        type: "object",
        component: "color-picker",
        defaultValue: {
          color: "#fffff",
          index: "-1",
        },
      },
    },
  };

  var addMenus = {
    type: "array",
    label: "Menu links",
    ref: "objetos_menu",
    itemTitleRef: "titulo",
    allowAdd: true,
    addTranslation: "Add link",
    allowRemove: true,
    allowMove: true,
    items: {
      destino: {
        type: "boolean",
        label: "Destination",
        ref: "isLocalSheet",
        component: "switch",
        options: [
          {
            label: "Sheet",
            value: true,
          },
          {
            label: "External URL",
            value: false,
          },
        ],
      },
      titulo: {
        type: "string",
        label: "Title",
        ref: "titulo",
        expression: "optional",
      },
      icono: {
        type: "string",
        component: "dropdown",
        label: "Icon",
        ref: "icono",
        options: function () {
          var iconList = JSON.parse(luiIcons).icons;
          var props = [
            {
              value: "",
              label: ">> No icon <<",
            },
          ];

          iconList.forEach(function (icon) {
            props.push({
              value: icon.id,
              label: icon.name,
            });
          });

          return props;
        },
      },
      hojaDestino: {
        type: "string",
        component: "dropdown",
        ref: "hoja_destino",
        label: "Sheet",
        options: function () {
          return sheets;
        },
        show: function (menu) {
          return menu.isLocalSheet && menu.objetos_submenu.length == 0;
        },
        defaultValue: "",
      },
      urlDestino: {
        type: "string",
        label: "URL",
        ref: "url_destino",
        defaultValue: "",
        show: function (menu) {
          return !menu.isLocalSheet && menu.objetos_submenu.length == 0;
        },
      },
      visibilidad: {
        type: "boolean",
        component: "switch",
        label: "Visible",
        ref: "visible",
        options: [
          {
            value: true,
            label: "Yes",
          },
          {
            value: false,
            label: "No",
          },
        ],
      },
      submenus: {
        type: "array",
        ref: "objetos_submenu",
        label: "Submenus",
        itemTitleRef: "titulo_submenu",
        allowAdd: true,
        allowRemove: true,
        allowMove: true,
        addTranslation: "Add submenu",
        items: {
          titulo: {
            type: "string",
            label: "Submenu title",
            ref: "titulo_submenu",
            expression: "optional",
          },
          destino: {
            type: "boolean",
            label: "Destination",
            ref: "isLocalSheet",
            component: "switch",
            options: [
              {
                label: "Sheet",
                value: true,
              },
              {
                label: "External URL",
                value: false,
              },
            ],
          },
          hoja_destino: {
            type: "string",
            component: "dropdown",
            ref: "hoja_destino",
            label: "Sheet",
            options: function () {
              return sheets;
            },
            defaultValue: "",
            show: function (menu) {
              return menu.isLocalSheet;
            },
          },
          urlDestino: {
            type: "string",
            label: "URL",
            ref: "url_destino",
            defaultValue: "",
            show: function (menu) {
              return !menu.isLocalSheet;
            },
          },
        },
      },
    },
  };

  var brandOptions = {
    type: "items",
    label: "Brand",
    ref: "logo",
    items: {
      toggle: {
        type: "boolean",
        component: "switch",
        label: "Visible",
        ref: "visibilidad_logo",
        defaultValue: false,
        options: [
          {
            value: true,
            label: "Yes",
          },
          {
            value: false,
            label: "No",
          },
        ],
      },
      titulo: {
        type: "string",
        label: "Brand",
        ref: "marca_menu",
        show: function (data) {
          return data.visibilidad_logo;
        },
      },
    },
  };

  return {
    type: "items",
    component: "accordion",
    items: {
      settings: {
        uses: "settings",
        items: {
          colores: menuColores,
          logo: brandOptions,
          menus: addMenus,
        },
      },
    },
  };
});

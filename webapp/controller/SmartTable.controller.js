sap.ui.define([
	'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
], function (Controller, BindingMode, JSONModel, ChartFormatter, Format) {
	"use strict";

	return Controller.extend("sap.ui.comp.sample.smarttable.SmartTable", {
		onInit: function () {
            // pass
            // this._oModel = new ODataModel("https://services.odata.org/Northwind/Northwind.svc/", true);
			// this.getView().setModel(this._oModel);

            print("helloworld")
        },
		onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");
			// GW export
			if (mExcelSettings.url) {
				return;
			}
			// For UI5 Client Export --> The settings contains sap.ui.export.SpreadSheet relevant settings that be used to modify the output of excel
			// Disable Worker as Mockserver is used in Demokit sample --> Do not use this for real applications!
			mExcelSettings.worker = false;
		},
        onHide: function() {
            alert("Hide")
        },
        onShow: function(){
            alert("show")
        },
        onExport: function(){
        },
        onFilter: function(){
            alert("filter")
        },
        onSync: function(){
            alert("Synchronise")
        },
        onSort: function(){
            alert("Sort")
        },
        onFullScreen: function(){
            alert("Full screen")
        },
		onExit: function () {
			this._oMockServer.stop();
		},
		onSaveVariante: function(){
            alert("SaveVariante")
        }

	});
});
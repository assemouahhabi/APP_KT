sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/BindingMode',
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	'./InitPage'
], function(Controller, BindingMode, JSONModel, ChartFormatter, Format, InitPageUtil) {
"use strict";

var Controller = Controller.extend("sap.viz.sample.StackedBar.StackedBar", {


	oVizFrame : null,

	onInit : function (evt) {
		Format.numericFormatter(ChartFormatter.getInstance());
		var formatPattern = ChartFormatter.DefaultPattern;
		// set explored app's demo model on this sample
		var oModel = new JSONModel(this.settingsModel);
        oModel.setDefaultBindingMode(BindingMode.OneWay);
        this.getView().getModel(oModel);

		var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
		oVizFrame.setVizProperties({
			plotArea: {
				dataLabel: {
					formatString:formatPattern.SHORTFLOAT_MFD2,
					visible: true,
					showTotal: false
				}
			},
		});
		var sPath = jQuery.sap.getModulePath("project.mockdata", "/medium.json"); 
		var dataModel = new JSONModel(sPath);
		oVizFrame.setModel(dataModel);

		var oPopOver = this.getView().byId("idPopOver");
		oPopOver.connect(oVizFrame.getVizUid());
		oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

		InitPageUtil.initPageSettings(this.getView());
		var that = this;
		dataModel.attachRequestCompleted(function() {
			that.dataSort(this.getData());
		});
	},

	myOnClickHandler: function(oEvent) {
   
		var clickedData = oEvent.getParameter("data")[0].data
		// Event of Click on table
   },
	onDatasetSelected : function(oEvent){
		if (!oEvent.getParameters().selected) {
			return;
		}
		var datasetRadio = oEvent.getSource();
		if (this.oVizFrame && datasetRadio.getSelected()){
			var bindValue = datasetRadio.getBindingContext().getObject();
			var sPath = jQuery.sap.getModulePath("project.mockdata", "/medium.json"); 
			var dataModel = new JSONModel(sPath);
			this.oVizFrame.setModel(dataModel);
			var that = this;
			dataModel.attachRequestCompleted(function() {
				that.dataSort(this.getData());
			});
		}
	},
});

return Controller;

});
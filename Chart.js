function Chart() {
    this.config;
    this.container;
    this.seriesData;
    this.URL = localStorage.getItem("url");
    this.chart;
    this.chartCode;
    this.chartType;
    this.metaData;
    this.data;
    this.categories;
    this.dataset;

    var me = this;

    this.setMetaData = function (pMetaData) {
        this.metaData = pMetaData;
    };

    this.getMetaData = function () {
        return this.metaData;
    };

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.setChartCode = function (pChartCode) {
        this.chartCode = pChartCode;
    };

    this.getChartCode = function () {
        return this.chartCode;
    };

    this.setChartType = function (pChartType) {
        this.chartType = pChartType;
    };

    this.getChartType = function () {
        return this.chartType;
    };

    this.setURL = function (pURL) {
        this.URL = pURL;
    };

    this.getURL = function () {
        return this.URL;
    };

    this.setConfig = function (pConfig) {
        this.config = pConfig;
    };

    this.getConfig = function () {
        return this.config;
    };

    this.setDataset = function (pDataset) {
        this.dataset = pDataset;
    };

    this.getDataset = function () {
        return this.dataset;
    };
    
    this.setContainer = function (pContainer) {
        this.container = pContainer;
    };

    this.getContainer = function () {
        return this.container;
    };

    this.setSeriesData = function (pSeriesData) {
        this.seriesData = pSeriesData;
    };

    this.getSeriesData = function () {
        return this.seriesData;
    };

    this.setCategories = function (pCategories) {
        this.categories = pCategories;
    };

    this.getCategories = function () {
        return this.categories;
    };
    
    this.getCategory = function (pData) {
        return pData.categories;        
    };
    
    this.fetchMetaData = function () {
        var me = this;
        var lURL = this.getURL() + "getChart";
        var lMetaAjax = new FormAjax();
        lMetaAjax.setUrl(lURL + '?chartCode=' + this.getChartCode());
        lMetaAjax.setType('post');
        lMetaAjax.addEventListener('success', function (response) {
            var lJSONResponse = JSON.parse(response);
            me.setMetaData(lJSONResponse);
            me.fetchData();
        });
        lMetaAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error while gettting data for chart : ' + me.chartCode);
        });
        lMetaAjax.execute();
    };

    this.getData = function () {
        return this.data;
    };

    this.fetchData = function () {
        
        var that = this;
        var lAjax = new FormAjax();
        lAjax.setUrl(this.getURL() + "getChartData?data=" + this.getChartCode());
        lAjax.setSync(false);
//        var lData = JSON.stringify({
//            "data": { chartCode:this.getChartCode()
//            }
//        });
        var lData = this.getChartCode();
        lAjax.setData(lData);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
            var lJSONResponse = JSON.parse(response);
            var lType = that.getChartType();
            if (lType === "pie3d")
            {
                var lSeriesData = me.buildData(lJSONResponse);
                me.setData(lSeriesData);

                me.renderChart();
            } else
            {
                //for MSColumn2D and msline
                var lCategories = me.getCategory(lJSONResponse);
                me.setCategories(lCategories);
                var lSeriesData = me.buildChart(lJSONResponse);
                me.setDataset(lSeriesData);
                me.renderBarChart();
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error while gettting data for chart : ' + that.chartCode);
        });
        lAjax.execute();
    };

    this.buildData = function (pData) {
        
        var lData = pData.data;
        var lMetaData = this.getMetaData();
        var lChartAxisArray = lMetaData.chartAxis;
        for (var j in lData) {
            for (var i in lChartAxisArray) {
                var lChartAxis = lChartAxisArray[i];
                if (lChartAxis.dataType && lChartAxis.dataType === "number") {
                    var lValue = lData[j][i];
                    lValue = parseInt(lValue);
                    lData[j][i] = lValue;
                } else if (lChartAxis.dataType && lChartAxis.dataType === "date") {
                    var lValue = lData[j][i];
                    lValue = Date.parseString(lValue);
                    lData[j][i] = lValue.getTime();
                }
            }
        }
        return lData;
    };

    this.buildChart = function (pData) {
        
        var lData = pData.dataset;
        var lMetaData = this.getMetaData();
        var lChartAxisArray = lMetaData.chartAxis;
        for (var j in lData) {
            for (var i in lChartAxisArray) {
                var lChartAxis = lChartAxisArray[i];
                if (lChartAxis.dataType && lChartAxis.dataType === "number") {
                    for (var k in lData[i].data) {
                        var lValue = lData[i].data[k].value;
                        lValue = parseInt(lValue);
                        lData[i].data[k].value = lValue;
                    }
                } else if (lChartAxis.dataType && lChartAxis.dataType === "date") {
                    var lValue = lData[j][i];
                    lValue = Date.parseString(lValue);
                    lData[j][i] = lValue.getTime();
                }
            }
        }
        
        return lData;
    };

    this.render = function () {
        var that = this;
        this.fetchMetaData();
    };

    this.renderChart = function () {
        
        var lData = this.getData();
        var lCofigObj = this.getConfig();
        lCofigObj.dataSource.data = lData;

        this.chart = new FusionCharts(this.getConfig()).render();
    };
    
    this.renderBarChart = function(){
        var lData = this.getDataset();
        var lCofigObj = this.getConfig();
        var lCategories = this.getCategories();
        lCofigObj.dataSource.categories = lCategories;
        lCofigObj.dataSource.dataset = lData;
        
        this.chart = new FusionCharts(this.getConfig()).render();
    };

}



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var charturl = localStorage.getItem("url") + '/ChartServlet';

function Chart()
{
    this.chartcode = null;
    this.charttype = null;
    this.divId = null;

    this.setChartCode = function (pChartcode) {
        this.chartcode = pChartcode;
    };

    this.getChartCode = function () {
        return this.chartcode;
    };

    this.setChartType = function (pCharttype) {
        this.charttype = pCharttype;
    };

    this.getChartType = function () {
        return this.charttype;
    };

    this.setDivId = function (pDivId) {
        this.divId = pDivId;
    };

    this.getDivId = function () {
        return this.divId;
    };

    this.render = function () {
        var that = this;
        var lAjax1 = new FormAjax();
        lAjax1.setUrl(charturl);
        lAjax1.setData({ChartCode: this.chartcode, BarDiv: this.divId, ChartType: this.charttype});
        lAjax1.addEventListener('success', function (response) {
            console.log(response);
            that.drawChart(response);
        });
        lAjax1.addEventListener('error', function (textStatus, errorThrown) {
            console.log(textStatus + " ; " + errorThrown);
        });
        lAjax1.execute();
    };

    this.drawChart = function (response) {
        var obj = JSON.parse(response);
        if (this.getChartType() === "Bar")
        {
            Morris.Bar(obj);
        } else if (this.getChartType() === "Line")
        {
            Morris.Line(obj);
        } else if (this.getChartType() === "Area")
        {
            Morris.Area(obj);
        } else if (this.getChartType() === "Donut")
        {
            Morris.Donut(obj);
        }
    }

}

var chart = new Chart();

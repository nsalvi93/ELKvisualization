// JavaScript Document
var services = angular.module('services',[])
.service('chartOptions', ['$rootScope', function($rootScope){
	

			 
	this.creatingGraph = function(dataToBePlot){
	
	 this.dataset = [{ label: $rootScope.y_axis_param, data: dataToBePlot, color: "#5482FF" }];
	this.ticks = [[0, "0_random_read_100"], [1, "1_random_read_80_20"], [2, "2_random_read_50_50"], [3, "3_random_read_20_80"],								[4, "4_random_write_100"], [5, "5_sequential_read_100"],[6, "6_sequential_read_80_20"],
			 [7, "7_sequential_read_50_50"], [8, "8_sequential_read_20_80"], [9, "9_sequential_write_100"]];
	 
	 this.options = {
            series: {
                bars: {
                    show: true
                }
            },
            bars: {
                align: "center",
                barWidth: 0.5
            },
            xaxis: {
                axisLabel: "Job Names",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10,
                ticks: this.ticks
            },
            yaxis: {
                axisLabel: $rootScope.y_axis_param,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 3,
                tickFormatter: function (v, axis) {
                    return v + "";
                }
            },
            legend: {
                noColumns: 0,
                labelBoxBorderColor: "#000000",
                position: "nw"
            },
            grid: {
                hoverable: true,
                borderWidth: 2,
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
            }
        };
	
	
	$.plot($("#placeholder"), this.dataset, this.options);
	};
	
	}]);
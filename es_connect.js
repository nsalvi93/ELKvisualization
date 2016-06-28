//We define an EsConnector module that depends on the elasticsearch module.
var EsConnector = angular.module('EsConnector', ['elasticsearch','services']);
//Create the es service from the esFactory
EsConnector.service('es', function (esFactory) {
	return esFactory({ host: 'localhost:9200' });
});
//We define an Angular controller that returns the server health
//Inputs: $scope and the 'es' service
EsConnector.controller('ServerHealthController', function($scope, es) {
	es.cluster.health(function (err, resp) {
		if (err) {
			$scope.data = err.message;
		} else {
			$scope.data = resp;
		}
	});
});
//We define an Angular controller that returns query results,
//Inputs: $scope and the 'es' service
EsConnector.controller('QueryController', ['$scope','es','chartOptions', function($scope, es, chartOptions) {
	
	
	var countData =0;
	$scope.hits=[];
	$scope.mount_type= ["iscsi", "nfs", "cifs"];
	$scope.y_axis_param_options= ["Total iops", "Total bandwidth"];
	$scope.y_axis_param = "Total iops";
	$scope.instance_type=["m3.xlarge","m3.2xlarge","c3.8xlarge"];
	$scope.storage_type = ["giops","piops"];
	$scope.dedupe= ["on","off"];
	$scope.HA= ["on","off"];
	$scope.storage=["EBS","S3"];
	$scope.runs=["0_random_read_100", "1_random_read_80_20", "2_random_read_50_50", "3_random_read_20_80",
	"4_random_write_100", "5_sequential_read_100", "6_sequential_read_80_20", "7_sequential_read_50_50", 
	"8_sequential_read_20_80", "9_sequential_write_100"];
	
	$scope.plotCharts = function()
	{
		console.log("being executed");
		es.search({
			index: 'logstash-resultsfinal',
			type: 'allresults',
			size: 10000,
			body: {
				query:{
					filtered:{
						query:{
							match: {
								//Storage:"EBS"
								_all: "EBS"               //beware changing from EBS
							}
						}
					}
				},
				filter:{
					/* term:{
                      "Volume_Type.raw": "iscsi"
                    } */
					and: [
					      {
					    	  term:{"Volume Type": $scope.current_mount}
					      },
					      {
					    	  term:{"Dedupe": $scope.current_dedupe}
					      } 
					      ]
				}
			}
		}).then(function (response) {
			//$scope.hits = response.hits.hits;
			var dataToBePlot =[];
			var watever = response.hits.hits;
			var totalIops =[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]];
			var totalBandwidth =[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]];
			for(var i=0; i< watever.length; i++)
			{
				console.log(watever[i]['_source']['Storage']);
				if(watever[i]['_source']['Job Name']==='0_random_read_100')
				{
					totalIops[0][1] = totalIops[0][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[0][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='1_random_read_80_20')
				{
					totalIops[1][1] = totalIops[1][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[1][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='2_random_read_50_50')
				{
					totalIops[2][1] = totalIops[2][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[2][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='3_random_read_20_80')
				{
					totalIops[3][1] = totalIops[3][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[3][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='4_random_write_100')
				{
					totalIops[4][1] = totalIops[4][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[4][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='5_sequential_read_100')
				{
					totalIops[5][1] = totalIops[5][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[5][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='6_sequential_read_80_20')
				{
					totalIops[6][1] = totalIops[6][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[6][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='7_sequential_read_50_50')
				{
					totalIops[7][1] = totalIops[7][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[7][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='8_sequential_read_20_80')
				{
					totalIops[8][1] = totalIops[8][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[8][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
				else if(watever[i]['_source']['Job Name']==='9_sequential_write_100')
				{
					totalIops[9][1] = totalIops[9][1] + watever[i]['_source']['Total IOPS'];
					totalBandwidth[9][1] = totalBandwidth[0][1] + watever[i]['_source']['Total BW'];
				}
			}
			//console.log(totalIops.length);
			for(var j=0; j< totalIops.length; j++)
			{
				console.log(totalIops[j][1]);
			}
			$scope.hits = watever;
			
			if($scope.y_axis_param === 'Total iops')
			{
				dataToBePlot = 	totalIops;
				
			}
			else
			{
				dataToBePlot = totalBandwidth;
			}
			
			$scope.totalIOPS = totalIops;
			$scope.totalBw = totalBandwidth;
			
			
			
			
			chartOptions.creatingGraph(dataToBePlot);
	
			
		});
	
	};
}]);


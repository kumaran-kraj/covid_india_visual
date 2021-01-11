		var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				/*{
					label: '',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [
						
					],
					fill: false,
				}, {
					label: '',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: [
						
					],
				}
				*/]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'COVID19'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'time'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'population'
						}
					}]
				}
			}
		};
		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);
			setcanv("none");
			ajaxListAllRegions()
		};
		
		var colorNames = Object.keys(window.chartColors);
		function add_dataset() {
			var colorName = colorNames[config.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			var newDataset = {
				label: 'Dataset ' + config.data.datasets.length,
				backgroundColor: newColor,
				borderColor: newColor,
				data: [],
				fill: false
			};

			for (var index = 0; index < config.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config.data.datasets.push(newDataset);
			window.myLine.update();
		}
		//document.getElementById('addDataset').addEventListener('click',add_dataset );

		
		function remove_dataset() {
			config.data.datasets.splice(0, 1);
			window.myLine.update();
		}

		//document.getElementById('removeDataset').addEventListener('click',remove_dataset );

		function remove_data() {
			config.data.labels.splice(-1, 1); // remove the label first

			config.data.datasets.forEach(function(dataset) {
				dataset.data.pop();
			});

			window.myLine.update();
		}
		//document.getElementById('removeData').addEventListener('click',remove_data );
		
		

//----------------------------------------------------------------------------------------------------------------
			//---------------------
			function setcanv(setval)
			{
				var j = document.getElementById("cardplot");
				j.style.display = setval;
			}
			//window.myLine=null;
				
			
			let countriesJSON = null;//variable to hold json 
			function district_table()
			{
				for (var i=0;i<config.data.datasets.length;i++)
					{remove_dataset();}
					var c_maxv;
					var c_minv;
					var d_maxv;
					var d_minv;
					var r_maxv;
					var r_minv;
					/*
					for (var i=0 ; i<arr.length ; i++) {
						
						
						
						if (maxv == null || parseInt(arr[i][prop]) > parseInt(maxv[prop]))
							max = arr[i];
						if (minv == null || parseInt(arr[i][prop]) < parseInt(minv[prop]))
							minv = arr[i];
						
					}
					*/
					
					for (name in countriesJSON)
					{		
						if (name=="State Unassigned"){continue;}//ignoring unassigned template
					
						obj2=countriesJSON[name];//stse obj
						d_st=Object.keys(obj2["districtData"]).length;
						for (dst in obj2["districtData"])
						{
							var cnf=parseInt(obj2["districtData"][dst]["confirmed"],10);
							var dcs=parseInt(obj2["districtData"][dst]["deceased"],10);
							var rco=parseInt(obj2["districtData"][dst]["recovered"],10);
							
							if (c_maxv == null || c_maxv < cnf)
								c_maxv = cnf;
							if (c_minv == null || c_minv > cnf)
								c_minv = cnf;
							
							if (d_maxv == null || d_maxv < dcs)
								d_maxv = dcs;
							if (d_minv == null || d_minv > dcs)
								d_minv = dcs;
							
							if (r_maxv == null || r_maxv < rco)
								r_maxv = rco;
							if (r_minv == null || r_minv > rco)
								r_minv = rco;

						}
					}
					console.log(c_minv);
					console.log(c_maxv);
					console.log(d_minv);
					console.log(d_maxv);
					console.log(r_minv);
					console.log(r_maxv);
					
				
				var fl=1;//flag to create district heading 
				var n_st=Object.keys(countriesJSON).length;//number of state entries
				
				var d_st=0;//district object holder
				var op_st="<table>";//output string
				
				//table colum titles
				//	state	district	confirmed	deceased	recovered
				op_st+="<tr><th>state</th><th>district</th><th>confirmed</th><th>deceased</th><th>recovered</th></tr>"
					
				for (name in countriesJSON)
				{		
					if (name=="State Unassigned"){continue;}//ignoring unassigned template
				
				 obj2=countriesJSON[name];//stse obj
				 d_st=Object.keys(obj2["districtData"]).length;//number of districts
				 
				 fl=0;//once enter state name
				 
					
				 for (dst in obj2["districtData"])
				 {		

					op_st+="<tr>";
					 if(fl==0)
					 {
						fl=1;//reset flag
						op_st+="<th rowspan=\""+d_st+"\">"+name+"</th>";
						//way to create an entry that spans multiple rows soo state name is shown once for all districts
					 }
					
					
					
					//district name
					op_st+="<td style=\"background-color:#f2f2f2\">";
					op_st+=dst;
					op_st+="</td>";
					var scl=0;
					//cell coloured based on value
					var cnf=parseInt(obj2["districtData"][dst]["confirmed"],10);
					var c_r=0;
					var c_g=0;
					
					scl=((cnf-c_minv)/(c_maxv-c_minv));
					//scl=(Math.log(10*scl+1)/Math.log(11))*255;
					scl=Math.sqrt(scl)*255;
					
					g_c=(255-scl);
					r_c=(scl);
					r_c=Math.sqrt(r_c/255)*255;
					g_c=Math.sqrt(g_c/255)*255;
						
					op_st+="<td style=\"background-color:rgb(";op_st+=r_c;op_st+=",";op_st+=g_c;op_st+=",0)\">";
					
					
					//cell value
					op_st+=obj2["districtData"][dst]["confirmed"];
					op_st+="</td>";
					
					
					//cell coloured based on value
					var dcs=parseInt(obj2["districtData"][dst]["deceased"],10);
					
					scl=((dcs-d_minv)/(d_maxv-d_minv));
					scl=Math.sqrt(scl)*255;
					
					//scl=(Math.log(10*scl+1)/Math.log(11))*255;
					g_c=(255-scl);r_c=(scl);
					r_c=Math.sqrt(r_c/255)*255;
					g_c=Math.sqrt(g_c/255)*255;					
					op_st+="<td style=\"background-color:rgb(";op_st+=r_c;op_st+=",";op_st+=g_c;op_st+=",0)\">";
					
					//cell value
					op_st+=obj2["districtData"][dst]["deceased"];
					op_st+="</td>";
					
					
					//cell colour based on value 
					var rco=parseInt(obj2["districtData"][dst]["recovered"],10);
					
					scl=((rco-r_minv)/(r_maxv-r_minv));
					//scl=(Math.log(10*scl+1)/Math.log(11))*255;
					scl=Math.sqrt(scl)*255;
					g_c=(255-scl);
					r_c=(scl);
					r_c=Math.sqrt(r_c/255)*255;
					g_c=Math.sqrt(g_c/255)*255;
					op_st+="<td style=\"background-color:rgb(";op_st+=r_c;op_st+=",";op_st+=g_c;op_st+=",0)\">";
					
					//cell value
					op_st+=obj2["districtData"][dst]["recovered"];
					op_st+="</td>";
					
					//entry end
					op_st+="</tr>";
				}
					
				}
					
				op_st+="</table>";
				display(op_st);
				setcanv("none");
			}
			function pt_table(inst)//series table from json 2
			{
				for (var i=0;i<=config.data.datasets.length;i++)
					{remove_dataset();}
				
				var i=0;
				var c_m=0;
				var d_m=0;
				var r_m=0;
				if(inst=="cases_time_series")
				{
					//----------------------------------------
					for (var i=0;i<=config.data.datasets.length;i++)
					{remove_dataset();}
					var colorName;
					var newColor;
					var newDataset;
					newColor = window.chartColors[colorName];
					colorName = colorNames[config.data.datasets.length % colorNames.length];
					newDataset= {
						label: '10 recovered' ,
						backgroundColor: newColor,
						borderColor: newColor,
						data: [],
						fill: false
					};
					config.data.datasets.push(newDataset);
					newColor = window.chartColors[colorName];
					colorName = colorNames[config.data.datasets.length % colorNames.length];
					window.myLine.update();
					newDataset= {
						label: 'diseased' ,
						backgroundColor: newColor,
						borderColor: newColor,
						data: [],
						fill: false
					};
					config.data.datasets.push(newDataset);
					newColor = window.chartColors[colorName];
					colorName = colorNames[config.data.datasets.length % colorNames.length];
					window.myLine.update();
					newDataset= {
						label: '10 confirmed' ,
						backgroundColor: newColor,
						borderColor: newColor,
						data: [],
						fill: false
					};
					config.data.datasets.push(newDataset);
					window.myLine.update();
					//----------------------------------------
					config.data.labels=[];
					countriesJSON[inst].map(obj =>
					{
						//var month=obj["date"];
						config.data.labels.push(obj["date"]);
						config.data.datasets[2].data.push((parseInt(obj["dailyconfirmed"]))/10 );
						config.data.datasets[1].data.push(parseInt(obj["dailydeceased"]));
						config.data.datasets[0].data.push( (parseInt(obj["dailyrecovered"]))/10 );
						if(c_m<parseInt(obj["dailyconfirmed"])){c_m=parseInt(obj["dailyconfirmed"]);}
						if(d_m<parseInt(obj["dailydeceased"])){d_m=parseInt(obj["dailydeceased"]);}
						if(r_m<parseInt(obj["dailyrecovered"])){r_m=parseInt(obj["dailyrecovered"]);}

					})
					//-----------
					var op_st="<table>";
					
					//column titles
					//	date	confirmed	deceased	recovered
					op_st+="<tr><th>date</th><th>confirmed</th><th>deceased</th><th>recovered</th></tr>"
					
						
					//getting individual objects
					countriesJSON[inst].map(obj =>
					{
						
						op_st+="<tr>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["date"];//date entry 
						op_st+="</td>";
						
						//getting value
						var cell=parseInt(obj["dailyconfirmed"]);
						var scl;//cell/c_m;
						var c_r=0;
						var c_g=0;
						//cell colour based on value
						
						scl=cell/c_m;
						scl=Math.sqrt(scl)*255;
					
						g_c=(255-scl);
						r_c=(scl);
						r_c=Math.sqrt(r_c/255)*255;
						g_c=Math.sqrt(g_c/255)*255;
							
						op_st+="<td style=\"background-color:rgb(";op_st+=r_c;op_st+=",";op_st+=g_c;op_st+=",0)\">";
						
						//cell value
						op_st+=obj["dailyconfirmed"];
						op_st+="</td>";
						
						//getting value
						
						var cell=parseInt(obj["dailydeceased"]);
						
						scl=cell/d_m;
						scl=Math.sqrt(scl)*255;
					
						g_c=(255-scl);
						r_c=(scl);
						r_c=Math.sqrt(r_c/255)*255;
						g_c=Math.sqrt(g_c/255)*255;
							
						op_st+="<td style=\"background-color:rgb(";op_st+=r_c;op_st+=",";op_st+=g_c;op_st+=",0)\">";
						//cell value
						op_st+=obj["dailydeceased"];
						op_st+="</td>";
						
						//gettting value
						var cell=parseInt(obj["dailyrecovered"]);
						scl=cell/r_m;
						scl=Math.sqrt(scl)*255;
					
						g_c=(255-scl);
						r_c=(scl);
						r_c=Math.sqrt(r_c/255)*255;
						g_c=Math.sqrt(g_c/255)*255;
							
						op_st+="<td style=\"background-color:rgb(";op_st+=r_c;op_st+=",";op_st+=g_c;op_st+=",0)\">";
						
						//cell value
						op_st+=obj["dailyrecovered"];
						op_st+="</td>";
						
						//entry end
						op_st+="</tr>";
					})
					op_st+="</table>";
					display(op_st);
					setcanv("block");
				}
				if(inst=="statewise")
				{
					var op_st="<table>";
					//	state	active	confirmed	deceased	recovered
					//					value|delta	value|delta	value|delta
					//heading level 1
					op_st+="<tr><th rowspan=\"2\">state</th><th rowspan=\"2\">active</th><th colspan=\"2\">confirmed</th><th colspan=\"2\">deceased</th><th colspan=\"2\">recovered</th></tr>"
					//heading level 2
					op_st+="<tr><th>value</th><th>delta</th><th>value</th><th>delta</th><th>value</th><th>delta</th></tr>"
					
						
					//getting individual objects
					countriesJSON[inst].map(obj =>
					{
						op_st+="<tr>";
						
						
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["state"];//value1
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["active"];//value2
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["confirmed"];//value3
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["deltaconfirmed"];//value4
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["deaths"];//value5
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["deltadeaths"];//value6
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["recovered"];//value7
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["deltarecovered"];//value8
						op_st+="</td>";
						
						//end entry
						op_st+="</tr>";
					})
					//var i=0;
					
					op_st+="</table>";
					display(op_st);
					setcanv("none");
				}
				
				if(inst=="tested")
				{
					for (var i=0;i<=config.data.datasets.length;i++)
					{remove_dataset();}
					config.data.labels=[];
					var op_st="<table>";
					
					op_st+="<tr><th>date</th><th>tested samples</th><th>+ve rate</th><th>test per million</th></tr>"
					
					//---------------------------
					
					var colorName;
					var newColor;
					var newDataset;
					newColor = window.chartColors[colorName];
					colorName = colorNames[config.data.datasets.length % colorNames.length];
					newDataset= {
						label: '10k tested samples per day' ,
						backgroundColor: newColor,
						borderColor: newColor,
						data: [],
						fill: false
					};
					config.data.datasets.push(newDataset);
					newColor = window.chartColors[colorName];
					colorName = colorNames[config.data.datasets.length % colorNames.length];
					window.myLine.update();
					newDataset= {
						label: '+ve rate*10' ,
						backgroundColor: newColor,
						borderColor: newColor,
						data: [],
						fill: false
					};
					config.data.datasets.push(newDataset);
					newColor = window.chartColors[colorName];
					colorName = colorNames[config.data.datasets.length % colorNames.length];
					window.myLine.update();
					newDataset= {
						label: '100 test per million' ,
						backgroundColor: newColor,
						borderColor: newColor,
						data: [],
						fill: false
					};
					config.data.datasets.push(newDataset);
					window.myLine.update();
					var prev=0;
					var pret=0
					var nowv;
					var nowt;
					//----------------------------
					countriesJSON[inst].map(obj =>
					{
						nowv=parseInt(obj["totalsamplestested"]);
						nowt=parseInt(obj["testspermillion"]);
						config.data.labels.push(obj["testedasof"]);
						config.data.datasets[0].data.push((nowv-prev)/10000);
						config.data.datasets[1].data.push(parseInt(obj["testpositivityrate"])*10);
						config.data.datasets[2].data.push((nowt-pret)/10);
						prev=nowv;		
						pret=nowt;						
					})
					//-----------------------------
						
					//getting individual objects
					countriesJSON[inst].map(obj =>
					{
						
						op_st+="<tr>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["testedasof"];//value1
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["totalsamplestested"];//value2
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["testpositivityrate"];//value3
						op_st+="</td>";
						
						op_st+="<td style=\"background-color:#f2f2f2\">";
						op_st+=obj["testspermillion"];//value4
						op_st+="</td>";
						
						//entry end 
						op_st+="</tr>";
					})
					
					op_st+="</table>";
					display(op_st);
					setcanv("block");
					window.myLine.update();
					//setcanv("none");
				}
				window.myLine.update();
			}
			
			
			function display(msg) //quick update function 
			{
				var p = document.getElementById("demo");
				p.innerHTML = msg;
				
			}
			function updateWebpage(jsonData) 
			{
				countriesJSON = JSON.parse(JSON.stringify(jsonData));//json to js object 

				document.getElementById("demo").innerHTML=" ";//clearing webpage for next table
				return 1;
			}
			
			
			async function ajaxListAllRegions()
			{
				let url = 'https://api.covid19india.org/state_district_wise.json'   ; /* name of the JSON file 1*/
				//let url = 'state_district_wise.json'
				try
				{
					const response = await fetch(url);
					var rsp=await updateWebpage(await response.json())
					
					district_table();
				}
				catch (error)
				{
					console.log('Fetch failed: ', error);
				}
			}
			
			async function ajaxListParticulars(inp_st)
			{
				let url = 'https://api.covid19india.org/data.json'   ; /* name of the JSON file 2*/
				try
				{
					const response = await fetch(url);
					var rsp=await updateWebpage(await response.json());

					pt_table(inp_st);//get input value and select sub section from table 
				}
				catch (error)
				{
					console.log('Fetch failed: ', error);
				}
			}
			function select_fn( inp_st)
			{
				
				if(inp_st=="district")
				{
					setcanv("none");
					ajaxListAllRegions();
				}
				else 
				{
					ajaxListParticulars(inp_st);
				}
			}
			

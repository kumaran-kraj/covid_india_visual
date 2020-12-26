
			let countriesJSON = null;//variable to hold json 
			function district_table()
			{
				
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
					
					//cell coloured based on value
					var cnf=parseInt(obj2["districtData"][dst]["confirmed"],10);
					
					if(cnf<100)
						{op_st+="<td style=\"background-color:#66ff33\">";}//colour1
					else if(cnf<1000)
						{op_st+="<td style=\"background-color:#ccff33\">";}//colour2
					else if(cnf<10000)
						{op_st+="<td style=\"background-color:#ffcc00\">";}//colour3
					else if(cnf<100000)
						{op_st+="<td style=\"background-color:#ff9933\">";}//colour4
					else if(cnf<1000000)
						{op_st+="<td style=\"background-color:#ff0000\">";}//colour5
					else{op_st+="<td>";}//colour default
					//cell value
					op_st+=obj2["districtData"][dst]["confirmed"];
					op_st+="</td>";
					
					
					//cell coloured based on value
					var dcs=parseInt(obj2["districtData"][dst]["deceased"],10);
					
					if(dcs<5)
						{op_st+="<td style=\"background-color:#66ff33\">";}//colour1
					else if(dcs<10)
						{op_st+="<td style=\"background-color:#ccff33\">";}//colour2
					else if(dcs<100)
						{op_st+="<td style=\"background-color:#ffcc00\">";}//colour3
					else if(dcs<1000)
						{op_st+="<td style=\"background-color:#ff9933\">";}//colour4
					else if(dcs<10000)
						{op_st+="<td style=\"background-color:#ff0000\">";}//colour5
					else{op_st+="<td>";}//colour default
					//cell value
					op_st+=obj2["districtData"][dst]["deceased"];
					op_st+="</td>";
					
					
					//cell colour based on value 
					var rco=parseInt(obj2["districtData"][dst]["recovered"],10);
					
					if(rco<100)
						{op_st+="<td style=\"background-color:#66ff33\">";}//colour1
					else if(rco<1000)
						{op_st+="<td style=\"background-color:#ccff33\">";}//colour2
					else if(rco<10000)
						{op_st+="<td style=\"background-color:#ffcc00\">";}//colour3
					else if(rco<100000)
						{op_st+="<td style=\"background-color:#ff9933\">";}//colour4
					else if(rco<1000000)
						{op_st+="<td style=\"background-color:#ff0000\">";}//colour5
					else{op_st+="<td>";}//colour default
					
					//cell value
					op_st+=obj2["districtData"][dst]["recovered"];
					op_st+="</td>";
					
					//entry end
					op_st+="</tr>";
				}
					
				}
					
				op_st+="</table>";
				display(op_st);
			}
			function pt_table(inst)//series table from json 2
			{
				
				var i=0;
				if(inst=="cases_time_series")
				{
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
						
						//cell colour based on value
						if(cell<10)
							{op_st+="<td style=\"background-color:#66ff33\">";}//colour1
						else if(cell<100)
							{op_st+="<td style=\"background-color:#ccff33\">";}//colour2
						else if(cell<1000)
							{op_st+="<td style=\"background-color:#ffcc00\">";}//colour3
						else if(cell<10000)
							{op_st+="<td style=\"background-color:#ff9933\">";}//colour4
						else if(cell<100000)
							{op_st+="<td style=\"background-color:#ff0000\">";}//colour5
						else{op_st+="<td>";}//colour default
						
						//cell value
						op_st+=obj["dailyconfirmed"];
						op_st+="</td>";
						
						//getting value
						var cell=parseInt(obj["dailydeceased"]);
						
						//cell colour based on value
						if(cell<5)
							{op_st+="<td style=\"background-color:#66ff33\">";}//colour1
						else if(cell<300)
							{op_st+="<td style=\"background-color:#ccff33\">";}//colour2
						else if(cell<100)
							{op_st+="<td style=\"background-color:#ffcc00\">";}//colour3
						else if(cell<700)
							{op_st+="<td style=\"background-color:#ff9933\">";}//colour4
						else if(cell<3000)
							{op_st+="<td style=\"background-color:#ff0000\">";}//colour5
						else{op_st+="<td>";}//colour default
						
						//cell value
						op_st+=obj["dailydeceased"];
						op_st+="</td>";
						
						//gettting value
						var cell=parseInt(obj["dailyrecovered"]);
						
						//cell colour based on value
						if(cell<10)
							{op_st+="<td style=\"background-color:#66ff33\">";}//colour1
						else if(cell<200)
							{op_st+="<td style=\"background-color:#ccff33\">";}//colour2
						else if(cell<3000)
							{op_st+="<td style=\"background-color:#ffcc00\">";}//colour3
						else if(cell<40000)
							{op_st+="<td style=\"background-color:#ff9933\">";}//colour4
						else if(cell<150000)
							{op_st+="<td style=\"background-color:#ff0000\">";}//colour5
						else{op_st+="<td>";}//colour default
						
						//cell value
						op_st+=obj["dailyrecovered"];
						op_st+="</td>";
						
						//entry end
						op_st+="</tr>";
					})
					op_st+="</table>";
					display(op_st);
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
				}
				
				if(inst=="tested")
				{
					var op_st="<table>";
					
					op_st+="<tr><th>date</th><th>tested samples</th><th>+ve rate</th><th>test per million</th></tr>"
					
					
						
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
				}
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
					ajaxListAllRegions();
				}
				else 
				{
					ajaxListParticulars(inp_st);
				}
			}
			

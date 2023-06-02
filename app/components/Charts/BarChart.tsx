'use client'

import React, {useState, useEffect} from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import SkeletonChart from "../Skeleton/SkeletonChart";



 function BarChart(){
  const [chart, setChart] = useState (null);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState ([]);
  const [stateData, setStateData] = useState();




    
    useEffect(() => {
    const consumption: any[] =[];
    const hour = [];
    const day = [];
    const year : any[] =[];
    const reference =[];
    const month: any[] =[];
    const data : any[] =[];

        axios.get(`http://localhost:3001/data?year=2022&_limit=10`).then((res) => {
                res.data.map((item: { data:any; consumption: any; hour: any; day: any; month: any; year: any; reference: any;})=>{
                    // console.log('item', item.consumption, 'hora', item.hour,'dia', item.day, 'mes', item.month)
                    consumption.push(item.consumption)
                    hour.push(item.hour)
                    day.push(item.day)
                    month.push (item.month)
                  
                  
                    
                
                    reference.push(item.reference) 
                    year.push(item.year) 
              
                    // setObject({chart:{id:'BarChart'},xaxis: {categories: ['Jan']}})     
                    setCategory(month)
                    setData(consumption)
                    // setSeries([{name:'2021',data:consumption}, {name:'2022',data:consumption}])                    
                    console.log(item.consumption)
                
                  })

                 
                // console.log("media", consumption[0], hour[0] * day[0] )
            }).catch(err => {
              console.log(err)
            })

           
            setTimeout( async () =>{
              const res = await axios.get("http://localhost:3001/data?_page=2&_limit=100");
              setChart(res)
            },2500)
            
    }, [])

    
    return (
        <div className="pt-5 pl-10 pr-5">
           {chart && (
            <div className="bg-white p-8 shadow-md rounded-md space-y-2 grid-rows-1	 ">
             
                <div className="text-gray-600 font-semibold">Consumo Anual (2021 / 2022) </div>
                <div className="text-gray-600 mb-2 text-sm">Comparativo mensal do consumo realizado nos anos de 2021 e 2022.</div>               
                <div id="chart">
                <ReactApexChart
                options={{
                  chart: {
                    height: 350,
                    type: 'line',
                    
                      toolbar:{
              tools:{
                  download: false,
              },
             
                      },
                    zoom: {
                      enabled: true
                    }
                  },  xaxis: {
                      categories: category,
                    },
                    dataLabels: {
                      enabled: false,
                   
                    }
                }}
                series={[{
                  name: "2021",
                  data: data
              },  
              {
              name: "2022",
              data: data
          },  
            ]}
                type="bar"
                height={350}
                />
                </div>
              
                </div>
                  )}

                  {!chart && (
                    <SkeletonChart />
                  )}
            </div>
    )
}

export default BarChart;
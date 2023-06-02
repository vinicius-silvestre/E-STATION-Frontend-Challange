'use client'
import React, {useState, useEffect} from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import SkeletonLineHistory from "../Skeleton/SkeletonLineHistory";




 function LineChartHistory(){

  const [chart, setChartHistory] = useState (null);


  const [category, setCategory] = useState([]);

const [data, setData] = useState ([]);





useEffect(() => {
const consumption: any[] =[];
const hour = [];
const day = [];
const reference = [];
const month: any[] = [];
    axios.get(`http://localhost:3001/data?year=2022&month=12&day=31&day=30&day=29&day=28&day=27&day=26&day=25`).then((res) => {
            res.data.map((item: { consumption: any; hour: any; day: any; month: any; reference: any; })=>{
                // console.log('item', item.consumption, 'hora', item.hour,'dia', item.day, 'mes', item.month)
                consumption.push(item.consumption)
                hour.push(item.hour)
                day.push(item.day)
                month.push(item.month) 
                reference.push(item.reference) 

                setCategory(month)     
                setData(consumption)                    
                // res.data.slice((item: { month: number; }) =>{
                //     var month = item.month == 1                        
                // })
                // console.log(month.length ,'jan')
                // console.log(item.consumption)
            })
          
            // console.log("media", consumption[0], hour[0] * day[0] )
            setTimeout( async () =>{
              const res = await axios.get("http://localhost:3001/data?_page=1&_limit=10");
              setChartHistory(res)
            },2500)
        })
        
}, [])



    return (
        <div className="pt-10 pl-10 pr-10">
           {chart && (
            <div className="bg-white p-8 shadow-md rounded-md space-y-2 grid-rows-1	 ">
                <div className="text-gray-600 mb-2 font-semibold">Medição Histórica (Última Semana)</div>


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
          enabled: false
        }
      },  xaxis: {
          categories: category,
        },
        dataLabels: {
          enabled: false,
       
        }
    }}
    series={[{
      name: "Consumo",
      data: data,
  }
  ]}
    type="line"
    height={250}
  /></div>


                </div>
           )}

{!chart && (
                    <SkeletonLineHistory />
                  )}
            </div>
    )
}

export default LineChartHistory;
'use client'
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import SkeletonLineHistory from "../Skeleton/SkeletonLineHistory";


function LineChartHistory() {
  const [chart, setChartHistory] = useState(null);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  //Requisição dos dados da API via axios / json-server
  useEffect(() => {
    loadChartHistory();
  }, [])

  const loadChartHistory = async () => {
    const consumption: any[] = [];
    const reference = [];
    const month: any[] = [];
    axios.get(`http://localhost:3001/data?year=2022&month=12&day=31&day=30&day=29&day=28&day=27&day=26&day=25`).then((res) => {
      res.data.map((item: { consumption: any; hour: any; day: any; month: any; reference: any; }) => {
        // console.log('item', item.consumption, 'hora', item.hour,'dia', item.day, 'mes', item.month)
        consumption.push(item.consumption.toFixed(0))
        month.push(item.month)
        reference.push(item.reference)
        setCategory(reference)
        setData(consumption)
      })
      setTimeout(async () => {
        const res: any = await axios.get("http://localhost:3001/data?_page=1&_limit=10");
        setChartHistory(res)
      }, 2500)
    }).catch(err => {
      console.log(err)
    })
  }
  //Fim da requisição dos dados da API via axios / json-server

  return (
    <div className="pt-5 pl-2 pr-2 lg:pt-10 lg:pl-10 lg:pr-10">
      {chart && (
        <div className="bg-white p-8 shadow-md rounded-md space-y-2 grid-rows-1	 ">
          <div className="text-gray-600 mb-2 font-semibold">Medição Histórica (Última Semana)</div>


          <div id="chart">
            <ReactApexChart
              options={{
                chart: {
                  height: 350,
                  type: 'line',
                  toolbar: {
                    tools: {
                      download: false,
                    },
                  },
                  zoom: {
                    enabled: false
                  }
                }, xaxis: {
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
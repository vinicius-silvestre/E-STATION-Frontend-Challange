'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import ReactApexChart from "react-apexcharts";
import SkeletonChart from "../Skeleton/SkeletonChart";



function BarChart() {
  const [chart, setChart] = useState(null);
  const [category, setCategory] = useState([]);
  const [data21, setData21] = useState([]);
  const [data22, setData22] = useState([]);


//Requisição dos dados da API via axios e json-server

  useEffect(() => {
    loadBarChart21();
    loadBarChart22();
  }, [])

  const loadBarChart22 = async () => {

    const consumption: any[] = [];
    const month: any[] = [];
    axios.get(`http://localhost:3001/data?year=2022&_limit=12`).then((res) => {
      res.data.map((item: { data: any; consumption: any; hour: any; day: any; month: any; year: any; reference: any; }) => {
        consumption.push(item.consumption.toFixed(0))
        const sum = consumption.reduce((p, c) => {
          return p + c
        }, 0)
        month.push(item.month)
        setCategory(month);
        setData22(consumption);
      })
    }).catch(err => {
      console.log(err)
    })
    setTimeout(async () => {
      const res: any = await axios.get("http://localhost:3001/data?_page=2&_limit=100");
      setChart(res)
    }, 2500)
  }

  const loadBarChart21 = async () => {
    const consumption: any[] = [];
    const month: any[] = [];
    axios.get(`http://localhost:3001/data?year=2021&_limit=12`).then((res) => {
      res.data.map((item: { data: any; consumption: any; hour: any; day: any; month: any; year: any; reference: any; }) => {
        consumption.push(item.consumption.toFixed(0))
        month.push(item.month.toString)
        setCategory(month)
        setData21(consumption)
      })
    }).catch(err => {
      console.log(err)
    })
    setTimeout(async () => {
      const res: any = await axios.get("http://localhost:3001/data?_page=2&_limit=10");
      setChart(res)
    }, 2500)
  }
//Fim da requisição dos dados da API via axios / json-server


  return (
    <div className=" pt-5 pl-2 pr-2 lg:pt-5 lg:pl-10 lg:pr-5">
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

                  toolbar: {
                    tools: {
                      download: false,

                    },

                  },
                  zoom: {
                    enabled: true
                  }
                }, xaxis: {
                  categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                },

                dataLabels: {
                  enabled: false,

                }
              }}
              series={[{
                name: "2021",
                data: data21
              },
              {
                name: "2022",
                data: data22
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
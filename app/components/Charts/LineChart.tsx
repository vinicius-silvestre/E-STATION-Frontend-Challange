'use client'

import React from "react";
import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLine from "../Skeleton/SkeletonLine";


function LineChart() {
  const [year, setYear] = useState('2021')
  const [month, setMonth] = useState('1')
  const [day, setDay] = useState('1')
  const [chart, setChartLine] = useState(null)
  const [category, setCategory] = useState([]);
  const [data, setData] = useState();


  function onYearChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setYear(event.target.value);
  }

  function onMonthChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setMonth(event.target.value);
  }

  function onDayChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setDay(event.target.value);
  }

//Requisição dos dados da API via axios / json-server

  useEffect(() => {
    loadLineChart();  
  }, [year, month, day])

  const loadLineChart = async () =>{
  axios.get(`http://localhost:3001/data?year=${year}&month=${month}&day=${day}`).then((res) => {
      const consumption: any[] = [];
      const hour: any[] = [];
      const day = [];
      const month: any[] = [];
      res.data.map((item: { consumption: any; hour: any; day: any; month: any; }) => {
        consumption.push(item.consumption.toFixed(0))
        day.push(item.day)
        month.push(item.month)
        setCategory(hour)
        setData(consumption)
      })
      setTimeout(async () => {
        const res: any = await axios.get("http://localhost:3001/data?_page=2&_limit=10");
        setChartLine(res)
      }, 2500)
    }).catch(err => {
      console.log(err)
    })
  }
  //Fim da requisição dos dados da API via axios / json-server



  return (
    <div className="pt-5 pl-2 pr-2  lg:pt-5 lg:pl-5 lg:pr-10">
      {chart && (
        <div className="bg-white p-8 shadow-md rounded-md space-y-2 grid-rows-1	 ">
          <div className="text-gray-600 mb-8 font-semibold">Medição Horária (Por Dia)</div>
          <div className="grid grid-cols-3 gap-8 pb-3 ">
            <select onChange={onDayChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled>Selecione o dia</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>

            </select>
            <select onChange={onMonthChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled>Selecione o mês</option>
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
            <select onChange={onYearChange}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled>Selecione o ano</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>

            </select>
          </div>

          <div id="chart">
            <ReactApexChart
              options={{
                chart: {
                  height: 350,
                  type: 'line',
                  offsetY: 0,
                  toolbar: {
                    tools: {
                      download: false
                    },
                  },
                  zoom: {
                    enabled: false
                  }
                }, xaxis: {
                  labels:{ 
                    show: false
                  },
                  categories: category,
                },annotations: {
                  yaxis: [
                    {
                      y: 110,
                      borderColor: '#e30000',
                      label: {
                        borderColor: '#e30000',
                        style: {
                          color: '#fff',
                          background: '#e30000'
                        },
                        text: 'Flex Máxima'
                      }
                    },
                    {
                      y: 100,
                      borderColor: '#1ac600',
                      label: {
                        borderColor: '#1ac600',
                        style: {
                          color: '#fff',
                          background: '#1ac600'
                        },
                        text: 'Consumo Flat'
                      }
                    },
                    {
                      y: 90,
                      borderColor: '#2800c6',
                      label: {
                        borderColor: '#2800c6',
                        style: {
                          color: '#fff',
                          background: '#2800c6'
                        },
                        text: 'Flex Mínima'
                      }
                    }
                  ]
                },
                dataLabels: {
                  enabled: false,
                  
                }
              }}
              series={[
                { name: "Consumo", data: data },
               
                
              ]}
              type="line"
              height={290}
            />
          </div>

        </div>
      )}
      {!chart && (
        <SkeletonLine />
      )}
    </div>
  )
}

export default LineChart;
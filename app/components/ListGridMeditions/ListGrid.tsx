'use client'

import { useEffect, useState } from 'react';
import axios from "axios";
import SkeletonListTable from '../Skeleton/SkeletonList';

function ListItem(){


    const [list, setList] = useState(null);
    const [data, setData] = useState([]);
    const [dataTotal, setTotalData] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [currentPage, setCurrentPage] = useState('1');
    const [limit, setLimit] = useState('10')


    const sorting = (col: string) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setData(sorted);
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setData(sorted);
            setOrder("ASC");
        }
    }

//Requisição dos dados da API via axios / json-server
    useEffect(() => {
        loadListGrid();
        totalListGrid();
    }, [])


    const loadListGrid = async () => {
        axios.get(`http://localhost:3001/data?_page=${currentPage}&_limit=${limit}`, {
        }).then((res) => {
            setData(res.data);
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
        setTimeout(async () => {
            const res: any = await axios.get(`http://localhost:3001/data?_page=1&_limit=10`);
            setList(res)
        }, 3000)
    }

    const totalListGrid = async () => {
        axios.get(`http://localhost:3001/data`, {
        }).then((res) => {
            setTotalData(res.data);
        }).catch(err => {
            console.log(err)
        })
        setTimeout(async () => {
            const res: any = await axios.get("http://localhost:3001/data");
            setList(res)
        }, 3000)
    }

//Fim da requisição dos dados da API via axios / json-server


    return (
        <div className="pt-5 pl-2 pr-2 lg:pt-10 lg:pl-10 lg:pr-10">
            {list && (

                <div className="bg-white p-8 shadow-md rounded-md space-y-2 grid-rows-1	 ">
                    <div className="text-gray-600 mb-5 font-semibold">Medições</div>
                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-200">
                            <thead className="text-xs text-gray-500  bg-white dark:bg-slate-300 dark:text-gray-500">
                                <tr>
                                    <th onClick={() => sorting("agent")} scope="col" className="px-6 py-3">
                                        Agente
                                    </th>
                                    <th onClick={() => sorting("meter")} scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Ponto
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                        </div>
                                    </th>
                                    <th onClick={() => sorting("reference")} scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Data
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                        </div>
                                    </th>
                                    <th onClick={() => sorting("hour")} scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Hora
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                        </div>
                                    </th>
                                    <th onClick={() => sorting("consumption")} scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Consumo Ativo (MWh)
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                        </div>
                                    </th>
                                    <th onClick={() => sorting("origin")} scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Origem
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-100 dark:border-gray-400 text-xs">
                                        <th scope="row" className="px-6 py-4 font-normal whitespace-nowrap dark:text-slate-700">
                                            {data.agent}
                                        </th>
                                        <td className="px-6 py-4 dark:text-slate-700">
                                            {data.meter}
                                        </td>
                                        <td className="px-6 py-4 dark:text-slate-700">
                                            {data.reference}
                                        </td>
                                        <td className="px-6 py-4 dark:text-slate-700">
                                            {data.hour}
                                        </td>
                                        <td className="px-6 py-4 dark:text-slate-700">
                                            {data.consumption}
                                        </td>
                                        <td className="px-6 py-4 dark:text-slate-700">
                                            {data.origin}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between pt-5 pr-5 pl-5">
                        <div>
                            <div className=' text-sm text-slate-500'>Exibindo 10 de items de {dataTotal.length}</div>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                                <a className="relative inline-flex items-center  ">
                                    
                                    <a className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-slate-100 hover:text-blue-400 dark:bg-gray-100 dark:border-blue-400 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-blue-400">
                                        Anterior
                                    </a>
                                    <a className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-slate-100 hover:text-blue-400 dark:bg-gray-100 dark:border-blue-400 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-blue-400">
                                        Próximo
                                    </a>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
            {!list && (
                <SkeletonListTable />
            )}
        </div>

    )
};

export default ListItem;
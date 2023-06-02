import React, {Component, useState, useEffect} from "react";
import BarChart from "./components/Charts/BarChart";
import ListItem from "./components/ListGridMeditions/ListGrid";
import LineChart from "./components/Charts/LineChart";
import LineChartHistory from "./components/Charts/LineChartHistory";
import SkeletonListTable from "./components/Skeleton/SkeletonList";



 function Home() {
  return (
    <div className="p-20">
      <div className="pl-10 text-gray-600  font-semibold">Dashboard</div>
      <div className="pl-10 text-gray-600  text-sm">Infomrações baseadas nos dados de medições acolhidos na CCEE.</div>
      <div className="grid grid-cols-2 ">
        <BarChart /> 
        <LineChart />
        </div>
        
      <LineChartHistory />
    <ListItem />
    </div>
  )
}

export default Home;

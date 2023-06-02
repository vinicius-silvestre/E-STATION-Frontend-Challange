import React from "react";


function SkeletonLineHistory() {
  return (

    <div className="border border-slate-300 bg-white shadow rounded-md bg-white p-8 shadow-md rounded-md  grid-rows-1">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-6 bg-slate-300 rounded"></div>
          </div>
          <div className="space-y-5 pt-3">

            <div className="h-20 bg-slate-300 rounded"></div>
            <div className="grid grid-cols-2 gap-4  pb-3 place-content-center">


              <div className="h-4 bg-slate-300 rounded col-span-1"></div>
              <div className="h-4 bg-slate-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SkeletonLineHistory;
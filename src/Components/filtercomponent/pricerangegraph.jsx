import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

// Register necessary chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

// Generate more than 20 random data points for simulation
const generatePriceData = () => {
  const dataPoints = 45; // Increase number of data points
  return Array.from({ length: dataPoints }, (_, i) => ({
    price: `₹${(i + 1) * 70}`, // Generate labels dynamically
    value: Math.floor(Math.random() * 50) + 5, // Random count between 5-50
  }));
};

const priceData = generatePriceData();

const data = {
  labels: priceData.map((item) => item.price), // Use generated labels
  datasets: [
    {
      label: "Price Distribution",
      data: priceData.map((item) => item.value), // Use generated values
      backgroundColor: "#ff006c", // Airbnb-style pink color
      borderRadius: 2, // Rounded bars
      borderSkipped: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false, // Hide X-axis labels
      grid: { display: false }, // Hide X-axis grid
    },
    y: {
      display: false, // Hide Y-axis
    },
  },
  plugins: {
    tooltip: { enabled: true }, // Enable tooltips on hover
  },
};

const PriceRangeGraph = () => {

  const [active, setActive] = useState("Any type");
  return (<>

    <div className='w-140 mx-auto flex flex-col p-5 border-b border-b-zinc-300'>
      <h1 className='text-lg font-medium'>Type of place</h1>
      <div className="flex text-sm items-center justify-between border border-gray-300 rounded-xl px-1 py-1 w-full mt-5">
        <button
          className={`p-3 px-7 font-medium transition-all rounded-xl ${active === "Any type"
            ? "bg-gray-100 border border-black"
            : "border-transparent"
            }`}
          onClick={() => setActive("Any type")}
        >
          Any type
        </button>
        <div className="h-6 w-[1px] bg-gray-300"></div> {/* Divider */}
        <button
          className={`p-3 px-7 font-medium transition-all rounded-xl  ${active === "Room" ? "bg-gray-100 border border-black" : "border-transparent"
            }`}
          onClick={() => setActive("Room")}
        >
          Room
        </button>
        <div className="h-6 w-[1px] bg-gray-300"></div> {/* Divider */}
        <button
          className={`p-3 px-7 font-medium transition-all rounded-xl ${active === "Entire home"
            ? "bg-gray-100 border border-black"
            : "border-transparent"
            }`}
          onClick={() => setActive("Entire home")}
        >
          Entire home
        </button>
      </div>

    </div>
    <div className="w-140 mx-auto flex flex-col p-5 mt-2 border-b border-b-zinc-300">
      <h2 className="text-xl">Price Range</h2>
      <p className="text-gray-500 text-sm">Total prices for 5 nights before taxes</p>

      <div className="w-full h-[50px] mt-5">
        <Bar data={data} options={options} />
      </div>

      <div className="flex justify-between w-full px-5 mt-10 paracolor items-center">
        <span className="text-sm">Minimum</span>
        <span className="text-sm">Maximum</span>
      </div>

      <div className="flex justify-between w-full px-5 ">
        <button className="border border-gray-200 p-3 rounded-full text-sm">₹4400</button>
        <button className="border border-gray-200 p-3 rounded-full text-sm">₹31000</button>
      </div>
    </div>
  </>);
};

export default PriceRangeGraph;

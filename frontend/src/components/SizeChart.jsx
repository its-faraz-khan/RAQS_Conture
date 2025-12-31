import React from 'react';

const SizeChart = ({ subCategory, onClose }) => {
  const sizeCharts = {
    Topwear: {
      title: "Topwear Size Chart",
      headers: ["Size", "Chest (inches)", "Length (inches)", "Shoulder (inches)"],
      rows: [
        ["S", "36-38", "27", "17"],
        ["M", "38-40", "28", "18"],
        ["L", "40-42", "29", "19"],
        ["XL", "42-44", "30", "20"],
        ["XXL", "44-46", "31", "21"]
      ]
    },
    Bottomwear: {
      title: "Bottomwear Size Chart",
      headers: ["Size", "Waist (inches)", "Hip (inches)", "Length (inches)"],
      rows: [
        ["S", "28-30", "36-38", "39"],
        ["M", "30-32", "38-40", "40"],
        ["L", "32-34", "40-42", "41"],
        ["XL", "34-36", "42-44", "42"],
        ["XXL", "36-38", "44-46", "43"]
      ]
    },
    Winterwear: {
      title: "Winterwear Size Chart",
      headers: ["Size", "Chest (inches)", "Length (inches)", "Sleeve (inches)"],
      rows: [
        ["S", "38-40", "28", "24"],
        ["M", "40-42", "29", "25"],
        ["L", "42-44", "30", "26"],
        ["XL", "44-46", "31", "27"],
        ["XXL", "46-48", "32", "28"]
      ]
    },
    Summerwear: {
      title: "Summerwear Size Chart",
      headers: ["Size", "Chest (inches)", "Length (inches)", "Shoulder (inches)"],
      rows: [
        ["S", "36-38", "26", "16"],
        ["M", "38-40", "27", "17"],
        ["L", "40-42", "28", "18"],
        ["XL", "42-44", "29", "19"],
        ["XXL", "44-46", "30", "20"]
      ]
    },
    Footwear: {
      title: "Footwear Size Chart",
      headers: ["UK Size", "EU Size", "US Size", "Foot Length (cm)"],
      rows: [
        ["5", "38", "6", "24.1"],
        ["6", "39", "7", "24.8"],
        ["7", "40", "8", "25.4"],
        ["8", "42", "9", "26.7"],
        ["9", "43", "10", "27.3"],
        ["10", "44", "11", "27.9"],
        ["11", "45", "12", "28.6"],
        ["12", "46", "13", "29.2"]
      ]
    }
  };

  const chart = sizeCharts[subCategory];

  if (!chart) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{chart.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {chart.headers.map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-3 text-gray-700"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">How to Measure:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {subCategory === "Footwear" ? (
                <>
                  <li>• Place your foot on a flat surface</li>
                  <li>• Measure from heel to the longest toe</li>
                  <li>• Add 0.5-1 cm for comfortable fit</li>
                  <li>• Measure both feet and use the larger measurement</li>
                </>
              ) : (
                <>
                  <li>• Use a measuring tape for accurate measurements</li>
                  <li>• Measure over light clothing for best fit</li>
                  <li>• Keep the tape parallel to the ground</li>
                  <li>• If between sizes, choose the larger size</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
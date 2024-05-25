import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);

const InstructorPieChart = ({ courses }) => {

    const [chart, setChart] = useState('Student');

    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    const chartDataStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: generateRandomColors(courses.length),
            },
        ],
    }

    const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: generateRandomColors(courses.length),
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>
            <div className="space-x-4 font-semibold">
                
                <button
                    onClick={() => setChart("students")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${chart === "students"
                            ? "bg-richblack-700 text-yellow-50"
                            : "text-yellow-400"
                        }`}
                >
                    Students
                </button>
               
                <button
                    onClick={() => setChart("income")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${chart === "income"
                            ? "bg-richblack-700 text-yellow-50"
                            : "text-yellow-400"
                        }`}
                >
                    Income
                </button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
                {/* Render the Pie chart based on the selected chart */}
                <Pie
                    data={chart === "students" ? chartDataStudents : chartIncomeData}
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorPieChart;

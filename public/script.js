document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData();
  const inputFile = document.getElementById("inputFile").files[0];
  formData.append("inputFile", inputFile);

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      window.chartData = data;
      renderChart(data);
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("chartType").addEventListener("change", function () {
  renderChart(window.chartData);
});

function renderChart(data) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const labels = data.map((d) => `Task ${d.task}, Core ${d.core}`);
  const minValues = data.map((d) => d.min);
  const maxValues = data.map((d) => d.max);
  const avgValues = data.map((d) => d.avg);
  const stddevValues = data.map((d) => d.stddev);
  const chartType = document.getElementById("chartType").value;

  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }

  let config;

  if (chartType === "scatter") {
    config = {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Min",
            data: minValues.map((value, index) => ({ x: index, y: value })),
            backgroundColor: "rgba(255, 99, 132, 0.8)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            showLine: false,
          },
          {
            label: "Max",
            data: maxValues.map((value, index) => ({ x: index, y: value })),
            backgroundColor: "rgba(54, 162, 235, 0.8)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            showLine: false,
          },
          {
            label: "Avg",
            data: avgValues.map((value, index) => ({ x: index, y: value })),
            backgroundColor: "rgba(75, 192, 192, 0.8)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            showLine: false,
          },
          {
            label: "Std Dev",
            data: stddevValues.map((value, index) => ({ x: index, y: value })),
            backgroundColor: "rgba(153, 102, 255, 0.8)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            showLine: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Index",
            },
            ticks: {
              callback: function (value, index, values) {
                return labels[value];
              },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Values",
            },
            beginAtZero: true,
          },
        },
      },
    };
  } else {
    config = {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: "Min",
            data: minValues,
            backgroundColor: "rgba(255, 99, 132, 0.8)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Max",
            data: maxValues,
            backgroundColor: "rgba(54, 162, 235, 0.8)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Avg",
            data: avgValues,
            backgroundColor: "rgba(75, 192, 192, 0.8)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Std Dev",
            data: stddevValues,
            backgroundColor: "rgba(153, 102, 255, 0.8)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Tasks and Cores",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Values",
            },
            beginAtZero: true,
          },
        },
      },
    };
  }

  window.myChart = new Chart(ctx, config);
}

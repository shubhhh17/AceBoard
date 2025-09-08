document.addEventListener("DOMContentLoaded", () => {
  // Sidebar nav active class toggle
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      navLinks.forEach(l => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });

  // Responsive Sidebar: You can add toggle logic here if needed for small screens

  // Calendar logic
  const calendarBody = document.getElementById("calendar-body");
  const monthYear = document.querySelector(".month-year");
  const prevMonthBtn = document.querySelector(".prev-month");
  const nextMonthBtn = document.querySelector(".next-month");

  const reminders = [
    { date: new Date(2025, 8, 18), label: "TCS Drive - Sep 18, 2025" },
    { date: new Date(2025, 8, 25), label: "Infosys Drive - Sep 25, 2025" },
    { date: new Date(2025, 9, 1), label: "Google Drive - Oct 1, 2025" },
    { date: new Date(2025, 9, 10), label: "Microsoft Drive - Oct 10, 2025" },
  ];

  let currentDate = new Date();

  function isSameDate(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  function drawCalendar(date) {
    calendarBody.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekday = (firstDay.getDay() + 6) % 7; // Monday=0,... Sunday=6

    const daysInMonth = lastDay.getDate();
    const daysPrevMonth = new Date(year, month, 0).getDate();

    let dayCount = 1;
    let nextMonthDay = 1;

    // Calculate total rows needed (at least 5)
    const totalCells = 42; // 6 weeks * 7 days

    for (let i = 0; i < totalCells; i++) {
      let cell = document.createElement("td");

      if (i < firstWeekday) {
        // Previous month days
        cell.textContent = daysPrevMonth - firstWeekday + i + 1;
        cell.classList.add("inactive");
      } else if (dayCount <= daysInMonth) {
        // Current month days
        cell.textContent = dayCount;

        // Highlight today's date
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && dayCount === today.getDate()) {
          cell.classList.add("today");
        }

        // Highlight special reminder days
        reminders.forEach(reminder => {
          if (year === reminder.date.getFullYear() && month === reminder.date.getMonth() && dayCount === reminder.date.getDate()) {
            cell.title = reminder.label;
            cell.classList.add("today");
          }
        });

        dayCount++;
      } else {
        // Next month days
        cell.textContent = nextMonthDay++;
        cell.classList.add("inactive");
      }

      calendarBody.appendChild(cell);

      if ((i + 1) % 7 === 0) {
        calendarBody.appendChild(document.createElement("tr"));
      }
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    drawCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    drawCalendar(currentDate);
  });

  drawCalendar(currentDate);

  // Chart.js analytics setup
  const ctx = document.getElementById("analytics-chart").getContext("2d");
  const analyticsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [{
        label: "Practice Hours",
        data: [10, 14, 16, 18, 20, 22, 23, 24, 25],
        borderColor: "#6278ff",
        backgroundColor: "rgba(98,120,255,0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: "#6278ff",
          titleColor: "#fff",
          bodyColor: "#fff",
          padding: 8,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#e6e9f4" },
          ticks: {
            color: "#6278ff",
            font: { weight: "bold" }
          }
        },
        x: {
          grid: { color: "transparent" },
          ticks: {
            color: "#6278ff",
            font: { weight: "bold" }
          }
        }
      }
    }
  });

  // Checklist interaction with localStorage persistence
  const checklistItems = document.querySelectorAll(".checklist-list input[type='checkbox']");
  checklistItems.forEach(item => {
    // Restore saved state
    const saved = localStorage.getItem(item.id);
    if (saved === "checked") {
      item.checked = true;
    }

    // Save on change
    item.addEventListener("change", () => {
      if (item.checked) {
        localStorage.setItem(item.id, "checked");
      } else {
        localStorage.removeItem(item.id);
      }
    });
  });
});

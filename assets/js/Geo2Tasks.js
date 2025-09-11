const tickets = [
    {
        number: 1,
        assigned: "Jesse Bindra",
        assignedShort: "JB",
        status: "In Progress",
        priority: "High",
        subject: "Test Ticket",
        description: "Please can you address the test ticket ID 122345"
    },
    {
        number: 2,
        assigned: "Jesse Bindra",
        assignedShort: "JB",
        status: "Open",
        priority: "Low",
        subject: "Test 2",
        description: "Please can someone open the door"
    },
    {
        number: 3,
        assigned: "Bill Singh",
        assignedShort: "BS",
        status: "Open",
        priority: "Low",
        subject: "Finance",
        description: "Send me the P&L for review"
    }
];

function renderTickets(filterStatus = "all") {
    const tbody = document.querySelector("#ticketsTable tbody");
    tbody.innerHTML = "";
    let filtered = tickets;
    if (filterStatus !== "all") {
        filtered = tickets.filter(t => filterStatus === "open" ? t.status === "Open" : t.status === "In Progress");
    }
    filtered.forEach(ticket => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${ticket.number}</td>
      <td><span class="avatar-cell">${ticket.assignedShort}</span> ${ticket.assigned}</td>
      <td>
        <span class="${ticket.status === "Open" ? "status-open" : "status-inprogress"}">${ticket.status}</span>
      </td>
      <td>
        <span class="${ticket.priority === "High" ? "priority-high" : "priority-low"}">${ticket.priority}</span>
      </td>
      <td>${ticket.subject}</td>
      <td>${ticket.description}</td>
    `;
        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderTickets();

    document.getElementById("statusFilter").addEventListener("change", function (e) {
        renderTickets(e.target.value);
    });

    document.getElementById("searchInput").addEventListener("input", function (e) {
        const val = e.target.value.toLowerCase();
        const tbody = document.querySelector("#ticketsTable tbody");
        tbody.innerHTML = "";
        tickets.filter(t => (
            t.subject.toLowerCase().includes(val) ||
            t.description.toLowerCase().includes(val) ||
            t.assigned.toLowerCase().includes(val)
        )).forEach(ticket => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${ticket.number}</td>
        <td><span class="avatar-cell">${ticket.assignedShort}</span> ${ticket.assigned}</td>
        <td>
          <span class="${ticket.status === "Open" ? "status-open" : "status-inprogress"}">${ticket.status}</span>
        </td>
        <td>
          <span class="${ticket.priority === "High" ? "priority-high" : "priority-low"}">${ticket.priority}</span>
        </td>
        <td>${ticket.subject}</td>
        <td>${ticket.description}</td>
      `;
            tbody.appendChild(tr);
        });
    });

    // Modal open/close
    document.getElementById("addTicketBtn").onclick = () => {
        document.getElementById("addTicketModal").style.display = "flex";
    };
    window.closeModal = () => {
        document.getElementById("addTicketModal").style.display = "none";
    };
    // Add ticket
    document.getElementById("addTicketForm").onsubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        tickets.push({
            number: tickets.length + 1,
            assigned: form.assigned.value,
            assignedShort: form.assigned.value.split(' ').map(w => w[0]).join('').toUpperCase(),
            status: form.status.value,
            priority: form.priority.value,
            subject: form.subject.value,
            description: form.description.value
        });
        closeModal();
        renderTickets();
        form.reset();
    };
});

// Sorting functionality
window.sortTickets = function (field) {
    if (field === 'number') {
        tickets.sort((a, b) => a.number - b.number);
    }
    renderTickets();
}

// Tab switching (demo, extend as needed)
document.querySelectorAll(".main-tabs .tab").forEach(btn => {
    btn.onclick = function () {
        document.querySelectorAll(".main-tabs .tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        // Optionally, filter contents based on tab here
    }
});
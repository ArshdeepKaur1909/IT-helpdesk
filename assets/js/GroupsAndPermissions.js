// GroupsAndPermissions.js
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons -- for styling
    lucide.createIcons();

    const headerSelect = document.getElementById("header_select");
    const addBtn = document.getElementById("addGroupBtn");
    const saveBtn = document.getElementById("saveBtn");
    const sidebarItems = document.querySelectorAll(".sidebar li");
    const permSelects = document.querySelectorAll("select");
    const iconButtons = document.querySelectorAll(".icon-btn");
    const profile = document.querySelector(".profile");

    // Sidebar click -> active state --> making side bar interactive
    sidebarItems.forEach(li => {
        li.addEventListener("click", () => {
            sidebarItems.forEach(el => el.classList.remove("active"));
            li.classList.add("active");
        });
    });

    // Profile click feedback --navigate to profile , if progile page available , 
    if (profile) {
        profile.addEventListener("click", () => {
            flashToast("Profile clicked!");
        });
    }

    // Add group logic-- > now for adding new group - for adding new groups in the page , can be modified in future
    addBtn.addEventListener("click", () => {
        const name = prompt("Enter new group name:");
        if (!name) return;
        const val = name.trim();
        if (!val) return;

        // Prevent duplicates- -
        const exists = Array.from(headerSelect.options).some(
            o => o.text.toLowerCase() === val.toLowerCase()
        );
        if (exists) {
            alert(`Group "${val}" already exists.`);
            return;
        }

        const opt = document.createElement("option");
        opt.value = val.toLowerCase().replace(/\s+/g, "-");
        opt.textContent = val;
        headerSelect.appendChild(opt);
        headerSelect.value = opt.value;
        flashToast(`Group "${val}" added`);
    });

    // Highlight row briefly on change -- dynamic stylig at each select section
    permSelects.forEach(sel => {
        sel.addEventListener("change", () => {
            const row = sel.closest(".permission-row");
            row.style.transition = "background .28s ease, box-shadow .28s ease";
            row.style.background =
                "linear-gradient(90deg, rgba(79,70,229,0.06), rgba(79,70,229,0.01))";
            row.style.boxShadow = "0 6px 18px rgba(79,70,229,0.06)";

            setTimeout(() => {
                row.style.background = "";
                row.style.boxShadow = "";
            }, 700);
        });
    });

    // Save permissions -- backend apis ko integrate karke , data backend me save karne ke liye
    saveBtn.addEventListener("click", () => {
        const group = headerSelect.value || headerSelect.options[0].text;

        const payload = {
            group,
            permissions: {
                asset_setting: document.getElementById("Asset_Management").value,
                saas_setting: document.getElementById("SaaS_Vendors").value,
                contract_setting: document.getElementById("contractManagement").value,
                telecom_setting: document.getElementById("telecomManagement").value,
                network_setting: document.getElementById("network_monitoring").value,
                company_setting: document.getElementById("company_Setting").value,
                geo_1: document.getElementById("geo_1").value,
                geo_2: document.getElementById("geo_2").value,
                geo_3: document.getElementById("geo_3").value,
            }
        };

        console.log("Saving payload:", payload);
        flashToast("Permissions saved (check console for payload)");

        // Example fetch 
        /*
        fetch("/api/save-permissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).then(res => res.json())
          .then(data => flashToast("Saved successfully"))
          .catch(err => flashToast("Save failed"));
        */
    });

    // Icon button ripple 
    iconButtons.forEach(b =>
        b.addEventListener("click", () => {
            b.animate(
                [
                    { transform: "scale(1)" },
                    { transform: "scale(0.96)" },
                    { transform: "scale(1)" }
                ],
                { duration: 160 }
            );
        })
    );

    // Toast helper integration
    function flashToast(text, ms = 1800) {
        const t = document.createElement("div");
        t.className = "gp-toast";
        t.textContent = text;
        Object.assign(t.style, {
            position: "fixed",
            right: "20px",
            bottom: "24px",
            background: "rgba(15,23,42,0.95)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "8px",
            zIndex: 9999,
            boxShadow: "0 6px 20px rgba(2,6,23,0.2)"
        });
        document.body.appendChild(t);
        setTimeout(() => (t.style.opacity = "0.92"), 10);
        setTimeout(() => t.remove(), ms);
    }
});
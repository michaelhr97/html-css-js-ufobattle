import getRecords from "../services/recordServices.js";

window.addEventListener("DOMContentLoaded", async () => {
  "use strict";

  let tbody = document.getElementById("records__table--body");

  function printRecordIntoHTML(record, index) {
    console.log(record);
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdUser = document.createElement("td");
    let tdPoints = document.createElement("td");
    let tdUfos = document.createElement("td");
    let tdSecs = document.createElement("td");
    let tdDate = document.createElement("td");

    tdId.classList.add("records__table--body--option");
    tdUser.classList.add("records__table--body--option");
    tdPoints.classList.add("records__table--body--option");
    tdUfos.classList.add("records__table--body--option");
    tdSecs.classList.add("records__table--body--option");
    tdDate.classList.add("records__table--body--option");

    tdId.innerText = index + 1;
    tdUser.innerText = record.username;
    tdPoints.innerText = record.punctuation;
    tdUfos.innerText = record.ufos;
    tdSecs.innerText = record.disposedTime;

    let date = new Date(record.recordDate);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    tdDate.innerText = `${day}/${month}/${year}`;

    tr.appendChild(tdId);
    tr.appendChild(tdUser);
    tr.appendChild(tdPoints);
    tr.appendChild(tdUfos);
    tr.appendChild(tdSecs);
    tr.appendChild(tdDate);

    tbody.appendChild(tr);
  }

  const records = await getRecords();
  records.forEach((record, index) => {
    printRecordIntoHTML(record, index);
  });
});

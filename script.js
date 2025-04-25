(async () => {
  try {
    const response = await fetch("https://bd-reminder-server-production.up.railway.app/");
    const responseJson = await response.json();

    const personsTable = document.getElementById("tbody");

    if (!responseJson?.success || !responseJson?.data || !responseJson.data.length) return;

    responseJson.data.forEach((person) => {
      const singlePersonRow = document.createElement("tr");

      const nameCell = document.createElement("td");
      const birthdayCell = document.createElement("td");
      const promptCell = document.createElement("td");

      [nameCell, birthdayCell, promptCell].forEach((cellEl) => {
        cellEl.style.border = "1px solid lightslategrey";
        cellEl.style.borderCollapse = "collapse";
        cellEl.style.padding = "8px";
      });

      nameCell.innerText = person.name;
      birthdayCell.innerText = person.birthday;
      promptCell.innerText = person.prompt;

      singlePersonRow.appendChild(nameCell);
      singlePersonRow.appendChild(birthdayCell);
      singlePersonRow.appendChild(promptCell);

      personsTable.appendChild(singlePersonRow);
    });
  } catch (e) {}
})();

const submit = async () => {
  const name = document.getElementById("name");
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  const prompt = document.getElementById("chat-gpt-prompt");

  try {
    const response = await fetch("https://bd-reminder-server-production.up.railway.app/birthday", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt.value,
        day: day.value,
        month: month.value,
        year: year.value,
        name: name.value,
      }),
    });

    const responseJson = await response.json();

    if (responseJson.message) {
      alert(responseJson.message);
    }
  } catch (e) {}
};

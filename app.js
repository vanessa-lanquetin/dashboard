document.addEventListener("DOMContentLoaded", function () {
  const applicationForm = document.getElementById("application-form");
  const applicationsTable = document.getElementById("applications-table");
  const addApplicationButton = document.getElementById("add-application");
  let applications = loadApplicationsFromLocalStorage();

  function loadApplicationsFromLocalStorage() {
    const storedApplications = localStorage.getItem("applications");
    return storedApplications ? JSON.parse(storedApplications) : [];
  }

  function saveApplicationsToLocalStorage(applications) {
    localStorage.setItem("applications", JSON.stringify(applications));
  }

  function addApplicationToTable(application) {
    const newRow = applicationsTable.querySelector("tbody").insertRow(-1);

    newRow.innerHTML = `
        <td>${application.companyName}</td>
        <td>${application.applicationDate}</td>
        <td>${application.applicationType}</td>
        <td>${application.jobTitle}</td>
        <td>${application.contact}</td>
        <td>${application.info}</td>
        <td>${application.followUpDate}</td>
        <td>${application.links}</td>
        <td class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
    `;
  }

  function loadApplications() {
    applicationsTable.querySelector("tbody").innerHTML = "";

    applications.forEach((app) => {
      addApplicationToTable(app);
    });
  }

  loadApplications();

  addApplicationButton.addEventListener("click", function () {
    const companyName = document.getElementById("company-name").value;
    const applicationDate = document.getElementById("application-date").value;
    const applicationType = document.getElementById("application-type").value;
    const jobTitle = document.getElementById("job-title").value;
    const contact = document.getElementById("contact").value;
    const info = document.getElementById("info").value;
    const followUpDate = document.getElementById("follow-up-date").value;
    const links = document.getElementById("links").value;

    const newApplication = {
      companyName,
      applicationDate,
      applicationType,
      jobTitle,
      contact,
      info,
      followUpDate,
      links,
    };

    applications.push(newApplication);
    saveApplicationsToLocalStorage(applications);
    addApplicationToTable(newApplication);

    applicationForm.reset();
  });

  applicationsTable.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("edit")) {
      const row = e.target.parentNode.parentNode;
      const cells = row.querySelectorAll("td");

      cells.forEach((cell, index) => {
        if (index < cells.length - 1) {
          const input = document.createElement("input");
          input.value = cell.textContent;
          cell.innerHTML = "";
          cell.appendChild(input);
        }
      });

      const actionsCell = row.querySelector(".actions");
      actionsCell.innerHTML = `
        <button class="save">Save</button>
        <button class="cancel">Cancel</button>
      `;
    }

    if (e.target && e.target.classList.contains("save")) {
      const row = e.target.parentNode.parentNode;
      const cells = row.querySelectorAll("td");

      cells.forEach((cell, index) => {
        if (index < cells.length - 1) {
          const input = cell.querySelector("input");
          cell.textContent = input.value;
        }
      });

      const actionsCell = row.querySelector(".actions");
      actionsCell.innerHTML = `
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;

      // Met à jour l'application modifiée dans le tableau et le localStorage
      const rowIndex = row.rowIndex - 1;
      applications[rowIndex] = {
        companyName: cells[0].textContent,
        applicationDate: cells[1].textContent,
        applicationType: cells[2].textContent,
        jobTitle: cells[3].textContent,
        contact: cells[4].textContent,
        info: cells[5].textContent,
        followUpDate: cells[6].textContent,
        links: cells[7].textContent,
      };

      saveApplicationsToLocalStorage(applications);
    }

    if (e.target && e.target.classList.contains("cancel")) {
      const row = e.target.parentNode.parentNode;
      const cells = row.querySelectorAll("td");

      cells.forEach((cell, index) => {
        if (index < cells.length - 1) {
          const input = cell.querySelector("input");
          cell.textContent = input.value;
        }
      });

      const actionsCell = row.querySelector(".actions");
      actionsCell.innerHTML = `
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;
    }

    if (e.target && e.target.classList.contains("delete")) {
      const row = e.target.parentNode.parentNode;
      applicationsTable.querySelector("tbody").deleteRow(row.rowIndex - 1);
      const rowIndex = row.rowIndex - 2; // Soustrayez 2 en raison de l'en-tête et de l'index 0
      applications.splice(rowIndex, 1);
      saveApplicationsToLocalStorage(applications);
    }
  }); // J'attends que le contenu de la page soit chargé avant d'exécuter mon code
  document.addEventListener("DOMContentLoaded", function () {
    // Je récupère les éléments du formulaire et du tableau
    const applicationForm = document.getElementById("application-form");
    const applicationsTable = document.getElementById("applications-table");
    const addApplicationButton = document.getElementById("add-application");

    // Je charge les candidatures depuis le localStorage lors de l'initialisation
    let applications = loadApplicationsFromLocalStorage();

    // Fonction pour charger les candidatures depuis le localStorage
    function loadApplicationsFromLocalStorage() {
      const storedApplications = localStorage.getItem("applications");
      return storedApplications ? JSON.parse(storedApplications) : [];
    }

    // Fonction pour sauvegarder les candidatures dans le localStorage
    function saveApplicationsToLocalStorage(applications) {
      localStorage.setItem("applications", JSON.stringify(applications));
    }

    // Fonction pour ajouter une candidature au tableau
    function addApplicationToTable(application) {
      const newRow = applicationsTable.querySelector("tbody").insertRow(-1);

      newRow.innerHTML = `
        <td>${application.companyName}</td>
        <td>${application.applicationDate}</td>
        <td>${application.applicationType}</td>
        <td>${application.jobTitle}</td>
        <td>${application.contact}</td>
        <td>${application.info}</td>
        <td>${application.followUpDate}</td>
        <td>${application.links}</td>
        <td class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
    `;
    }

    // Fonction pour charger les candidatures dans le tableau
    function loadApplications() {
      applicationsTable.querySelector("tbody").innerHTML = "";

      applications.forEach((app) => {
        addApplicationToTable(app);
      });
    }

    // J'appelle la fonction pour charger les candidatures depuis le localStorage
    loadApplications();

    // J'ajoute un gestionnaire d'événement pour le bouton "Add Application"
    addApplicationButton.addEventListener("click", function () {
      // Je récupère les valeurs du formulaire
      const companyName = document.getElementById("company-name").value;
      const applicationDate = document.getElementById("application-date").value;
      const applicationType = document.getElementById("application-type").value;
      const jobTitle = document.getElementById("job-title").value;
      const contact = document.getElementById("contact").value;
      const info = document.getElementById("info").value;
      const followUpDate = document.getElementById("follow-up-date").value;
      const links = document.getElementById("links").value;

      // Je crée un nouvel objet candidature
      const newApplication = {
        companyName,
        applicationDate,
        applicationType,
        jobTitle,
        contact,
        info,
        followUpDate,
        links,
      };

      // J'ajoute la candidature au tableau et au localStorage
      applications.push(newApplication);
      saveApplicationsToLocalStorage(applications);
      addApplicationToTable(newApplication);

      // Je réinitialise le formulaire
      applicationForm.reset();
    });

    // J'ajoute un gestionnaire d'événement pour le tableau
    applicationsTable.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("edit")) {
        // Code pour l'édition des candidatures

        // Après l'édition, je mets à jour le localStorage
        saveApplicationsToLocalStorage(applications);
      }

      if (e.target && e.target.classList.contains("delete")) {
        // Code pour la suppression des candidatures

        // Après la suppression, je mets à jour le localStorage
        saveApplicationsToLocalStorage(applications);
      }
    });
  });
});

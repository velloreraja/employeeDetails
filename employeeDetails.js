(async function () {
  const data = await fetch("./data.json");
  const response = await data.json();

  let employees = response;

  let employeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector(".employeesNamesList");
  const employeeInfo = document.querySelector(".employeesInfo");

  // Add Employee Logic
  const createEmployee = document.querySelector(".employeeadd");
  const addNewEmployee = document.querySelector(".addNewEmployee");
  const addEmpCreate = document.querySelector(".addEmpCreate");

  createEmployee.addEventListener("click", () => {
    addNewEmployee.style.display = "flex";
  });
  addNewEmployee.addEventListener("click", (e) => {
    if (e.target.className === "addNewEmployee") {
      addNewEmployee.style.display = "none";
    }
  });

  const dobInput = document.querySelector(".addEmpDob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmpCreate.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmpCreate);
    const values = [...formData.entries()];
    let empData = {};
    console.log(values);

    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    console.log(empData);
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployess();
    addEmpCreate.reset();
    addNewEmployee.style.display = "none";
  });
  //Select Employee Logic

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && employeeId !== e.target.id) {
      employeeId = e.target.id;
      renderEmployess();
      renderSingleEmployee();
    }
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );

      if (String(employeeId) === e.target.parentNode.id) {
        employeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployess();
    }
  });

  const renderEmployess = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee_names--item");

      if (parseInt(employeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">&#9747;</i> `;
      employeeList.append(employee);
    });
  };

  const renderSingleEmployee = () => {
    if (employeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    employeeInfo.innerHTML = `
    <img class="empImage" src="${selectedEmployee.imageUrl}" alt="image" />
    <span class="empSingleHead">${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
    <span>Age : ${selectedEmployee.age}</span>
    <span>${selectedEmployee.address}</span>
    <span>Email: ${selectedEmployee.email}</span>
    <span>Mobile No: ${selectedEmployee.contactNumber}</span>
    <span>Dob : ${selectedEmployee.dob}</span>
    `;
  };
  renderEmployess();
  if (selectedEmployee) renderSingleEmployee();
})();

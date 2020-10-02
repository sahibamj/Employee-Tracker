var mysql = require("mysql");
var inquirer = require("inquirer");

// the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // my port
  port: 3306,

  // username
  user: "root",

  // password
  password: "Muma@3008",
  database: "employee_tracker"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
    // console.log("connected as id " + connection.threadId);
    
    // connection.query("SELECT * FROM department", function(err, data) {
    //   if(err) throw err;
    //   console.table(data);
    //   connection.end();

     
    // });
  }); 

  function start() {
    inquirer 
    .prompt({
      name: "choose",
      type: "list",
      message: "what would you like to do?",
      choices: ["Add department", "Add Employee", "Add roles", "Update employee roles", "View Departments", "View Employees",  "View roles", "View employees by manager"]
    })
    .then(function(answer) {
      if(answer.choose === "Add department") {
        addDept();
      }
      else if(answer.choose === "Add Employee") {
        addEmp();
      } 
      else if(answer.choose === "Add roles") {
        addRoles(); 
      }
      else if (answer.choose === "Update employee roles") {
        updateRole();
      }
      else if (answer.choose === "View Departments") {
        viewDept();
      }
      else if (answer.choose === "View Employees") {
        viewEmp();
      }
      else if(answer.choose === "View employees by manager") {
        viewempManager();
      } 
      else (answer.choose ===  "View roles") 
        viewRoles();
      
    })
  }

  

  function addDept() {
    inquirer.prompt([
      {
        name: "Deptname",
        type: "input",
        message: "What is the name of the department?",
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.Deptname,

        },
        function(err) {
          if(err) throw err;
          console.log("Department name added successfully");
          start();
        }
        
        )
    })
  }


  function addEmp() {
    inquirer.prompt([
      {
        name: "Empfirstname",
        type: "input",
        message: "What is the first name of the employee?"
      },
      {
        name: "Emplastname",
        type: "input",
        message: "What is the last name of employee?"
      },
      {
        name: "Emproleid",
        type: "input",
        message: "What is the employee's role id?"
      },
      {
        name: "Empmanagerid",
        type: "input",
        message: "What is the employee's manager",
      
   
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.Empfirstname,
          last_name: answer.Emplastname,
          role_id: answer.Emproleid,
          manager_id: answer.Empmanagerid
        },
        function(err) {
          if(err) throw err;
          console.log("Employee added successfully");
          start();
        }
      
        );
    });
  }
 

  function addRoles() {
    inquirer.prompt([
      {
        name: "Roletitle",
        type: "input",
        message: "What is the title of the role you are adding?"
      },
      {
        name: "Salary",
        type: "input",
        message: "What is the salary of the role you are adding?"
      },
      {
        name: "DeptId",
        type: "input",
        message: "What is the department id you are adding the role to?"
      },
    
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.Roletitle,
          salary: answer.Salary,
          department_id: answer.DeptId,
        },
        function(err) {
          if(err) throw err;
          console.log("Role added successfully");
          start();
        }
      
        );
    });
  }

 
function viewDept() {
  connection.query("SELECT * FROM department", function(err, res) {
    if(err) throw err;
    console.table(res)
  });
}

function viewEmp() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if(err) throw err;
    console.table(res)
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function(err, res) {
    if(err) throw err;
    console.table(res)
  });
}

function viewempManager() {
 var query =  connection.query("SELECT * FROM employee WHERE manager_id=?", ["456"], function(err, res) {
    if(err) throw err;
    console.table(res)
  });
}

function updateRole() {
  inquirer
  .prompt([{
    name: "oldId",
    type: "input",
    message: "What is the employee's old id?"
  },
  {
    name: "newId",
  type: "input",
  message: "What is the employee's new id?"

  },
])
.then(function(answer) {
  connection.query(
    "UPDATE employee SET role_id = ?",
    {
      role_id: answer.oldId,
      role_id: answer.newId,
     
    },
    function(err) {
      if(err) throw err;
      console.log("Role id updated successfully");
      start();
    }
  
    );
})};
 
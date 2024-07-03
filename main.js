import inquirer from "inquirer";
class Student {
    id;
    name;
    courseEnrolled;
    fees;
    constructor(id, name, courseEnrolled, fees) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.fees = fees;
    }
}
let baseIdentity = 12345;
let studentId = "";
let isEnrolled = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "answer",
        message: "Please select options below:",
        choices: ["Enroll a student", "Show student status"],
    });
    if (action.answer === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "answer",
            message: "Enter your name:",
        });
        let trimmedName = studentName.answer.trim().toLowerCase();
        let checkStudentName = students.map((obj) => obj.name);
        if (!checkStudentName.includes(trimmedName)) {
            if (trimmedName !== "") {
                baseIdentity++;
                studentId = "STID" + baseIdentity;
                console.log("\n\tYour account has been created");
                console.log(`Welcome ${trimmedName}!`);
                let courses = await inquirer.prompt({
                    name: "answer",
                    type: "list",
                    message: "Please select a course below:",
                    choices: ["AI", "Metaverse", "Blockchain"],
                });
                let courseFees = 0;
                switch (courses.answer) {
                    case "AI":
                        courseFees = 5000;
                        break;
                    case "Blockchain":
                        courseFees = 2000;
                        break;
                    case "Metaverse":
                        courseFees = 3000;
                        break;
                }
                let confirm = await inquirer.prompt({
                    name: "answer",
                    type: "confirm",
                    message: "Do you want to enroll in this course?",
                });
                if (confirm.answer === true) {
                    let student = new Student(studentId, trimmedName, [courses.answer], courseFees);
                    students.push(student);
                    console.log("Congratulations! You have enrolled in this course");
                }
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("The name already exists");
        }
    }
    else if (action.answer === "Show student status") {
        if (students.length !== 0) {
            let checkStudentName = students.map((obj1) => obj1.name);
            let selectedStudent = await inquirer.prompt({
                name: "answer",
                type: "list",
                choices: checkStudentName,
                message: "Please select a name",
            });
            let foundStudent = students.find((student) => student.name === selectedStudent.answer);
            if (foundStudent) {
                console.log("Student Information");
                console.log(`ID: ${foundStudent.id}`);
                console.log(`Name: ${foundStudent.name}`);
                console.log(`Courses Enrolled: ${foundStudent.courseEnrolled.join(", ")}`);
                console.log(`Fees: ${foundStudent.fees}`);
            }
            else {
                console.log("Student not found");
            }
        }
        else {
            console.log("No records available");
        }
    }
    let userConfirmed = await inquirer.prompt({
        type: "confirm",
        name: "answer",
        message: "Do you want to continue?",
    });
    if (userConfirmed.answer === false) {
        isEnrolled = false;
    }
} while (isEnrolled);

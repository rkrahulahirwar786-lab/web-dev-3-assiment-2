// data/students.js
// In-memory "database" for student records (Array + JSON only — no MongoDB/MySQL)

let students = [
  { id: 1, name: "Rahul Sharma", course: "BCA", age: 20, email: "rahul.sharma@example.com", phone: "9876543210" },
  { id: 2, name: "Priya Singh", course: "BTech", age: 21, email: "priya.singh@example.com", phone: "9876543211" },
  { id: 3, name: "Amit Verma", course: "BCA", age: 22, email: "amit.verma@example.com", phone: "9876543212" },
];

module.exports = students;

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


// Creats a connection pool to the MySQL database to store a "pool" of connections that will stay open for efficient query handling, instead of using a single connection to open and close that can become a bottleneck under high load.
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
//.promise() allows us to use async/await with mysql2 queries. instead of using callbacks, we can use modern JavaScript async/await syntax for cleaner code.
//function that retrieves all tickets from the "tickets" table in the database. we use async/await to handle the asynchronous database query.
// we simplify the [rows] destructuring to directly get the rows from the query result without needing the extra meta data.
async function getAllTickets() {
const [rows] = await pool.query("SELECT * FROM tickets");
return rows;
};
//function that retrieves a specific ticket by customer_id from the "tickets" table in the database. we use "?" as a placeholder for the id parameter because it may come through user input or HTTP requests. we return rows[0] to get the first matching ticket since customer_id should be unique.
async function getNoteById(id) {
  const [rows] = await pool.query("SELECT * FROM tickets WHERE customer_id = ?", [id]);
  return rows[0];
};
//function that retrieves tickets by their priority from the "tickets" table in the database. We use a placeholder for the priority parameter because it may come through user input or HTTP requests. we return all matching rows since multiple tickets can share the same priority.
async function getTicketByPriority(priority) {
  const [rows] = await pool.query("SELECT * FROM tickets WHERE ticket_priority = ?", [priority]);
  return rows;
};
//function that retrieves tickets by their status from the "tickets" table in the database. We use a placeholder for the status parameter because it may come through user input or HTTP requests. we return all matching rows since multiple tickets can share the same status.
async function getTicketByStatus(status) {
  const [rows] = await pool.query("SELECT * FROM tickets WHERE ticket_status = ?", [status]);
  return rows;
};
//function that creates a new ticket in the "tickets" table in the database. We use placeholders for the parameters because they may come through user input or HTTP requests. After inserting the new ticket, we retrieve it using its insertId to return the complete ticket information.
 async function createNewTicket(customer_name, ticket_priority, ticket_status) {
  const [result] = await pool.query(
    "INSERT INTO tickets (customer_name, ticket_priority, ticket_status) VALUES (?, ?, ?)",
    [customer_name, ticket_priority, ticket_status]
  );
   const newTicketId = result.insertId;
   const ticket_info = await getNoteById(newTicketId);
   return ticket_info;
}

//prints all tickets and a specific ticket to the console for testing purposes.
const tickets = await getAllTickets();
console.log(tickets);
//prints ticket with customer_id 1
const ticketID = await getNoteById(1);
console.log(ticketID);
//prints tickets with High priority
const ticketPriority = await getTicketByPriority('High');
console.log(ticketPriority);
//prints tickets with In Progress status
const ticketStatus = await getTicketByStatus('In Progress');
console.log(ticketStatus);
//creates a new ticket and prints it to the console for testing purposes.
const newTicket = await createNewTicket('Bobby Cruz', 'High', 'Closed');
console.log(newTicket);




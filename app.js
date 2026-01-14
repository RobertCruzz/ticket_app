import express from 'express';

import {getAllTickets, getTicketById, getTicketByPriority, getTicketByStatus,createNewTicket} from './database.js';

const app = express();


app.get("/tickets", async (req, res) => {
    const tickets = await getAllTickets();
    res.send(tickets);
    console.log('Tickets displayed correctl');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


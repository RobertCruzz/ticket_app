CREATE DATABASE ticket_app;

USE ticket_app;

CREATE TABLE tickets (
    customer_id integer PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    ticket_priority VARCHAR(50) NOT NULL,
    ticket_status VARCHAR(50) NOT NULL
);

INSERT INTO
    tickets (
        customer_name,
        ticket_priority,
        ticket_status
    )
VALUES (
        'Alice Johnson',
        'High',
        'Open'
    ),
    (
        'Bob Smith',
        'Medium',
        'In Progress'
    ),
    (
        'Charlie Brown',
        'Low',
        'Closed'
    );
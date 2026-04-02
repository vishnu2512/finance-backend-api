\# Finance Data Backend API



\## Overview

This project is a backend system for managing financial records with role-based access control and dashboard analytics.



\## Tech Stack

\- Node.js

\- Express.js

\- In-memory storage (for simplicity)



\## Features

\- Role-based access (Admin, Analyst, Viewer)

\- Create, Read, Update, Delete (CRUD) financial records

\- Dashboard summary (total income, expenses, balance)

\- Input validation and error handling



\## Roles \& Permissions



| Role    | Permissions |

|--------|------------|

| Viewer | View records only |

| Analyst | View records + dashboard |

| Admin  | Full access (create, update, delete) |



\## API Endpoints



\### Create Record

POST /records



\### Get Records

GET /records



\### Update Record

PUT /records/:id



\### Delete Record

DELETE /records/:id



\### Dashboard Summary

GET /dashboard



\## Sample Data

The system is initialized with sample financial records for demonstration.



\## How to Run



1\. Install dependencies:


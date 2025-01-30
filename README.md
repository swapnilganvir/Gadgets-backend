<div id="readme-top" align="center">
  <h3 align="center">Gadgets backend</h3>
  <p align="center">
    <a href="https://gadgets-backend-au6j.onrender.com">API Link</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#conclusion">Conclusion</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
This project involves building a secure and scalable RESTful API for managing IMF's(The Impossible Missions Force) gadget inventory using Node.js, Express, and PostgreSQL. The API allows users to retrieve gadget data, add and update gadgets, mark gadgets as decommissioned, and trigger self-destruct sequences. Security and data integrity are prioritized with robust JWT-based authentication and filtering features.

<b>Note: To use the demo please wait 1-2 minutes after opening the link, because the server gets down due to inactivity.</b>


<!-- Tech Stack -->
## Tech Stack
  * <b>Backend</b>: Node.js with Express.js
  * <b>Database</b>: PostgreSQL, Neon Database
  * <b>Authentication</b>: JWT (JSON Web Token)
  * <b>Deployment</b>: Render (backend)
  * <b>Version Control</b>: Git and GitHub


<!-- API Endpoints -->
## API Endpoints
#### Gadget Inventory (/gadgets)
* `GET /gadgets/` – Retrieve a list of all gadgets.
* `POST /gadgets/` – Adds a new gadget to the inventory.
* `PATCH /gadgets/` – Update an existing gadget's information.
* `DELETE /gadgets/` – Remove a gadget from the inventory.
* `POST /gadgets/self-destruct/?id={}&code={}` – Trigger the self-destruct sequence for a specific gadget.
* `POST /gadgets/filter/?status={}` – Find gadgets with a specific status.
  
<a href="https://documenter.getpostman.com/view/38417754/2sAYX2MPc2">View API Documentation</a>


<!-- Database Schema -->
## Database Schema
#### Gadget_inventory (table fields)
* `id`- SERIAL PRIMARY KEY
* `name` - TEXT UNIQUE NOT NULL
* `status` - TEXT NOT NULL
* `timestamp` - TIMESTAMP


<!-- Conclusion -->
## Conclusion
This project demonstrates strong backend development skills, including API design, database management, and secure API implementation using JWT. It showcases my ability to build a scalable and secure backend service while adhering to best practices.


<!-- CONTACT -->
## Contact
Swapnil Ganvir  - [@LinkedIn](https://www.linkedin.com/in/swapnilganvir) - swapnilganvir54@gmail.com

Project Link: [https://github.com/swapnilganvir/project_app](https://github.com/swapnilganvir/project_app)

API Link: [Gadgets API](https://gadgets-backend-au6j.onrender.com)

<b>Note: To use the demo please wait 1-2 minutes after opening the link, because the server gets down due to inactivity.</b>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

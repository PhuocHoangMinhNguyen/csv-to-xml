# Magellan CSV to XML System
Magellan CSV to XML System is a system designed for Magellan Logistics Company to translate customer's input CSV files to XML files to load into provided FTP servers.

## Table of Contents
1. [Screenshots](#screenshots)
2. [Technologies and Framework Used](#technologies-and-framework-used)
3. [Features](#features)
4. [Installation](#installation)
5. [Author](#author)

## Screenshots
<img src="https://github.com/PhuocHoangMinhNguyen/csv-to-xml/blob/main/screenshots/Home.PNG" width="500" />
<img src="https://github.com/PhuocHoangMinhNguyen/csv-to-xml/blob/main/screenshots/Notifications.PNG" width="500" />
<img src="https://github.com/PhuocHoangMinhNguyen/csv-to-xml/blob/main/screenshots/SavedMapping.PNG" width="500" />
<img src="https://github.com/PhuocHoangMinhNguyen/csv-to-xml/blob/main/screenshots/FTPServers.PNG" width="500" />

## Technologies and Framework Used
- Back-end: Node.js
- Front-end: React.js
- Database: Firebase
- Development Tool: Visual Studio
- Version Control: Github

## Features
This system allows users to:
- View Notifications. Notifications includes all the succeeded and failed translation process.
- Uploading "translating dictionaries" as CSV files for existing clients, used to translate client's input files later.
- Adding Client's information. These are the Client's information, used to decide which "translating dictionary" to use.
- Adding Client's FTP Server information. These are the FTP servers that the system will connect to take client's CSV input files to translate to XML files.
- Adding Admin Emails. Whenever an error occurs, an email with the error details will be sent to these emails.

## Installation
You can gain access to the database using this URL: https://csv-to-xml.herokuapp.com/

## Author
**Phuoc Hoang Minh Nguyen** - *Full-stack Developer* - [PhuocHoangMinhNguyen](https://github.com/PhuocHoangMinhNguyen)

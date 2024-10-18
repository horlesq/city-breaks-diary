# City Breaks Diary

A full-stack web application that allows users to document and track their travel experiences by pinning locations on a map. The app features a responsive map interface where users can drop pins at visited locations, attach notes, and revisit their travel memories. The project consists of a React-based frontend and a Python FastAPI backend with MongoDB for data storage.

![2](https://github.com/user-attachments/assets/9a330d03-53b9-4874-92e0-0b9b9e1d9b1a)
![1](https://github.com/user-attachments/assets/7ced8c8d-fa65-4a0d-858a-6a42abf11481)


## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)
- [Contact](#contact)


## Features

- **Interactive Map**: Users can browse the map and pin their travel locations with custom notes.
- **Geolocation**: Automatically detects and centers the map based on the user’s current location.
- **Travel Log**: Keeps track of all city breaks, displaying details like city name, date, and personal notes.
- **User Authentication**: Secure login system enabling personalized city break logs.

## Usage

- **Login/Register**: Enter your e-mail and password to log in or create an account.
- **Pin a Location**: Navigate the map, click on a location to drop a pin, and add trip details.
- **View Travel Log**: Access a list of your past city breaks and notes in the travel log section.
- **Geolocation**: Use the "Move to current position" button to view your current location on the map.

## Technologies

- **Frontend**: Vite, React, JavaScript (ES6+), HTML5, CSS3, Leaflet for map rendering.
- **Backend**: FastAPI, Python, MongoDB for storing city break data.

## Installation

To get started with this project, follow these steps:
1. **Clone the repository**:
```bash
git clone https://github.com/horlesq/city-breaks-diary.git
```
2. **Navigate to the frontend directory**:
```bash
cd city-breaks-diary/frontend
```
3. **Install frontend dependencies:**:
```bash
npm install
```
4. **Start the frontend development server**: 
```bash
npm run dev
```
5. **Open a new terminal window**, then navigate to the backend directory:
```bash
cd ../backend
```
6. **Install backend dependencies**:
```bash
pip install -r requirements.txt
```
7. **Start the backend server**:
```bash
uvicorn main:app --reload
```
8. The backend will run on http://localhost:8000, and the frontend on http://localhost:3000. Make sure both servers are running to use the application.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or feedback, feel free to reach out via:

- Email: adrian.horlescu@gmail.com
- Linkedin [Adrian Horlescu](https://www.linkedin.com/in/adrian-horlescu/)
- GitHub: [Horlesq](https://github.com/horlesq)

---

This frontend is a modified version of a project teached in [The Ultimate React Course 2024](https://www.udemy.com/course/the-ultimate-react-course/)


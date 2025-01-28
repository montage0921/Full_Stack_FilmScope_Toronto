# Full_Stack_FilmScope_Toronto

FilmScope Toronto is a movie showtime aggregation website designed for cinephiles in the GTA. It collects indie movie showtimes and ticket information from over 15 theaters across the region, offering a convenient way to stay updated on the latest screenings in Toronto!

Yes, you read that right! No more opening 10+ tabs to figure out which theater is showing The Godfather right now!

---

## Admin Panel of FilmScope Toronto

## Table of Contents
- [Introduction](#introduction)
- [Demostration](#demostration)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [License](#license)

## Introduction

This branch contains the entire codebase for the admin panel of FilmScope Toronto, a project I developed independently from start to finish. It provides a straightforward and user-friendly interface to manage movies and their showtime information in the database, with functionalities for admin-only authentication, as well as viewing, adding, deleting, and updating movie and showtime details.

---


### I designed and implemented:
* A responsive frontend using React and TailwindCSS, ensuring usability across devices.
* A RESTful backend API built with Spring Boot, enabling seamless communication between the frontend and a custom-designed MySQL database.
* Secure authentication using Spring Security, allowing admin-only access.
* A Flask app to fetch detailed movie information from the TMDB API.
* Multiple scraping scripts to gather showtime information from various movie theaters across Toronto.
* A data upload system to efficiently integrate fetched data (from scraping or TMDB API) into the database.

## Demostration
![image](https://github.com/user-attachments/assets/87eccfda-0768-4889-85eb-c63384fffe2f)
![image](https://github.com/user-attachments/assets/9210491b-3e57-4dd2-9239-d5a94c550a1c)

![2FetchTMDB-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/97dd2a1e-66e7-4619-9993-1c05c71dc2f5)
![3EditandUpdate-ezgif com-optimize](https://github.com/user-attachments/assets/a262e2db-c8a3-402d-ac7e-29981dee450c)


## Tech Stack
### Frontend
- **React**
- **TailwindCSS**

### Backend
- **Spring Boot**
- **Spring Security**

### Database and TMDB API
- **MySQL**
- **Pymysql**
- **FlaskApp**

### Scraping
- **Scrapy**
- **Playwright**

### Tools
- **Git**: For version control.
- **Postman**: For API testing and debugging.
- **VS Code**: As the primary development IDE.




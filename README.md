# Full_Stack_FilmScope_Toronto

## Admin Panel of FilmScope Toronto

This branch contains the entire codebase for the admin panel of FilmScope Toronto, a project I developed independently from start to finish. It provides a straightforward and user-friendly interface to manage movies and their showtime information in the database, with functionalities for admin-only authentication, as well as viewing, adding, deleting, and updating movie and showtime details.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [License](#license)


## Introduction

FilmScope Toronto is a movie showtime aggregation website designed for cinephiles in the GTA. It collects indie movie showtimes and ticket information from over 15 theaters across the region, offering a convenient way to stay updated on the latest screenings in Toronto!

Yes, you read that right! No more opening 10+ tabs to figure out which theater is showing The Godfather right now!

---


### I designed and implemented:
* A responsive frontend using React and TailwindCSS, ensuring usability across devices.
* A RESTful backend API built with Spring Boot, enabling seamless communication between the frontend and a custom-designed MySQL database.
* Secure authentication using Spring Security, allowing admin-only access.
* A Flask app to fetch detailed movie information from the TMDB API.
* Multiple scraping scripts to gather showtime information from various movie theaters across Toronto.
* A data upload system to efficiently integrate fetched data (from scraping or TMDB API) into the database.


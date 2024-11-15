CREATE TABLE movie_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    film_id INT UNIQUE,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255) DEFAULT "",
    directors JSON DEFAULT NULL,
    casts JSON DEFAULT '[]',
    genres JSON DEFAULT '[]',
    release_year INT DEFAULT NULL,
    countries JSON DEFAULT '[]',
    languages JSON DEFAULT '[]',
    runtime INT DEFAULT NULL,
    poster_path VARCHAR(255) DEFAULT NULL,
    overview TEXT DEFAULT NULL,
    imdb_id VARCHAR(20) DEFAULT NULL
);

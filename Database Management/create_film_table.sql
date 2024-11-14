CREATE TABLE movie_info (
	id INT AUTO_INCREMENT PRIMARY KEY,
    film_id INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    original_title varchar(255),
    directors JSON NOT NULL,
    casts JSON,
    genres JSON,
    release_year INT,
    countries JSON,
    languages JSON,
    runtime int,
    poster_path varchar(255),
    overview text,
    imdb_id varchar(20)
);
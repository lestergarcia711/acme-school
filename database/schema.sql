
CREATE DATABASE acme_school;
USE acme_school;

CREATE TABLE identification_types (
id INT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(6) NOT NULL UNIQUE,
name VARCHAR(100) NOT NULL,
description VARCHAR(250) NULL
) ENGINE=InnoDB;

CREATE TABLE cities (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(10) NOT NULL UNIQUE,
name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE students (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(14) NOT NULL UNIQUE,
firstName VARCHAR(60) NOT NULL,
lastName VARCHAR(60) NOT NULL,
identification_type_id INT NOT NULL,
identificationNumber VARCHAR(16) NOT NULL,
gender VARCHAR(20) NULL,
birthdate DATETIME NULL,
email VARCHAR(60) NULL UNIQUE,
address VARCHAR(100) NULL,
city_id BIGINT NULL,
UNIQUE KEY uq_students_code (code),
CONSTRAINT fk_students_idtype FOREIGN KEY (identification_type_id) REFERENCES identification_types(id),
CONSTRAINT fk_students_city FOREIGN KEY (city_id) REFERENCES cities(id)
) ENGINE=InnoDB;


CREATE TABLE teachers (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(60) NOT NULL,
lastName VARCHAR(60) NOT NULL,
identification_type_id INT NOT NULL,
identificationNumber VARCHAR(16) NOT NULL,
email VARCHAR(100) NULL UNIQUE,
CONSTRAINT fk_teachers_idtype FOREIGN KEY (identification_type_id) REFERENCES identification_types(id)
) ENGINE=InnoDB;


CREATE TABLE classrooms (
id INT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(10) NOT NULL,
description VARCHAR(250) NULL,
capacity INT NOT NULL,
active TINYINT NOT NULL DEFAULT 1
) ENGINE=InnoDB;


CREATE TABLE courses (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(10) NOT NULL,
description VARCHAR(250) NULL,
intensity INT NULL,
weight INT NULL,
active TINYINT NOT NULL DEFAULT 1
) ENGINE=InnoDB;


CREATE TABLE topics (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
course_id BIGINT NOT NULL,
code VARCHAR(10) NOT NULL,
title VARCHAR(100) NOT NULL,
description VARCHAR(250) NULL,
active TINYINT NOT NULL DEFAULT 1,
CONSTRAINT fk_topics_course FOREIGN KEY (course_id) REFERENCES courses(id)
) ENGINE=InnoDB;


CREATE TABLE courses_schedules (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
course_id BIGINT NOT NULL,
teacher_id BIGINT NOT NULL,
classroom_id INT NOT NULL,
start_date DATETIME NOT NULL,
end_date DATETIME NOT NULL,
active TINYINT NOT NULL DEFAULT 1,
CONSTRAINT fk_cs_course FOREIGN KEY (course_id) REFERENCES courses(id),
CONSTRAINT fk_cs_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id),
CONSTRAINT fk_cs_classroom FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
) ENGINE=InnoDB;


CREATE TABLE inscriptions (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
course_schedule_id BIGINT NOT NULL,
student_id BIGINT NOT NULL,
register_date DATETIME NOT NULL,
active TINYINT NOT NULL DEFAULT 1,
CONSTRAINT fk_insc_schedule FOREIGN KEY (course_schedule_id) REFERENCES courses_schedules(id),
CONSTRAINT fk_insc_student FOREIGN KEY (student_id) REFERENCES students(id)
) ENGINE=InnoDB;


CREATE TABLE rates (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
inscription_id BIGINT NOT NULL,
rate BIGINT NOT NULL,
comments VARCHAR(250) NULL,
CONSTRAINT fk_rates_insc FOREIGN KEY (inscription_id) REFERENCES inscriptions(id)
) ENGINE=InnoDB;

-- Estos datos son de prueba para la base de datos acme_school, se pueden eliminar si no son necesarios.
-- En este caso por motivos de prueba se insertan datos en las tablas identification_types, cities, teachers, 
-- classrooms, courses y courses_schedules.

USE acme_school;

INSERT INTO identification_types (code, name) VALUES
  ('DPI', 'Documento Personal de Identificacion'),
  ('PAS', 'Pasaporte');

INSERT INTO cities (code, name)
 VALUES ('GUA', 'Guatemala'), ('MEX', 'Mexico');

INSERT INTO teachers (firstName, lastName, identification_type_id, identificationNumber, email)
  VALUES ('Ana', 'Lopez', 1, '1234567890101', 'ana@acme.test');

INSERT INTO classrooms (code, description, capacity) VALUES ('A-101', 'Aula 101', 30);

INSERT INTO courses (code, description, intensity, weight)
  VALUES ('MAT-01', 'Matematicas I', 4, 10);

INSERT INTO courses_schedules (course_id, teacher_id, classroom_id, start_date, end_date)
  VALUES (1, 1, 1, '2026-11-02 08:00:00', '2026-12-18 10:00:00');
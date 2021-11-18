CREATE TABLE users (
    id varchar(100) NOT NULL UNIQUE, 
    login varchar(30) NOT NULL UNIQUE, 
    password varchar(30) NOT NULL, 
    age int NOT NULL, 
    is_deleted bool DEFAULT FALSE
);
ALTER TABLE users ADD PRIMARY KEY (id);

INSERT INTO users VALUES ('33e837f6-f8f2-45d5-b4c4-0ef937c47695','Naruto', 'qwerty', 21);
INSERT INTO users VALUES ('8009da47-17e5-4003-b2d4-70727e6bf2e8','Sasuke', 'abc', 20);
INSERT INTO users VALUES ('4cf6ac90-215b-4ee5-a18a-96dc442a9faa','Shrek', 'abc2', 100);
INSERT INTO users VALUES ('7c0efce1-3612-44ce-9e95-3811154d219a', 'Donkey', 'xyz', 12);
INSERT INTO users VALUES ('fdbbf7bf-dc6d-468b-8572-86b52dbface1', 'Fiona', 'xyz2', 30);

CREATE TYPE permission AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

create TABLE groups (
    id varchar(100) NOT NULL UNIQUE,
    name varchar(30) NOT NULL UNIQUE,
    permissions permission[]
);

ALTER TABLE groups ADD PRIMARY KEY (id);

INSERT INTO groups VALUES ('1', 'directors', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');
INSERT INTO groups VALUES ('2', 'managers', '{"READ", "WRITE", "SHARE"}');
INSERT INTO groups VALUES ('3', 'employees', '{"READ"}');


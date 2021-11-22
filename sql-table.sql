CREATE TABLE users (
    id varchar(100) NOT NULL UNIQUE, 
    login varchar(30) NOT NULL UNIQUE, 
    password varchar(30) NOT NULL, 
    age int NOT NULL, 
    is_deleted bool DEFAULT FALSE
);
ALTER TABLE users ADD PRIMARY KEY (id);

INSERT INTO users VALUES ('1','Naruto', 'qwerty', 21);
INSERT INTO users VALUES ('2','Sasuke', 'abc', 20);
INSERT INTO users VALUES ('3','Shrek', 'abc2', 100);
INSERT INTO users VALUES ('4', 'Donkey', 'xyz', 12);
INSERT INTO users VALUES ('5', 'Fiona', 'xyz2', 30);

CREATE TYPE permission AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

create TABLE groups (
    id varchar(100) NOT NULL UNIQUE,
    name varchar(30) NOT NULL UNIQUE,
    permissions permission[] NOT NULL
);

ALTER TABLE groups ADD PRIMARY KEY (id);

INSERT INTO groups VALUES ('1', 'directors', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');
INSERT INTO groups VALUES ('2', 'managers', '{"READ", "WRITE", "SHARE"}');
INSERT INTO groups VALUES ('3', 'employees', '{"READ"}');


CREATE TABLE users_groups (
    user_id varchar(100) NOT NULL,
    group_id varchar(100) NOT NULL,
    CONSTRAINT user_id_group_id PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
);

INSERT INTO users_groups VALUES ('1', '1');
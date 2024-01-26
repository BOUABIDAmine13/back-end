CREATE TABLE IF NOT EXISTS medical_clinic (
    id_clinic VARCHAR(16),
    name_clinic VARCHAR(25) NOT NULL,
    address_clinic VARCHAR(50) NOT NULL,
    email_clinic VARCHAR(30) UNIQUE NOT NULL,
    phone_clinic VARCHAR(10) NOT NULL,

    PRIMARY KEY (id_clinic)
);

CREATE TABLE IF NOT EXISTS user (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email_user VARCHAR(35) UNIQUE NOT NULL,
    password_user VARCHAR(64) NOT NULL,
    roles ENUM ('admin', 'reception', 'doctor', 'user'),
    id_clinic VARCHAR(16),

    FOREIGN KEY (id_clinic) REFERENCES medical_clinic(id_clinic)
) ;


CREATE TABLE IF NOT EXISTS employe (
    id_employe VARCHAR(16) ,
    full_name_employe VARCHAR(60) NOT NULL,
    phone_employe VARCHAR(10) NOT NULL,
    id_clinic VARCHAR(16),
    id_counnet INT,

    PRIMARY KEY (id_employe),
    FOREIGN KEY (id_counnet) REFERENCES user(id_user),
    FOREIGN KEY (id_clinic) REFERENCES medical_clinic (id_clinic)
) ;


CREATE TABLE IF NOT EXISTS doctor (
    id_doctor VARCHAR(16),
    full_name_doctor VARCHAR(20),
    address_doctor VARCHAR(50),
    phone_doctor VARCHAR(10),
    id_clinic VARCHAR(16),
    id_counnet INT,

    PRIMARY KEY (id_doctor),
    FOREIGN KEY (id_counnet) REFERENCES user (id_user),
    FOREIGN KEY (id_clinic) REFERENCES medical_clinic(id_clinic)
);

CREATE TABLE IF NOT EXISTS medical_record (
    id_record VARCHAR(16),
    full_name_child VARCHAR(20),
    birth_day_child DATETIME,
    address_child VARCHAR(50),
    email_child VARCHAR(30),
    phone_child VARCHAR(10),
    id_data VARCHAR(32),
    id_doctor VARCHAR(16),
    id_counnet INT,

    PRIMARY KEY (id_record),
    FOREIGN KEY (id_counnet) REFERENCES user (id_user),
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

CREATE TABLE IF NOT EXISTS appointment (
    id_appointment VARCHAR(16),
    date_appointment DATETIME,
    room_number VARCHAR(3),
    id_record VARCHAR(16),
    id_doctor VARCHAR(16),
    id_vaccineInfo VARCHAR(64),

    PRIMARY KEY (id_appointment),
    FOREIGN KEY (id_record) REFERENCES medical_record(id_record),
    FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
);

CREATE TABLE IF NOT EXISTS medical_archive (
    id_medical_archive VARCHAR (32),

    PRIMARY KEY (id_medical_archive)
);

CREATE TABLE IF NOT EXISTS medical_report (
    id_report VARCHAR(16),
    date_report DATETIME,
    id_doctor VARCHAR(16),

    PRIMARY KEY (id_report),
    FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
);

CREATE TABLE IF NOT EXISTS nb_by_year (
    id_table int AUTO_INCREMENT,
    current_year YEAR,
    nb_child int ,

    PRIMARY KEY (id_table)
)

CREATE TRIGGER update_nb_year
AFTER INSERT ON medical_record
FOR EACH ROW
UPDATE nb_by_year SET nb_child = nb_child + 1 WHERE current_year = YEAR(NEW.birth_day_child);

insert into medical_clinic value ("01", "clinic_01", "address_01", "clinic_01@email.com", "0111011101");
insert into user (email_user, password_user, roles,id_clinic) value ('user_01@mail.com', '123','user', '01');
insert into user (email_user, password_user, roles,id_clinic )value ('admin_01@mail.com', '123','admin', '01');
insert into user (email_user, password_user, roles,id_clinic )value ('recp_01@mail.com', '123','reception', '01');
insert into employe value ('01', 'employe_01', '01111111', '01', 10);
insert into employe value ('02', 'employe_02', '01111111',  '01', 13);
insert into user (email_user, password_user, roles,id_clinic )value ('doctor_01@mail.com', '123','doctor', '01');
insert into doctor value ("01", 'doctor_01', 'doctor_01_address', '0111111', '01', 12);
insert into medical_record value ('01', 'child_01', '2023-05-11 23:59:59', 'address_child_01', 'child_01àemail.com', '0111111', NULL, NULL, NULL);
insert into appointment value ('01', '2023-12-01 15:55:55', 'R01', '01', '01', '01');
insert into medical_report value ('01','2023-11-12 14:12:12', '01');
insert into nb_by_year (current_year, nb_child) value ("2023", 0);
delete from appointment, medical_report, medical_archive, medical_record, doctor, employe, user, medical_clinic;

drop table appointment;
drop table medical_report;
drop table medical_archive;
drop table medical_record;
drop table doctor;
drop table employe;
drop table user;
drop table medical_clinic;

FOREIGN KEY id_medical_archive REFERENCES medical_archive (id_medical_archive),
id_medical_archive VARCHAR(32),
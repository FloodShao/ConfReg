use 2020_imws_amp_attendee;

create table if not exists User(
Username varchar(30),
Upassword nvarchar(100),
primary key(Username)
);


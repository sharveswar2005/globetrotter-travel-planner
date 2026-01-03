SET search_path TO travel;

INSERT INTO users (name, email, password_hash) VALUES
('Aarav', 'aarav@mail.com', 'hash1'),
('Diya', 'diya@mail.com', 'hash2'),
('Rahul', 'rahul@mail.com', 'hash3'),
('Sneha', 'sneha@mail.com', 'hash4'),
('Arjun', 'arjun@mail.com', 'hash5'),
('Kavya', 'kavya@mail.com', 'hash6'),
('Rohan', 'rohan@mail.com', 'hash7'),
('Ananya', 'ananya@mail.com', 'hash8'),
('Vikram', 'vikram@mail.com', 'hash9'),
('Meera', 'meera@mail.com', 'hash10');

INSERT INTO cities (city_name, country, cost_index, popularity_score) VALUES
('Paris','France',1.5,95),
('Rome','Italy',1.3,90),
('London','UK',1.7,97),
('Tokyo','Japan',1.6,92),
('New York','USA',1.8,98),
('Dubai','UAE',1.4,93),
('Bangkok','Thailand',1.1,88),
('Singapore','Singapore',1.5,94),
('Barcelona','Spain',1.2,89),
('Amsterdam','Netherlands',1.4,91);

INSERT INTO trips (user_id, trip_name, description, start_date, end_date, is_public) VALUES
(1,'Europe Escape','Romantic Europe trip','2026-01-10','2026-01-20',TRUE),
(2,'Asia Adventure','Exploring Asia','2026-02-05','2026-02-15',FALSE),
(3,'USA Highlights','NYC experience','2026-03-01','2026-03-07',TRUE),
(4,'Luxury Dubai','Desert luxury','2026-04-01','2026-04-05',FALSE),
(5,'Food Tour','Culinary trip','2026-05-10','2026-05-15',TRUE),
(6,'Backpacking','Budget travel','2026-06-01','2026-06-20',FALSE),
(7,'Friends Trip','Group fun','2026-07-01','2026-07-10',TRUE),
(8,'Solo Travel','Self exploration','2026-08-01','2026-08-12',FALSE),
(9,'Honeymoon','Special moments','2026-09-01','2026-09-14',TRUE),
(10,'Short Break','Weekend getaway','2026-10-01','2026-10-04',FALSE);

INSERT INTO trip_stops (trip_id, city_id, start_date, end_date, stop_order) VALUES
(1,1,'2026-01-10','2026-01-13',1),
(1,2,'2026-01-14','2026-01-16',2),
(2,4,'2026-02-05','2026-02-10',1),
(3,5,'2026-03-01','2026-03-07',1),
(4,6,'2026-04-01','2026-04-05',1),
(5,9,'2026-05-10','2026-05-15',1),
(6,7,'2026-06-01','2026-06-10',1),
(7,10,'2026-07-01','2026-07-10',1),
(8,8,'2026-08-01','2026-08-12',1),
(9,3,'2026-09-01','2026-09-14',1);

INSERT INTO activities (city_id, activity_name, category, estimated_cost, duration_hours) VALUES
(1,'Eiffel Tower','Sightseeing',50,2),
(2,'Colosseum Tour','History',40,3),
(3,'London Eye','Sightseeing',45,1.5),
(4,'Mount Fuji Day Trip','Nature',80,6),
(5,'Statue of Liberty','Sightseeing',30,2),
(6,'Desert Safari','Adventure',100,5),
(7,'Street Food Tour','Food',25,3),
(8,'Marina Bay Walk','Leisure',20,2),
(9,'Sagrada Familia','Architecture',35,2),
(10,'Canal Cruise','Leisure',40,1.5);

INSERT INTO stop_activities (stop_id, activity_id, scheduled_date, start_time) VALUES
(1,1,'2026-01-11','10:00'),
(2,2,'2026-01-15','11:00'),
(3,4,'2026-02-07','08:00'),
(4,5,'2026-03-03','09:00'),
(5,6,'2026-04-02','15:00'),
(6,9,'2026-05-12','10:00'),
(7,7,'2026-06-05','18:00'),
(8,10,'2026-07-04','16:00'),
(9,8,'2026-08-06','19:00'),
(10,3,'2026-09-05','14:00');

INSERT INTO trip_costs (trip_id, cost_type, estimated_cost) VALUES
(1,'Stay',1200),
(2,'Transport',900),
(3,'Activities',500),
(4,'Stay',800),
(5,'Food',600),
(6,'Transport',1100),
(7,'Activities',700),
(8,'Stay',950),
(9,'Food',1000),
(10,'Transport',400);

INSERT INTO shared_trips (trip_id, public_url) VALUES
(1,'gt-europe-001'),
(3,'gt-usa-003'),
(5,'gt-food-005'),
(7,'gt-friends-007'),
(9,'gt-honeymoon-009'),
(2,'gt-asia-002'),
(4,'gt-dubai-004'),
(6,'gt-backpack-006'),
(8,'gt-solo-008'),
(10,'gt-short-010');

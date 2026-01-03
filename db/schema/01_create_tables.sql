CREATE SCHEMA IF NOT EXISTS travel;
SET search_path TO travel;

-- users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- trips
CREATE TABLE trips (
  trip_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  trip_name VARCHAR(150),
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_public BOOLEAN DEFAULT FALSE
);

-- cities
CREATE TABLE cities (
  city_id SERIAL PRIMARY KEY,
  city_name VARCHAR(100),
  country VARCHAR(100),
  cost_index NUMERIC(5,2),
  popularity_score INT
);

-- trip stops
CREATE TABLE trip_stops (
  stop_id SERIAL PRIMARY KEY,
  trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
  city_id INT REFERENCES cities(city_id),
  start_date DATE,
  end_date DATE,
  stop_order INT
);

-- activities
CREATE TABLE activities (
  activity_id SERIAL PRIMARY KEY,
  city_id INT REFERENCES cities(city_id),
  activity_name VARCHAR(150),
  category VARCHAR(50),
  estimated_cost NUMERIC(10,2),
  duration_hours NUMERIC(4,2)
);

-- stop activities
CREATE TABLE stop_activities (
  stop_activity_id SERIAL PRIMARY KEY,
  stop_id INT REFERENCES trip_stops(stop_id) ON DELETE CASCADE,
  activity_id INT REFERENCES activities(activity_id),
  scheduled_date DATE,
  start_time TIME
);

-- trip costs
CREATE TABLE trip_costs (
  cost_id SERIAL PRIMARY KEY,
  trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
  cost_type VARCHAR(50),
  estimated_cost NUMERIC(10,2)
);

-- shared trips
CREATE TABLE shared_trips (
  share_id SERIAL PRIMARY KEY,
  trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
  public_url TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create databases for Umami and Listmonk
CREATE DATABASE umami;
CREATE DATABASE listmonk;

-- Grant all privileges (user is already created by POSTGRES_USER env var)
GRANT ALL PRIVILEGES ON DATABASE umami TO postgres;
GRANT ALL PRIVILEGES ON DATABASE listmonk TO postgres;

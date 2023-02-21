CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add a unique constraint on the email column
ALTER TABLE "users" ADD CONSTRAINT unique_email UNIQUE (email);


-- Define a trigger to update the updated_at column whenever a row is updated
CREATE TRIGGER update_user_updated_at
  BEFORE UPDATE ON "users"
  FOR EACH ROW
  EXECUTE FUNCTION update_user_updated_at();

-- Define a function to update the updated_at column to the current timestamp
CREATE OR REPLACE FUNCTION update_user_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

-- Create the "image" table
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add a foreign key constraint for the "user_id" column
ALTER TABLE image ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id);

-- Create a trigger to update the "updated_at" field whenever a row is updated
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER image_updated_at_trigger
BEFORE UPDATE ON image
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

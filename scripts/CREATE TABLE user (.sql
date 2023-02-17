CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add a unique constraint on the email column
ALTER TABLE "user" ADD CONSTRAINT unique_email UNIQUE (email);

-- Define a function to compare a plain text password with the hashed password in the database
CREATE OR REPLACE FUNCTION compare_password(user_email TEXT, plain_password TEXT)
  RETURNS BOOLEAN AS $$
  DECLARE
    hashed_password TEXT;
  BEGIN
    SELECT password_hash FROM "user" WHERE email = user_email INTO hashed_password;
    RETURN hashed_password = crypt(plain_password, hashed_password);
  END;
$$ LANGUAGE plpgsql;

-- Define a trigger to update the updated_at column whenever a row is updated
CREATE TRIGGER update_user_updated_at
  BEFORE UPDATE ON "user"
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

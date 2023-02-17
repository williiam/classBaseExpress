-- Create a function for comparing password hashes
CREATE OR REPLACE FUNCTION compare_password(
    password TEXT, 
    hash TEXT
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN crypt(password, hash) = hash;
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

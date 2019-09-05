DROP TABLE IF EXISTS user_accounts;
DROP SEQUENCE IF EXISTS user_account_id_seq;
CREATE SEQUENCE user_account_id_seq;
CREATE TABLE user_accounts
(
  id integer NOT NULL DEFAULT nextval('user_account_id_seq'),
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  name character varying(255),
  mobile character varying(20),
  otp_token character varying(10),
  flag_active boolean DEFAULT '0',
  create_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT user_account_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);




DROP TABLE IF EXISTS token_access;
DROP SEQUENCE IF EXISTS token_access_id_seq;
CREATE SEQUENCE token_access_id_seq;
CREATE TABLE token_access
(
  id integer NOT NULL DEFAULT nextval('token_access_id_seq'),
  user_id integer NOT NULL,
  token_access character varying(255) NOT NULL,
  push_notification_token character varying(255),
  devices character varying(50),
  create_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT token_access_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);


INSERT INTO user_accounts (email, password, name, mobile )
VALUES
   ("thanhhung.tud@gmail.com", "", …);
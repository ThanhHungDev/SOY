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
  flag_active boolean DEFAULT '0',
  create_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT user_account_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

thanhung.abc@gmail.com
123456
$2b$10$7L9Yx9DyCYXQFRrZAn4LN.8SHuW1lAdLBG2ybgB3dkgz0MSHSHSHe


INSERT INTO user_accounts (email, password, name, mobile )
VALUES ("thanhhung.tud@gmail.com", "$2b$10$7L9Yx9DyCYXQFRrZAn4LN.8SHuW1lAdLBG2ybgB3dkgz0MSHSHSHe", "hùng tt" , "0797581480");

DROP TABLE IF EXISTS token_refesh;
DROP SEQUENCE IF EXISTS token_refesh_id_seq;
CREATE SEQUENCE token_refesh_id_seq;
CREATE TABLE token_refesh
(
  id integer NOT NULL DEFAULT nextval('token_refesh_id_seq'),
  user_id integer NOT NULL,
  token_refesh character varying(255) NOT NULL,
  browser character varying(64),
  browser_major_version character varying(64),
  browser_version character varying(64),
  cookies boolean DEFAULT '0',
  mobile boolean DEFAULT '0',
  os character varying(64),
  os_version character varying(64),
  create_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT token_refesh_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
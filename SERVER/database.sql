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
  avatar character varying(255) 
  DEFAULT 'https://mdbootstrap.com/img/Photos/Avatars/avatar.jpg',
  flag_active boolean DEFAULT '1',
  create_at TIMESTAMP DEFAULT NOW(),
  update_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT user_account_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

INSERT INTO user_accounts (email, password, name, mobile ) 
VALUES ('thanhhung.tud@gmail.com', 
'$2b$10$7L9Yx9DyCYXQFRrZAn4LN.8SHuW1lAdLBG2ybgB3dkgz0MSHSHSHe', 'hùng tt' , '0797581480');

DROP TABLE IF EXISTS token_refesh;
DROP SEQUENCE IF EXISTS token_refesh_id_seq;
CREATE SEQUENCE token_refesh_id_seq;
CREATE TABLE token_refesh
(
  id integer NOT NULL DEFAULT nextval('token_refesh_id_seq'),
  user_id integer NOT NULL,
  token_refesh character varying(255) NOT NULL,
  client character varying(1024),
  create_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT token_refesh_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
-- {"browser":"browser","browser_major_version":"browser_major_version","browser_version":"browser_version","cookies":1,"mobi
-- le":1,"os":"os","os_version":"os_version"}

DROP TABLE IF EXISTS post;
DROP SEQUENCE IF EXISTS post_id_seq;
CREATE SEQUENCE post_id_seq;
CREATE TABLE post
(
  id integer NOT NULL DEFAULT nextval('post_id_seq'),
  title character varying(100) NOT NULL,
  description text NOT NULL,
  custom json,
  post_id integer NOT NULL,
  thumbnail_id integer,
  topic_id integer,
  update_at TIMESTAMP DEFAULT NOW(),
  create_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT post_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS topic;
DROP SEQUENCE IF EXISTS topic_id_seq;
CREATE SEQUENCE topic_id_seq;
CREATE TABLE topic
(
  id integer NOT NULL DEFAULT nextval('topic_id_seq'),
  name character varying(100) NOT NULL,
  parent_id integer,
  CONSTRAINT topic_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

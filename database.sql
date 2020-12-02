

CREATE TABLE movies (
    movie_id character varying(100) NOT NULL,
    movie_name character varying(50) NOT NULL,
);



CREATE TABLE locations (
    location_id integer NOT NULL,
    real_life_location character varying(25) NOT NULL,
    real_address character varying(25) NOT NULL,
    movie_scene character varying(100) NOT NULL,
    descriptions character varying(200) NOT NULL,
    imgURL character varying(200) NOT NULL, 
    FOREIGN KEY(movie_id) REFERENCES movies(movid_id)

);




CREATE SEQUENCE locations_location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;





-- COPY animals (animal_id, human_id, name, animal_species, birth_year) FROM stdin;
-- 1	1	Fluffy	cat	2010
-- 2	2	Squiggles	snake	2016
-- 3	3	Fido	dog	2015
-- 4	2	Birdy	bird	2017
-- 5	4	Bubbles	fish	\N
-- 6	2	Mr. Hops	rabbit	\N
-- 7	5	Bugs	rabbit	2016
-- 8	1	Cuddles	cat	\N
-- 9	5	Buster	dog	2011
-- 10	5	Twinkie	dog	2014
-- 11	4	Fluffster	dog	2013
-- 12	1	Twinkles	cat	2014
-- \.


-- --
-- -- Name: animals_animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
-- --

-- SELECT pg_catalog.setval('animals_animal_id_seq', 12, true);


-- --
-- -- Data for Name: humans; Type: TABLE DATA; Schema: public; Owner: vagrant
-- --

-- COPY humans (human_id, fname, lname, email) FROM stdin;
-- 1	Bob	Personne	bpersonne@yahoo.com
-- 2	Jane	Doe	jdoe@gmail.com
-- 3	Jasmine	Debugger	jdebugs@hotmail.com
-- 4	John	Doer	john_doe@gmail.com
-- 5	Jane	Hacks	jhacks@gmail.com
-- \.


-- --
-- -- Name: humans_human_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
-- --

-- SELECT pg_catalog.setval('humans_human_id_seq', 5, true);


-- --
-- -- Name: animals_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
-- --

-- ALTER TABLE ONLY animals
--     ADD CONSTRAINT animals_pkey PRIMARY KEY (animal_id);


-- --
-- -- Name: humans_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
-- --

-- ALTER TABLE ONLY humans
--     ADD CONSTRAINT humans_pkey PRIMARY KEY (human_id);


-- --
-- -- Name: animals_human_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
-- --

-- ALTER TABLE ONLY animals
--     ADD CONSTRAINT animals_human_id_fkey FOREIGN KEY (human_id) REFERENCES humans(human_id);


-- --
-- -- Name: public; Type: ACL; Schema: -; Owner: postgres
-- --

-- REVOKE ALL ON SCHEMA public FROM PUBLIC;
-- REVOKE ALL ON SCHEMA public FROM postgres;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO PUBLIC;


-- --
-- -- PostgreSQL database dump complete
-- --


--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admintable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admintable (
    adminid character varying(20) NOT NULL,
    adminfirstname character varying(255),
    adminlastname character varying(255),
    adminemailaddress character varying(255),
    adminpassword character varying(255),
    admincontactnumber character varying(255),
    userroleid character varying(20),
    branchid character varying(20),
    is_active character varying(10)
);


ALTER TABLE public.admintable OWNER TO postgres;

--
-- Name: branchtable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branchtable (
    branchid character varying(20) NOT NULL,
    branchname character varying(255),
    branchlocationaddress character varying(255),
    branchlatitude character varying(20),
    branchlongitude character varying(20),
    is_active character varying(255)
);


ALTER TABLE public.branchtable OWNER TO postgres;

--
-- Name: carttable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carttable (
    cartid character varying(20) NOT NULL,
    customerid character varying(20),
    foodmenuid character varying(20),
    foodmenupriceid character varying(20),
    quantity integer
);


ALTER TABLE public.carttable OWNER TO postgres;

--
-- Name: customeraddresstable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customeraddresstable (
    customeraddressid character varying(20) NOT NULL,
    customerid character varying(20),
    customerfullname character varying(255),
    customercontactnumber character varying(255),
    customerstreet character varying(255),
    customerbarangay character varying(255),
    customercity character varying(255),
    customernotes text,
    customeraddresslabel character varying(255),
    customeraddressdefault boolean,
    addresslatitude character varying(55),
    addresslongitude character varying(55)
);


ALTER TABLE public.customeraddresstable OWNER TO postgres;

--
-- Name: customerorderitemtable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customerorderitemtable (
    customerorderitemid character varying(20) NOT NULL,
    customerorderid character varying(20),
    foodmenuid character varying(20),
    foodmenupriceid character varying(20),
    customerorderitemquantity integer,
    customerorderitemtotalprice numeric(10,2)
);


ALTER TABLE public.customerorderitemtable OWNER TO postgres;

--
-- Name: customerordertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customerordertable (
    customerorderid character varying(20) NOT NULL,
    customerid character varying(20),
    customeraddressid character varying(20),
    customerorderdate timestamp without time zone,
    customerorderstatus character varying(255),
    customerordertotalprice numeric(10,2),
    customerorderpaymentmethod character varying(255),
    customerorderpaymentstatus character varying(255),
    branchid character varying(20),
    estimated_delivery_time character varying(255),
    order_method character varying(50)
);


ALTER TABLE public.customerordertable OWNER TO postgres;

--
-- Name: customertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customertable (
    customerid character varying(20) NOT NULL,
    customerfirstname character varying(255),
    customerlastname character varying(255),
    customeremailadress character varying(255),
    customerpassword character varying(255),
    customercontactnumber character varying(255),
    userroleid character varying(20)
);


ALTER TABLE public.customertable OWNER TO postgres;

--
-- Name: deliverypersontable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deliverypersontable (
    deliverypersonid character varying(20) NOT NULL,
    deliverypersonfirstname character varying(255),
    deliverypersonlastname character varying(255),
    deliverypersonemailadress character varying(255),
    deliverypersonpassword character varying(255),
    deliverypersoncontactnumber character varying(255),
    userroleid character varying(20),
    branchid character varying(20)
);


ALTER TABLE public.deliverypersontable OWNER TO postgres;

--
-- Name: foodmenupricetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foodmenupricetable (
    foodmenupriceid character varying(20) NOT NULL,
    foodmenuid character varying(20),
    foodmenuprice numeric(10,2),
    foodmenucuttype character varying(255),
    branchid character varying(20)
);


ALTER TABLE public.foodmenupricetable OWNER TO postgres;

--
-- Name: foodmenutable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foodmenutable (
    foodmenuid character varying(20) NOT NULL,
    foodmenuname character varying(255),
    foodmenudescription text,
    foodmenucategory character varying(255),
    foodmenuimage character varying(255)
);


ALTER TABLE public.foodmenutable OWNER TO postgres;

--
-- Name: productavailabilitytable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productavailabilitytable (
    availabilityid character varying(20) NOT NULL,
    branchid character varying(20),
    foodmenuid character varying(20),
    available character varying(20)
);


ALTER TABLE public.productavailabilitytable OWNER TO postgres;

--
-- Name: superadmin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.superadmin (
    superadminid character varying(20) NOT NULL,
    superadminfirstname character varying(255),
    superadminlastname character varying(255),
    superadminemailaddress character varying(255),
    superadminpassword character varying(255),
    superadmincontactnumber character varying(255),
    userroleid character varying(20)
);


ALTER TABLE public.superadmin OWNER TO postgres;

--
-- Name: userroletable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userroletable (
    userroleid character varying(20) NOT NULL,
    userrolename character varying(255)
);


ALTER TABLE public.userroletable OWNER TO postgres;

--
-- Data for Name: admintable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admintable (adminid, adminfirstname, adminlastname, adminemailaddress, adminpassword, admincontactnumber, userroleid, branchid, is_active) FROM stdin;
ADMIN1113	Ammie	Mallada	ammie@example.com	$2b$10$DCppO66jP7.BRIITGxfki.khkGUE/E9IYMuGiePIpKzSv4X3QAD5a	1334567893	ADM	3	active
ADMIN1114	Mark	Andrew	mark.andrew15@example.com	$2b$10$VPZmO46sGh4o4pSebxA/We6qQqF1TVGxMtuECdH5E7iH0vDSD2SeO	1234567894	ADM	4	active
ADMIN1111	Raizhell Ann	Gutierrez	raizhellann@example.com	$2b$10$eixP4Mj127aJGrS3i31nIeybMaYXVAMw8z3pXkCoesh6mYuNNFMOC	1234567891	ADM	1	active
ADMIN1115	Angeline	Fabricante	angeline2@example.com	$2b$10$JwAA7cPUjduF5UavK6xTz.FG92YTHARCE8Ptija5cHGTvEQzIH6PO	1234567895	ADM	5	inactive
ADMIN1112	Justmyr	Dimasacat	justmyr@example.com	$2b$10$Wu8FdFP0vVPhrJ2lgMvw4OaY/6quk1CUfGZOh1oSWdCV.2noagiZ2	1234567892	ADM	2	inactive
\.


--
-- Data for Name: branchtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branchtable (branchid, branchname, branchlocationaddress, branchlatitude, branchlongitude, is_active) FROM stdin;
2	Branch 2 Maselang	Maselang, Calicanto, Batangas	13.767397172527913	121.05305458790558	active
1	Branch 1 P. Niogan	P. Niogan, Mabini, Batangas	13.757480970967423	120.94074879360764	active
4	Branch 4 Manghinao	Brgy. Manghinao Sitio Pandayan, Bauan, Batangas	13.793488590715778	121.00670246131533	active
5	Branch 5 Bolo	Bolo, Bauan, Batangas	13.792051149644958	120.98128083389435	active
3	Branch 3 Libjo	Libjo, Batangas City	13.744601253513487	121.07009514197415	active
\.


--
-- Data for Name: carttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carttable (cartid, customerid, foodmenuid, foodmenupriceid, quantity) FROM stdin;
\.


--
-- Data for Name: customeraddresstable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customeraddresstable (customeraddressid, customerid, customerfullname, customercontactnumber, customerstreet, customerbarangay, customercity, customernotes, customeraddresslabel, customeraddressdefault, addresslatitude, addresslongitude) FROM stdin;
SFMA3794492910000000	C753800915	Justmyr Gutierrez	09369744408	Sitio 7	Balete Relocation Site	Batangas City			t	13.81907555	121.06428337048469
SFMA5238548110000000	C56463520	Justmyr Gutierrez	09063488667	Sitio 7	Balete Relocation Site	Batangas City	Green House With Store	work	t	13.81907555	121.06428337048469
\.


--
-- Data for Name: customerorderitemtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customerorderitemtable (customerorderitemid, customerorderid, foodmenuid, foodmenupriceid, customerorderitemquantity, customerorderitemtotalprice) FROM stdin;
\.


--
-- Data for Name: customerordertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customerordertable (customerorderid, customerid, customeraddressid, customerorderdate, customerorderstatus, customerordertotalprice, customerorderpaymentmethod, customerorderpaymentstatus, branchid, estimated_delivery_time, order_method) FROM stdin;
\.


--
-- Data for Name: customertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customertable (customerid, customerfirstname, customerlastname, customeremailadress, customerpassword, customercontactnumber, userroleid) FROM stdin;
C56463520	Justmyr	Gutierrez	20-02126@g.batstate-u.edu.ph	$2b$10$hVcFLnyy.h88zapTg/o7euu2CPvrf.MSmEKvnGiya0bSqNEgtq0KC	09063488667	CUS
C753800915	Justmyr	Gutierrez	justmyrgutierrez1@gmail.com	$2b$10$4kqvcJ/57aJJLjGtL/3gQOZHwPYMPt9JBdkNq7Am29JqJznSL22jC	09369744408	CUS
\.


--
-- Data for Name: deliverypersontable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliverypersontable (deliverypersonid, deliverypersonfirstname, deliverypersonlastname, deliverypersonemailadress, deliverypersonpassword, deliverypersoncontactnumber, userroleid, branchid) FROM stdin;
\.


--
-- Data for Name: foodmenupricetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodmenupricetable (foodmenupriceid, foodmenuid, foodmenuprice, foodmenucuttype, branchid) FROM stdin;
SFMP3591594610000000	87504	290.00	Whole	2
SFMP3094280310000000	87504	145.00	Half	2
SFMP6806467210000000	87504	290.00	Whole	5
SFMP9318988510000000	87504	290.00	Whole	4
SFMP8684340110000000	87504	290.00	Whole	3
SFMP1194166810000000	87504	145.00	Half	4
SFMP213534210000000	87504	145.00	Half	5
SFMP4581286110000000	87504	145.00	Half	3
SFMP9004713010000000	86968	310.00	Whole	2
SFMP9748202110000000	86968	310.00	Whole	1
SFMP9587258810000000	86968	155.00	Half	1
SFMP1194795310000000	86968	155.00	Half	4
SFMP6036814910000000	86968	155.00	Half	5
SFMP9008454410000000	86968	155.00	Half	3
SFMP8534367610000000	86968	310.00	Whole	5
SFMP6964140610000000	86968	310.00	Whole	4
SFMP9230256710000000	86968	155.00	Half	2
SFMP6793313810000000	86968	310.00	Whole	3
SFMP4950984710000000	87504	290.00	Whole	1
SFMP6157961410000000	87504	145.00	Half	1
\.


--
-- Data for Name: foodmenutable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodmenutable (foodmenuid, foodmenuname, foodmenudescription, foodmenucategory, foodmenuimage) FROM stdin;
87504	Lechon Manok	Best lechon manok in town!	Chicken	foodMenuImage-1699791899707.png1f56a8a3-c6b6-4d9f-b3b0-fa191bffc23b
86968	Chicken Sisig	Delicious Chicken Sisig	Chicken	foodMenuImage-1699806003186.png15a57f1b-5886-46d5-a3ed-4155c28eb380
\.


--
-- Data for Name: productavailabilitytable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productavailabilitytable (availabilityid, branchid, foodmenuid, available) FROM stdin;
AV583710000	2	87504	Available
AV666910000	4	87504	Available
AV7616810000	5	87504	Available
AV8870410000	3	87504	Available
AV4539910000	2	86968	Available
AV8714910000	1	86968	Available
AV1966410000	4	86968	Available
AV1668810000	5	86968	Available
AV1754910000	3	86968	Available
AV535210000	1	87504	Unavailable
\.


--
-- Data for Name: superadmin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.superadmin (superadminid, superadminfirstname, superadminlastname, superadminemailaddress, superadminpassword, superadmincontactnumber, userroleid) FROM stdin;
1	Super	Admin	superadmin@example.com	$2b$10$b8bQvS7iTc4VNSfEAuZ6KurSQR4/fW1R7Tiy1hUr5fEtCRwtaJHv.	1234567890	STF
\.


--
-- Data for Name: userroletable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userroletable (userroleid, userrolename) FROM stdin;
CUS	Customer
ADM	Admin
STF	Super Admin
\.


--
-- Name: admintable admintable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_pkey PRIMARY KEY (adminid);


--
-- Name: branchtable branchtable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchtable
    ADD CONSTRAINT branchtable_pkey PRIMARY KEY (branchid);


--
-- Name: carttable carttable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_pkey PRIMARY KEY (cartid);


--
-- Name: customeraddresstable customeraddresstable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customeraddresstable
    ADD CONSTRAINT customeraddresstable_pkey PRIMARY KEY (customeraddressid);


--
-- Name: customerorderitemtable customerorderitemtable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_pkey PRIMARY KEY (customerorderitemid);


--
-- Name: customerordertable customerordertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_pkey PRIMARY KEY (customerorderid);


--
-- Name: customertable customertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_pkey PRIMARY KEY (customerid);


--
-- Name: deliverypersontable deliverypersontable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_pkey PRIMARY KEY (deliverypersonid);


--
-- Name: foodmenupricetable foodmenupricetable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_pkey PRIMARY KEY (foodmenupriceid);


--
-- Name: foodmenutable foodmenutable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenutable
    ADD CONSTRAINT foodmenutable_pkey PRIMARY KEY (foodmenuid);


--
-- Name: productavailabilitytable productavailabilitytable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_pkey PRIMARY KEY (availabilityid);


--
-- Name: superadmin superadmin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (superadminid);


--
-- Name: userroletable userroletable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userroletable
    ADD CONSTRAINT userroletable_pkey PRIMARY KEY (userroleid);


--
-- Name: admintable admintable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: admintable admintable_userroleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);


--
-- Name: carttable carttable_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);


--
-- Name: carttable carttable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: carttable carttable_foodmenupriceid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_foodmenupriceid_fkey FOREIGN KEY (foodmenupriceid) REFERENCES public.foodmenupricetable(foodmenupriceid);


--
-- Name: customeraddresstable customeraddresstable_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customeraddresstable
    ADD CONSTRAINT customeraddresstable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);


--
-- Name: customerorderitemtable customerorderitemtable_customerorderid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_customerorderid_fkey FOREIGN KEY (customerorderid) REFERENCES public.customerordertable(customerorderid);


--
-- Name: customerorderitemtable customerorderitemtable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: customerorderitemtable customerorderitemtable_foodmenupriceid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_foodmenupriceid_fkey FOREIGN KEY (foodmenupriceid) REFERENCES public.foodmenupricetable(foodmenupriceid);


--
-- Name: customerordertable customerordertable_customeraddressid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_customeraddressid_fkey FOREIGN KEY (customeraddressid) REFERENCES public.customeraddresstable(customeraddressid);


--
-- Name: customerordertable customerordertable_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);


--
-- Name: customertable customertable_userroleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);


--
-- Name: deliverypersontable deliverypersontable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: deliverypersontable deliverypersontable_userroleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);


--
-- Name: productavailabilitytable fk_availability_foodmenutable; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT fk_availability_foodmenutable FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: customerordertable fk_customerordertable_branch; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT fk_customerordertable_branch FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: foodmenupricetable foodmenupricetable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: foodmenupricetable foodmenupricetable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: productavailabilitytable productavailabilitytable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: productavailabilitytable productavailabilitytable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- PostgreSQL database dump complete
--


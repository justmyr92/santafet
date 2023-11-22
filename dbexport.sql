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
    branchid character varying(20)
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
    branchlongitude character varying(20)
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
    foodmenucuttype character varying(255)
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

COPY public.admintable (adminid, adminfirstname, adminlastname, adminemailaddress, adminpassword, admincontactnumber, userroleid, branchid) FROM stdin;
ADMIN1111	Raizhell Ann	Gutierrez	branch1@example.com	$2b$10$eixP4Mj127aJGrS3i31nIeybMaYXVAMw8z3pXkCoesh6mYuNNFMOC	1234567891	ADM	1
ADMIN1112	Justmyr	Dimasacat	branch2@example.com	$2b$10$Wu8FdFP0vVPhrJ2lgMvw4OaY/6quk1CUfGZOh1oSWdCV.2noagiZ2	1234567892	ADM	2
ADMIN1113	Ammie	Mallada	branch3@example.com	$2b$10$DCppO66jP7.BRIITGxfki.khkGUE/E9IYMuGiePIpKzSv4X3QAD5a	1334567893	ADM	3
ADMIN1114	Angeline	Fabricante	branch4@example.com	$2b$10$VPZmO46sGh4o4pSebxA/We6qQqF1TVGxMtuECdH5E7iH0vDSD2SeO	1334567894	ADM	4
ADMIN1115	Angeline	Fabricante	branch5@example.com	$2b$10$JwAA7cPUjduF5UavK6xTz.FG92YTHARCE8Ptija5cHGTvEQzIH6PO	1334567895	ADM	5
66159860	Justmyr	Gutierrez	justmyrdimasacat@gmail.com	$2b$10$VlHfc04anhB/cUTiy8FzDOHSnsTfQnMkIGZL4XE805riFfq.L8u8.	09261628615	ADM	29691257
\.


--
-- Data for Name: branchtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branchtable (branchid, branchname, branchlocationaddress, branchlatitude, branchlongitude) FROM stdin;
1	Branch 1 Kumintang	Kumintang Ibaba, Batangas City	13.76622487	121.06486732
2	Branch 2 Bolbok	Bolbok, Batangas City	13.77117112	121.05076662
3	Branch 3 Santa Rita Karsada	Santa Rita Karsada, Batangas City	13.78114018	121.03468859
4	Branch 4 Ibaan	Ibaan, Batangas	13.82202163	121.13323044
5	Branch 5 Cuenca	Cuenca, Batangas	13.90468727	121.04878367
29691257	asd	Balagtas, Batangas City	13.7975137	121.0709352
\.


--
-- Data for Name: carttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carttable (cartid, customerid, foodmenuid, foodmenupriceid, quantity) FROM stdin;
C446925298	C720589230	96449	SFMP2621787210000000	8
\.


--
-- Data for Name: customeraddresstable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customeraddresstable (customeraddressid, customerid, customerfullname, customercontactnumber, customerstreet, customerbarangay, customercity, customernotes, customeraddresslabel, customeraddressdefault, addresslatitude, addresslongitude) FROM stdin;
SFMA5327242510000000	C720589230	Raizhell Gutierrez	09073720990	Pulo	Balagtas	Batangas City			t	13.7975137	121.0709352
SFMA4183844310000000	C461039555	Justmyr Gutierrez	09073720112	Sitio 7	Balete Relocation Site	Batangas City		work	t	13.81907555	121.06428337048469
\.


--
-- Data for Name: customerorderitemtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customerorderitemtable (customerorderitemid, customerorderid, foodmenuid, foodmenupriceid, customerorderitemquantity, customerorderitemtotalprice) FROM stdin;
ufcrftkd7	snvwgfa82	96449	SFMP2621787210000000	17	7548.00
hm3h5vxd4	snvwgfa82	13723	SFMP8445799410000000	10	10.00
ql15gsrqv	9slw0mdq7	66038	SFMP4713337810000000	10	130.00
dcejjsumm	9slw0mdq7	77598	SFMP8072861210000000	10	120.00
iufzp830l	2nb5j9ngw	96449	SFMP2621787210000000	1	444.00
1jc80jelv	2nb5j9ngw	66038	SFMP6934292310000000	10	123120.00
uwcez7mp6	6dbrewbxn	96449	SFMP2621787210000000	1	444.00
qe6bcwyxa	6dbrewbxn	66038	SFMP6934292310000000	1	12312.00
w4vrxdf5o	93azwwspe	13723	SFMP8445799410000000	213123	852492.00
gwnfg5l40	s3i71i2np	13723	SFMP8445799410000000	1123123	4492492.00
\.


--
-- Data for Name: customerordertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customerordertable (customerorderid, customerid, customeraddressid, customerorderdate, customerorderstatus, customerordertotalprice, customerorderpaymentmethod, customerorderpaymentstatus, branchid, estimated_delivery_time, order_method) FROM stdin;
snvwgfa82	C461039555	SFMA4183844310000000	2023-11-20 18:59:00	Processing	7608.00	Cash	Pending	1	\N	\N
9slw0mdq7	C461039555	SFMA4183844310000000	2023-11-20 19:48:51	Pending	300.00	Cash	Pending	3		Delivery
2nb5j9ngw	C461039555	SFMA4183844310000000	2023-11-20 19:49:25	Completed	123614.00	Cash	Pending	1	\N	Delivery
6dbrewbxn	C461039555	SFMA4183844310000000	2023-11-22 20:52:16	Pending	12806.00	Cash	Pending	29691257		Delivery
93azwwspe	C461039555	SFMA4183844310000000	2023-11-22 20:52:36	Pending	852542.00	Cash	Pending	29691257		Delivery
s3i71i2np	C461039555	SFMA4183844310000000	2023-11-22 20:52:45	Pending	4492542.00	Cash	Pending	29691257		Delivery
\.


--
-- Data for Name: customertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customertable (customerid, customerfirstname, customerlastname, customeremailadress, customerpassword, customercontactnumber, userroleid) FROM stdin;
C720589230	Raizhell	Gutierrez	justmyrgutierrez1@gmail.com	$2b$10$iKmU/wJjf7OuhattT37mEe/cL6tQb99Sttbx79nJSRHuNAGWnEEGC	09073720990	CUS
C461039555	Justmyr	Gutierrez	justmyrgutierrez2@gmail.com	$2b$10$AgAuLh0aa.RDsPVPoPaO1ednIKh5bYQXJS0wuA359OUvRCjE3npaK	09073720112	CUS
\.


--
-- Data for Name: deliverypersontable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliverypersontable (deliverypersonid, deliverypersonfirstname, deliverypersonlastname, deliverypersonemailadress, deliverypersonpassword, deliverypersoncontactnumber, userroleid, branchid) FROM stdin;
\.


--
-- Data for Name: foodmenupricetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodmenupricetable (foodmenupriceid, foodmenuid, foodmenuprice, foodmenucuttype) FROM stdin;
SFMP4713337810000000	66038	13233.00	123123
SFMP6934292310000000	66038	12312.00	123
SFMP8445799410000000	13723	4.00	333
SFMP2621787210000000	96449	444.00	444
SFMP8072861210000000	77598	2.00	31
\.


--
-- Data for Name: foodmenutable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodmenutable (foodmenuid, foodmenuname, foodmenudescription, foodmenucategory, foodmenuimage) FROM stdin;
13723	asd	123123	1231231	foodMenuImage-1700680299809.png
96449	123123123	3123	31	\N
77598	123	23	123123	\N
66038	44	11	31431	foodMenuImage-1700399889088.jpg
\.


--
-- Data for Name: productavailabilitytable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productavailabilitytable (availabilityid, branchid, foodmenuid, available) FROM stdin;
AV2871110000	1	77598	Available
AV6552510000	5	77598	Available
AV2406410000	4	77598	Available
AV1008710000	2	77598	Available
AV6897410000	3	77598	Available
AV7982510000	1	13723	Available
AV1971110000	2	13723	Available
AV8608510000	3	13723	Available
AV1530810000	4	13723	Available
AV5464210000	5	13723	Available
AV3924410000	2	66038	Available
AV798310000	3	66038	Available
AV2721410000	5	66038	Available
AV2431910000	1	66038	Available
AV6368010000	4	66038	Available
AV3179410000	1	96449	Available
AV3595110000	3	96449	Available
AV645010000	2	96449	Available
AV8790210000	5	96449	Available
AV3058010000	4	96449	Available
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


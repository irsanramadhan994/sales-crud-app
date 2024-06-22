
CREATE DATABASE salesdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE salesdb OWNER TO postgres;

\connect salesdb

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
-- TOC entry 216 (class 1259 OID 24984)
-- Name: ProductTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductTypes" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ProductTypes" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24983)
-- Name: ProductTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductTypes_id_seq" OWNER TO postgres;

--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 215
-- Name: ProductTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductTypes_id_seq" OWNED BY public."ProductTypes".id;


--
-- TOC entry 218 (class 1259 OID 24993)
-- Name: Sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sales" (
    id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    quantity integer NOT NULL,
    amount numeric NOT NULL,
    transaction_date timestamp with time zone NOT NULL,
    product_type_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Sales" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24992)
-- Name: Sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Sales_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Sales_id_seq" OWNER TO postgres;

--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 217
-- Name: Sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Sales_id_seq" OWNED BY public."Sales".id;


--
-- TOC entry 3472 (class 2604 OID 24987)
-- Name: ProductTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTypes" ALTER COLUMN id SET DEFAULT nextval('public."ProductTypes_id_seq"'::regclass);


--
-- TOC entry 3473 (class 2604 OID 24996)
-- Name: Sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales" ALTER COLUMN id SET DEFAULT nextval('public."Sales_id_seq"'::regclass);


--
-- TOC entry 3625 (class 0 OID 24984)
-- Dependencies: 216
-- Data for Name: ProductTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductTypes" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Konsumsi	2024-06-21 17:40:59.77+07	2024-06-21 17:40:59.77+07
2	Pembersih	2024-06-21 17:42:50.737+07	2024-06-21 17:42:50.737+07
8	Sikat gigi wqwq	2024-06-22 16:50:14.067+07	2024-06-22 16:50:14.067+07
\.


--
-- TOC entry 3627 (class 0 OID 24993)
-- Dependencies: 218
-- Data for Name: Sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sales" (id, product_name, quantity, amount, transaction_date, product_type_id, "createdAt", "updatedAt") FROM stdin;
2	Tes	1	100	2024-06-21 17:41:09.461+07	1	2024-06-21 17:41:09.461+07	2024-06-21 17:41:09.461+07
16	Tesxx	1	100	2024-06-21 18:57:58.549+07	1	2024-06-21 18:57:58.549+07	2024-06-21 18:57:58.549+07
18	eeeeq	1	2	2024-06-22 17:04:48.184+07	2	2024-06-22 17:04:48.185+07	2024-06-22 17:04:48.185+07
21	rrs	3	4	2024-06-22 17:17:00.103+07	1	2024-06-22 17:17:00.103+07	2024-06-22 17:17:00.103+07
23	hsa	1	100	2024-06-22 18:44:21.982+07	2	2024-06-22 18:44:21.984+07	2024-06-22 18:44:21.984+07
24	qwqwe	1	200	2024-06-22 18:44:40.181+07	1	2024-06-22 18:44:40.181+07	2024-06-22 18:44:40.181+07
25	asc	22	11	2024-06-22 18:46:02.547+07	1	2024-06-22 18:46:02.549+07	2024-06-22 18:46:02.549+07
\.


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 215
-- Name: ProductTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductTypes_id_seq"', 8, true);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 217
-- Name: Sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Sales_id_seq"', 25, true);


--
-- TOC entry 3475 (class 2606 OID 24991)
-- Name: ProductTypes ProductTypes_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTypes"
    ADD CONSTRAINT "ProductTypes_name_key" UNIQUE (name);


--
-- TOC entry 3477 (class 2606 OID 24989)
-- Name: ProductTypes ProductTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTypes"
    ADD CONSTRAINT "ProductTypes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3479 (class 2606 OID 25000)
-- Name: Sales Sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY (id);


--
-- TOC entry 3480 (class 2606 OID 25001)
-- Name: Sales Sales_product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_product_type_id_fkey" FOREIGN KEY (product_type_id) REFERENCES public."ProductTypes"(id) ON UPDATE CASCADE ON DELETE CASCADE;

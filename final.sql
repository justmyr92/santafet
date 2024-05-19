PGDMP  "                    |            sfm    16.0    16.0 ?               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17585    sfm    DATABASE     |   CREATE DATABASE sfm WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
    DROP DATABASE sfm;
                postgres    false            �            1259    17586 
   admintable    TABLE     �  CREATE TABLE public.admintable (
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
    DROP TABLE public.admintable;
       public         heap    postgres    false            �            1259    17591    branchtable    TABLE     %  CREATE TABLE public.branchtable (
    branchid character varying(20) NOT NULL,
    branchname character varying(255),
    branchlocationaddress character varying(255),
    branchlatitude character varying(20),
    branchlongitude character varying(20),
    is_active character varying(255)
);
    DROP TABLE public.branchtable;
       public         heap    postgres    false            �            1259    17596 	   carttable    TABLE     �   CREATE TABLE public.carttable (
    cartid character varying(20) NOT NULL,
    customerid character varying(20),
    foodmenuid character varying(20),
    foodmenupriceid character varying(20),
    quantity integer
);
    DROP TABLE public.carttable;
       public         heap    postgres    false            �            1259    17599    customeraddresstable    TABLE     -  CREATE TABLE public.customeraddresstable (
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
 (   DROP TABLE public.customeraddresstable;
       public         heap    postgres    false            �            1259    17604    customerorderitemtable    TABLE     9  CREATE TABLE public.customerorderitemtable (
    customerorderitemid character varying(20) NOT NULL,
    customerorderid character varying(20),
    foodmenuid character varying(20),
    foodmenupriceid character varying(20),
    customerorderitemquantity integer,
    customerorderitemtotalprice numeric(10,2)
);
 *   DROP TABLE public.customerorderitemtable;
       public         heap    postgres    false            �            1259    17607    customerordertable    TABLE     .  CREATE TABLE public.customerordertable (
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
 &   DROP TABLE public.customerordertable;
       public         heap    postgres    false            �            1259    17612    customertable    TABLE     e  CREATE TABLE public.customertable (
    customerid character varying(20) NOT NULL,
    customerfirstname character varying(255),
    customerlastname character varying(255),
    customeremailadress character varying(255),
    customerpassword character varying(255),
    customercontactnumber character varying(255),
    userroleid character varying(20)
);
 !   DROP TABLE public.customertable;
       public         heap    postgres    false            �            1259    17617    deliverypersontable    TABLE     �  CREATE TABLE public.deliverypersontable (
    deliverypersonid character varying(20) NOT NULL,
    deliverypersonfirstname character varying(255),
    deliverypersonlastname character varying(255),
    deliverypersonemailadress character varying(255),
    deliverypersonpassword character varying(255),
    deliverypersoncontactnumber character varying(255),
    userroleid character varying(20),
    branchid character varying(20)
);
 '   DROP TABLE public.deliverypersontable;
       public         heap    postgres    false            �            1259    17622    foodmenupricetable    TABLE     �   CREATE TABLE public.foodmenupricetable (
    foodmenupriceid character varying(20) NOT NULL,
    foodmenuid character varying(20),
    foodmenuprice numeric(10,2),
    foodmenucuttype character varying(255),
    branchid character varying(20)
);
 &   DROP TABLE public.foodmenupricetable;
       public         heap    postgres    false            �            1259    17625    foodmenutable    TABLE     �   CREATE TABLE public.foodmenutable (
    foodmenuid character varying(20) NOT NULL,
    foodmenuname character varying(255),
    foodmenudescription text,
    foodmenucategory character varying(255),
    foodmenuimage character varying(255)
);
 !   DROP TABLE public.foodmenutable;
       public         heap    postgres    false            �            1259    17630    productavailabilitytable    TABLE     �   CREATE TABLE public.productavailabilitytable (
    availabilityid character varying(20) NOT NULL,
    branchid character varying(20),
    foodmenuid character varying(20),
    available character varying(20)
);
 ,   DROP TABLE public.productavailabilitytable;
       public         heap    postgres    false            �            1259    18029 
   superadmin    TABLE     o  CREATE TABLE public.superadmin (
    superadminid character varying(20) NOT NULL,
    superadminfirstname character varying(255),
    superadminlastname character varying(255),
    superadminemailaddress character varying(255),
    superadminpassword character varying(255),
    superadmincontactnumber character varying(255),
    userroleid character varying(20)
);
    DROP TABLE public.superadmin;
       public         heap    postgres    false            �            1259    17633    userroletable    TABLE     ~   CREATE TABLE public.userroletable (
    userroleid character varying(20) NOT NULL,
    userrolename character varying(255)
);
 !   DROP TABLE public.userroletable;
       public         heap    postgres    false                      0    17586 
   admintable 
   TABLE DATA           �   COPY public.admintable (adminid, adminfirstname, adminlastname, adminemailaddress, adminpassword, admincontactnumber, userroleid, branchid, is_active) FROM stdin;
    public          postgres    false    215   :c                 0    17591    branchtable 
   TABLE DATA           ~   COPY public.branchtable (branchid, branchname, branchlocationaddress, branchlatitude, branchlongitude, is_active) FROM stdin;
    public          postgres    false    216   Wc                 0    17596 	   carttable 
   TABLE DATA           ^   COPY public.carttable (cartid, customerid, foodmenuid, foodmenupriceid, quantity) FROM stdin;
    public          postgres    false    217   td       	          0    17599    customeraddresstable 
   TABLE DATA             COPY public.customeraddresstable (customeraddressid, customerid, customerfullname, customercontactnumber, customerstreet, customerbarangay, customercity, customernotes, customeraddresslabel, customeraddressdefault, addresslatitude, addresslongitude) FROM stdin;
    public          postgres    false    218   �d       
          0    17604    customerorderitemtable 
   TABLE DATA           �   COPY public.customerorderitemtable (customerorderitemid, customerorderid, foodmenuid, foodmenupriceid, customerorderitemquantity, customerorderitemtotalprice) FROM stdin;
    public          postgres    false    219   _e                 0    17607    customerordertable 
   TABLE DATA             COPY public.customerordertable (customerorderid, customerid, customeraddressid, customerorderdate, customerorderstatus, customerordertotalprice, customerorderpaymentmethod, customerorderpaymentstatus, branchid, estimated_delivery_time, order_method) FROM stdin;
    public          postgres    false    220   |e                 0    17612    customertable 
   TABLE DATA           �   COPY public.customertable (customerid, customerfirstname, customerlastname, customeremailadress, customerpassword, customercontactnumber, userroleid) FROM stdin;
    public          postgres    false    221   �e                 0    17617    deliverypersontable 
   TABLE DATA           �   COPY public.deliverypersontable (deliverypersonid, deliverypersonfirstname, deliverypersonlastname, deliverypersonemailadress, deliverypersonpassword, deliverypersoncontactnumber, userroleid, branchid) FROM stdin;
    public          postgres    false    222   �f                 0    17622    foodmenupricetable 
   TABLE DATA           s   COPY public.foodmenupricetable (foodmenupriceid, foodmenuid, foodmenuprice, foodmenucuttype, branchid) FROM stdin;
    public          postgres    false    223   �f                 0    17625    foodmenutable 
   TABLE DATA           w   COPY public.foodmenutable (foodmenuid, foodmenuname, foodmenudescription, foodmenucategory, foodmenuimage) FROM stdin;
    public          postgres    false    224   �f                 0    17630    productavailabilitytable 
   TABLE DATA           c   COPY public.productavailabilitytable (availabilityid, branchid, foodmenuid, available) FROM stdin;
    public          postgres    false    225   �f                 0    18029 
   superadmin 
   TABLE DATA           �   COPY public.superadmin (superadminid, superadminfirstname, superadminlastname, superadminemailaddress, superadminpassword, superadmincontactnumber, userroleid) FROM stdin;
    public          postgres    false    227   �f                 0    17633    userroletable 
   TABLE DATA           A   COPY public.userroletable (userroleid, userrolename) FROM stdin;
    public          postgres    false    226   �g       J           2606    17637    admintable admintable_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_pkey PRIMARY KEY (adminid);
 D   ALTER TABLE ONLY public.admintable DROP CONSTRAINT admintable_pkey;
       public            postgres    false    215            L           2606    17639    branchtable branchtable_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.branchtable
    ADD CONSTRAINT branchtable_pkey PRIMARY KEY (branchid);
 F   ALTER TABLE ONLY public.branchtable DROP CONSTRAINT branchtable_pkey;
       public            postgres    false    216            N           2606    17641    carttable carttable_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_pkey PRIMARY KEY (cartid);
 B   ALTER TABLE ONLY public.carttable DROP CONSTRAINT carttable_pkey;
       public            postgres    false    217            P           2606    17643 .   customeraddresstable customeraddresstable_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public.customeraddresstable
    ADD CONSTRAINT customeraddresstable_pkey PRIMARY KEY (customeraddressid);
 X   ALTER TABLE ONLY public.customeraddresstable DROP CONSTRAINT customeraddresstable_pkey;
       public            postgres    false    218            R           2606    17645 2   customerorderitemtable customerorderitemtable_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_pkey PRIMARY KEY (customerorderitemid);
 \   ALTER TABLE ONLY public.customerorderitemtable DROP CONSTRAINT customerorderitemtable_pkey;
       public            postgres    false    219            T           2606    17647 *   customerordertable customerordertable_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_pkey PRIMARY KEY (customerorderid);
 T   ALTER TABLE ONLY public.customerordertable DROP CONSTRAINT customerordertable_pkey;
       public            postgres    false    220            V           2606    17649     customertable customertable_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_pkey PRIMARY KEY (customerid);
 J   ALTER TABLE ONLY public.customertable DROP CONSTRAINT customertable_pkey;
       public            postgres    false    221            X           2606    17651 ,   deliverypersontable deliverypersontable_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_pkey PRIMARY KEY (deliverypersonid);
 V   ALTER TABLE ONLY public.deliverypersontable DROP CONSTRAINT deliverypersontable_pkey;
       public            postgres    false    222            Z           2606    17653 *   foodmenupricetable foodmenupricetable_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_pkey PRIMARY KEY (foodmenupriceid);
 T   ALTER TABLE ONLY public.foodmenupricetable DROP CONSTRAINT foodmenupricetable_pkey;
       public            postgres    false    223            \           2606    17655     foodmenutable foodmenutable_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.foodmenutable
    ADD CONSTRAINT foodmenutable_pkey PRIMARY KEY (foodmenuid);
 J   ALTER TABLE ONLY public.foodmenutable DROP CONSTRAINT foodmenutable_pkey;
       public            postgres    false    224            ^           2606    17657 6   productavailabilitytable productavailabilitytable_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_pkey PRIMARY KEY (availabilityid);
 `   ALTER TABLE ONLY public.productavailabilitytable DROP CONSTRAINT productavailabilitytable_pkey;
       public            postgres    false    225            b           2606    18035    superadmin superadmin_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (superadminid);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    227            `           2606    17659     userroletable userroletable_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.userroletable
    ADD CONSTRAINT userroletable_pkey PRIMARY KEY (userroleid);
 J   ALTER TABLE ONLY public.userroletable DROP CONSTRAINT userroletable_pkey;
       public            postgres    false    226            c           2606    17660 #   admintable admintable_branchid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);
 M   ALTER TABLE ONLY public.admintable DROP CONSTRAINT admintable_branchid_fkey;
       public          postgres    false    4684    215    216            d           2606    17665 %   admintable admintable_userroleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);
 O   ALTER TABLE ONLY public.admintable DROP CONSTRAINT admintable_userroleid_fkey;
       public          postgres    false    215    4704    226            e           2606    17670 #   carttable carttable_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);
 M   ALTER TABLE ONLY public.carttable DROP CONSTRAINT carttable_customerid_fkey;
       public          postgres    false    221    4694    217            f           2606    17675 #   carttable carttable_foodmenuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);
 M   ALTER TABLE ONLY public.carttable DROP CONSTRAINT carttable_foodmenuid_fkey;
       public          postgres    false    224    217    4700            g           2606    17680 (   carttable carttable_foodmenupriceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_foodmenupriceid_fkey FOREIGN KEY (foodmenupriceid) REFERENCES public.foodmenupricetable(foodmenupriceid);
 R   ALTER TABLE ONLY public.carttable DROP CONSTRAINT carttable_foodmenupriceid_fkey;
       public          postgres    false    4698    217    223            h           2606    17685 9   customeraddresstable customeraddresstable_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customeraddresstable
    ADD CONSTRAINT customeraddresstable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);
 c   ALTER TABLE ONLY public.customeraddresstable DROP CONSTRAINT customeraddresstable_customerid_fkey;
       public          postgres    false    218    4694    221            i           2606    17690 B   customerorderitemtable customerorderitemtable_customerorderid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_customerorderid_fkey FOREIGN KEY (customerorderid) REFERENCES public.customerordertable(customerorderid);
 l   ALTER TABLE ONLY public.customerorderitemtable DROP CONSTRAINT customerorderitemtable_customerorderid_fkey;
       public          postgres    false    220    219    4692            j           2606    17695 =   customerorderitemtable customerorderitemtable_foodmenuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);
 g   ALTER TABLE ONLY public.customerorderitemtable DROP CONSTRAINT customerorderitemtable_foodmenuid_fkey;
       public          postgres    false    4700    219    224            k           2606    17700 B   customerorderitemtable customerorderitemtable_foodmenupriceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_foodmenupriceid_fkey FOREIGN KEY (foodmenupriceid) REFERENCES public.foodmenupricetable(foodmenupriceid);
 l   ALTER TABLE ONLY public.customerorderitemtable DROP CONSTRAINT customerorderitemtable_foodmenupriceid_fkey;
       public          postgres    false    4698    219    223            l           2606    17705 <   customerordertable customerordertable_customeraddressid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_customeraddressid_fkey FOREIGN KEY (customeraddressid) REFERENCES public.customeraddresstable(customeraddressid);
 f   ALTER TABLE ONLY public.customerordertable DROP CONSTRAINT customerordertable_customeraddressid_fkey;
       public          postgres    false    4688    220    218            m           2606    17710 5   customerordertable customerordertable_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);
 _   ALTER TABLE ONLY public.customerordertable DROP CONSTRAINT customerordertable_customerid_fkey;
       public          postgres    false    4694    220    221            o           2606    17720 +   customertable customertable_userroleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);
 U   ALTER TABLE ONLY public.customertable DROP CONSTRAINT customertable_userroleid_fkey;
       public          postgres    false    4704    226    221            p           2606    17725 5   deliverypersontable deliverypersontable_branchid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);
 _   ALTER TABLE ONLY public.deliverypersontable DROP CONSTRAINT deliverypersontable_branchid_fkey;
       public          postgres    false    216    222    4684            q           2606    17730 7   deliverypersontable deliverypersontable_userroleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);
 a   ALTER TABLE ONLY public.deliverypersontable DROP CONSTRAINT deliverypersontable_userroleid_fkey;
       public          postgres    false    226    222    4704            t           2606    18040 6   productavailabilitytable fk_availability_foodmenutable    FK CONSTRAINT     �   ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT fk_availability_foodmenutable FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);
 `   ALTER TABLE ONLY public.productavailabilitytable DROP CONSTRAINT fk_availability_foodmenutable;
       public          postgres    false    225    4700    224            n           2606    17752 /   customerordertable fk_customerordertable_branch    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT fk_customerordertable_branch FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);
 Y   ALTER TABLE ONLY public.customerordertable DROP CONSTRAINT fk_customerordertable_branch;
       public          postgres    false    216    4684    220            r           2606    25949 3   foodmenupricetable foodmenupricetable_branchid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);
 ]   ALTER TABLE ONLY public.foodmenupricetable DROP CONSTRAINT foodmenupricetable_branchid_fkey;
       public          postgres    false    216    223    4684            s           2606    17735 5   foodmenupricetable foodmenupricetable_foodmenuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);
 _   ALTER TABLE ONLY public.foodmenupricetable DROP CONSTRAINT foodmenupricetable_foodmenuid_fkey;
       public          postgres    false    223    4700    224            u           2606    17740 ?   productavailabilitytable productavailabilitytable_branchid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);
 i   ALTER TABLE ONLY public.productavailabilitytable DROP CONSTRAINT productavailabilitytable_branchid_fkey;
       public          postgres    false    216    225    4684            v           2606    17745 A   productavailabilitytable productavailabilitytable_foodmenuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);
 k   ALTER TABLE ONLY public.productavailabilitytable DROP CONSTRAINT productavailabilitytable_foodmenuid_fkey;
       public          postgres    false    225    224    4700                  x������ � �           x�u��j�0��~�$K��kz�Fa�]ܮ�.��5���6x�]d[�������d�}N���h�ec�iʇT�yc���V��^�RTT'N#�A�=��� L:,���a���z���1�s���}.��.��B���CjS#yP�M�s��x�%͵5^��۾�%�v��{��"����#qAQTúx�	��%RK$�������C�ۼ\�$�tB��֕T�(��Q)�;�S����t �=s���K@ ��$�.��o}�u��쁨            x������ � �      	   �   x���1j1��z�:�2�f�Q�bcp�m�l�!�8+����^H�&���5��tz�1%�,~v�� &�p\[��V�_{�Z��|H��P`�=�q>kW���6oi1ۣ[���17���
 ��&����9�>"	�4L���&�?<;����H��}U]̡�Mͫ�����R.�~�}�a�c�V�      
      x������ � �            x������ � �         �   x�m��N�0 �sy�+?���6%ӱ�AM4^
�6X���7jv����8d�!$��t�k�j�X�	[k\(s1�T+�������p}p��.���B,������%q6�x�w���'ͬ�ȇ�F��1�X@�`���9wb ����+�kݩ����a*�r%e�&&����v����2���q?�Dr�K����?��E�R
�w���c�R�            x������ � �            x������ � �            x������ � �            x������ � �         y   x�3�.-H-�tL����,�AL�Ԋ�܂�T���\N�$C�$����`�̐d�0��4W��(3�Ң�� ��p� ��JÌ�"�4���D/�2=NC#cS3sK��7�=... ��#�         /   x�s�t.-.��M-�rt��tL����
q�.-H-R��c���� 4�     
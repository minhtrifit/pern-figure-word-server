-- ----------------------------
-- Create extension
-- ----------------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMIT;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS "carts";
CREATE TABLE "carts" (
	"id" uuid DEFAULT uuid_generate_v4 (),
	"user_email" varchar(100) NOT NULL,
	"order_id" int4 NOT NULL,
	"product_id" int4 NOT NULL,
	"amount" int4 NOT NULL,
	"price" int4 NOT NULL,
	"date" date
)
;

ALTER TABLE "carts" ADD CONSTRAINT "PK_Carts" PRIMARY KEY ("id");

BEGIN;
INSERT INTO "carts" (user_email, order_id, product_id, amount, price, date) VALUES ('testuser123@gmail.com', 15637, 1, 2, 1600000, '2023-03-13');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"email" varchar(100) NOT NULL,
	"password" varchar(255),
	"uid" varchar(255) NOT NULL,
	"display_name" varchar(50) NOT NULL,
	"photo_url" varchar(500),
	"status" boolean NOT NULL,
	"role" varchar(10) NOT NULL
)
;

ALTER TABLE "users" ADD CONSTRAINT "PK_Users" PRIMARY KEY ("email");

BEGIN;
-- INSERT INTO "users" (email, uid, display_name, photo_url, status, role) VALUES ('testuser123@gmail.com', 'abc123', 'user test', '', FALSE, 'user');
-- INSERT INTO "users" (email, password, uid, display_name, status, role) VALUES ('testuser123@gmail.com', '123', 'abc123', 'user test', FALSE, 'user');
COMMIT;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS "posts";
CREATE TABLE "posts" (
	"id" SERIAL,
	"user_email" varchar(100) NOT NULL,
	"product_id" int4 NOT NULL,
	"content" varchar(500) NOT NULL,
	"rating" int4 NOT NULL,
	"date" date
)
;

ALTER TABLE "posts" ADD CONSTRAINT "PK_Posts" PRIMARY KEY ("id");

BEGIN;
INSERT INTO "posts" (user_email, product_id, content, rating, date) VALUES ('testuser123@gmail.com', 1, 'I was so excited to unbox this!', 4, '2023-03-13');
COMMIT;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS "products";
CREATE TABLE "products" (
	"id" int4 NOT NULL,
	"name" varchar(100) NOT NULL,
	"character" varchar(100) NOT NULL,
	"series" varchar(100) NOT NULL,
	"owner" varchar(100) NOT NULL,
	"size" int4 NOT NULL,
	"price" varchar(500) NOT NULL,
	"photo_url" varchar[] NOT NULL
)
;

ALTER TABLE "products" ADD CONSTRAINT "PK_Products" PRIMARY KEY ("id");

BEGIN;
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (1, 'Chainsaw Man Makima', 'Makima', 'Chainsaw Man', 'Good Smile Company', 16, 1600000, ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680770/Figure%20Word/products/1/a_hikvde.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680768/Figure%20Word/products/1/b_xcafia.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680768/Figure%20Word/products/1/c_quwuns.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680768/Figure%20Word/products/1/d_pgag77.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (2, 'A Couple of Cuckoos Erika Amano', 'Erika Amano', 'A Couple of Cuckoos (Kakkou no Iinazuke)', 'Good Smile Company', 17, 1600000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/8/a_rmbdjo.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/8/b_md6bhj.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/8/c_sjdzae.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/8/d_vycsjr.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (3, 'Chainsaw Man Kobeni', 'Kobeni', 'Chainsaw Man', 'Good Smile Company', 16, 1600000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/6/a_bcofki.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/6/b_fwgz40.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/6/c_wk73l1.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/6/d_cyonjh.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (4, 'Chainsaw Man Power', 'Power', 'Chainsaw Man', 'Good Smile Company', 17, 1500000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/4/a_tpiahu.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/4/b_nftkbm.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/4/c_blj34t.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/4/d_a3kcj0.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (5, 'A Couple of Cuckoos Hiro Segawa', 'Hiro Segawa', 'A Couple of Cuckoos (Kakkou no Iinazuke)', 'Good Smile Company', 17, 1600000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/5/a_gclebw.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/5/b_p00v5g.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/5/c_kplnok.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/5/d_lwfbog.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (6, 'My Teen Romantic Comedy SNAFU. Completion Yui Yuigahama', 'Yui Yuigahama', 'My Teen Romantic Comedy SNAFU (Yahari Ore no Seishun Love Come wa Machigatteiru.)', 'Good Smile Company', 16, 1500000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/23/a_k1b6ky.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/23/b_ecwjlg.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/23/c_kdgrub.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/23/d_kpab8d.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (7, 'Ice Queendom Weiss Schnee Nightmare Side', 'Weiss Schnee', 'RWBY', 'Good Smile Company', 17, 1700000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680786/Figure%20Word/products/7/a_pq8qwp.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/7/b_bbeimt.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/7/c_ft6vpc.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/7/d_ue9j2k.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (8, 'Hololive Production Mori Calliope', 'Mori Calliope', '[Virtual YouTuber], Hololive', 'Good Smile Company', 17, 1900000, ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/2/a_jbr1xo.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/2/b_m2nhlj.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/2/c_xc8ses.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/2/d_soxnqi.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (9, 'VShojo Nyatasha Nyanners', 'Nyatasha Nyanners', '[Virtual YouTuber]', 'Good Smile Company', 18, 1600000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680787/Figure%20Word/products/9/a_aerqdx.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680788/Figure%20Word/products/9/b_qnbes6.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680788/Figure%20Word/products/9/c_nfp7ly.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680788/Figure%20Word/products/9/d_mpsanm.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (10, 'Spy x Family Anya Forger', 'Anya Forger(Subject 007)', 'Spy x Family', 'Good Smile Company', 10, 1500000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/10/a_s11bct.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/10/b_uv9qjj.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/10/c_co4d9p.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/10/d_hgfi49.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (11, 'DARLING in the FRANXX Zero Two', 'Zero Two', 'DARLING in the FRANXX', 'Good Smile Company', 17, 1800000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/11/a_pk9lpy.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/11/b_xcvxsn.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/11/c_sizzeg.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/11/d_qvpsgu.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (12, 'Hololive Production Houshou Marine', 'Houshou Marine', '[Virtual YouTuber], Hololive', 'Good Smile Company', 17, 2000000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680777/Figure%20Word/products/12/a_bff1xu.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/12/b_vckm3y.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/12/c_zlc5eh.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/12/d_minidr.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (13, 'Hololive Production Usada Pekora', 'Usada Pekora', '[Virtual YouTuber] , Hololive', 'Good Smile Company', 18, 1980000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/13/a_utex6b.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/13/b_b3b6p0.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680778/Figure%20Word/products/13/c_wkphxt.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/13/d_kek0h7.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (14, 'Danganronpa 1.2 Reload Nagito', 'Nagito Komaeda', 'Danganronpa', 'Good Smile Company', 17, 1700000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/14/a_fsvrus.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/14/b_plfimj.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/14/c_e34bec.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/14/d_ibcpds.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (15, 'Umamusume Pretty Derby Goldship Uniform Ver', 'Goldship', 'Umamusume Pretty Derby', 'Good Smile Company', 18, 1700000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/15/a_fdhhan.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/15/b_wgoyka.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680779/Figure%20Word/products/15/c_p2gpuh.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/15/d_uihfic.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (16, 'Kaguya-sama: Love Is War? Chika Fujiwara', 'Chika Fujiwara', 'Kaguya-sama: Love Is War?', 'Good Smile Company', 17, 1600000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/16/a_hwzfn3.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/16/b_ghgfam.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/16/c_vikmgt.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/16/d_qx2ye5.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (17, 'Umamusume Pretty Derby Tokai Teio School Uniform Ver', 'Tokai Teio', 'Umamusume Pretty Derby', 'Good Smile Company', 16, 1700000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/17/a_jbvjyg.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/17/b_ct5gtj.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/17/c_xxbbcv.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680780/Figure%20Word/products/17/d_bqfzum.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (18, 'Kagura Nana', 'Kagura Nana', '[Virtual YouTuber]', 'Good Smile Company', 16, 2280000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/18/a_pcww8b.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/18/b_ynrld4.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/18/c_fbtxkt.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/18/d_bzavfn.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (19, 'Kaguya-sama: Love Is War Kaguya Shinomiya', 'Kaguya Shinomiya', 'Kaguya-sama: Love Is War', 'Good Smile Company', 17, 1500000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/19/a_omtfc1.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/19/b_v1vckq.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/19/c_bnfjoz.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680781/Figure%20Word/products/19/d_fdbwkh.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (20, 'Nekopara Coconut', 'Coconut', 'Nekopara', 'Good Smile Company', 19, 2100000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/20/a_ijhhbw.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/20/b_aaaksr.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/20/c_fsa8ob.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/20/d_kivlnh.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (21, 'Nekopara Maple', 'Maple', 'Nekopara', 'Good Smile Company', 17, 2350000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/21/a_qtuypj.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/21/b_qrypic.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/21/c_mmel78.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680782/Figure%20Word/products/21/d_k9ga91.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (22, 'My Teen Romantic Comedy SNAFU. Completion Yukino Yukinoshita', 'Yukino Yukinoshita', 'My Teen Romantic Comedy SNAFU (Yahari Ore no Seishun Love Come wa Machigatteiru', 'Good Smile Company', 17, 1500000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/22/a_tuhts3.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/22/b_betawm.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/22/c_bcbq2y.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680783/Figure%20Word/products/22/d_dhgvg3.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (23, 'Chainsaw Man Himeno', 'Himeno', 'Chainsaw Man', 'Good Smile Company', 17, 1600000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/3/a_lc9rar.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/3/b_emscwi.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/3/c_ehafs4.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/3/d_vyhc31.webp']);
INSERT INTO "products" (id, name, character, series, owner, size, price, photo_url) VALUES (24, 'BanG Dream! Girls Band Party! Ran Mitake', 'Ran Mitake', 'BanG Dream! Girls Band Party!', 'Good Smile Company', 17, 1450000,  ARRAY['https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/24/a_kpjswv.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680785/Figure%20Word/products/24/b_vjqj5x.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/24/c_lgtgle.webp','https://res.cloudinary.com/dn2h31tcb/image/upload/v1678680784/Figure%20Word/products/24/d_rvsk2b.webp']);
COMMIT;

-- ----------------------------
-- Foreign key
-- ----------------------------
--ALTER TABLE carts ADD CONSTRAINT FK_Carts_Users FOREIGN KEY (user_email) REFERENCES users (email);
--ALTER TABLE carts ADD CONSTRAINT FK_Carts_Products FOREIGN KEY (product_id) REFERENCES products (id);
--ALTER TABLE posts ADD CONSTRAINT FK_Posts_Users FOREIGN KEY (user_email) REFERENCES users (email);
--ALTER TABLE posts ADD CONSTRAINT FK_Posts_Products FOREIGN KEY (product_id) REFERENCES products (id);
--ALTER TABLE carts DROP CONSTRAINT FK_Carts_Users;
--ALTER TABLE carts DROP CONSTRAINT FK_Carts_Products;
--ALTER TABLE posts DROP CONSTRAINT FK_Posts_Users; 
--ALTER TABLE posts DROP CONSTRAINT FK_Posts_Products;

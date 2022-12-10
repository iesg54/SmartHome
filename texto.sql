
-- inserir casa:
INSERT INTO casa(id, morada) VALUES(1, "Rua Aviacão Naval, Aveiro");

-- inserir utilizadores:
INSERT INTO utilizador(id, email, nome, password, is_admin, id_casa) VALUES (1, "Alberto Matias", "alberto.matias000@gmail.com", "admin", True, 1);
INSERT INTO utilizador(id, email, nome, password, is_admin, id_casa) VALUES (1, "Susana Mendes", "susana.mendes000@gmail.com", "password", False, 1);

-- inserir divisoes na casa:

INSERT INTO divisao(id, nome, id_casa) VALUES (1, "sala", 1);
INSERT INTO divisao(id, nome, id_casa) VALUES (2, "cozinha", 1);
INSERT INTO divisao(id, nome, id_casa) VALUES (3, "exterior", 1);
INSERT INTO divisao(id, nome, id_casa) VALUES (4, "quarto1", 1);
INSERT INTO divisao(id, nome, id_casa) VALUES (5, "quarto2", 1);

--inserir alertas - fica para depois:

INSERT INTO alerta(id, mensagem, sensor, timestamp, valor, id_divisao) VALUES();

-- inserir outros dispostivos, entre eles tomada, lampada, regador e ac:

-- na sala
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (1, 140.03, 1, "tomada1_sala", 1);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (2, 231.11, 1, "tomada2_sala", 1);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (3, 164.82, 0, "lampada1_sala", 1);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (4, 163.58, 0, "lampada2_sala", 1);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (5, 313.74, 0, "ac_sala", 1);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (6, 598.06, 1, "televisao_sala", 1);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (7, 108.29, 1, "aquario_sala", 1);

-- na cozinha:
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (8, 166.39, 1, "tomada1_cozinha", 2);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (9, 151.36, 0, "tomada2_cozinha", 2);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (10, 214.43, 0, "lampada_cozinha", 2);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (11, 205.12, 0, "ac_cozinha", 2);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (12, 261.27, 1, "frigorifico", 2);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (13, 224.62, 0, "microondas", 2);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (14, 461.32, 0, "forno", 2);

-- no exterior
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (15, 252.49, 1, "lampada1_exterior", 3);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (16, 100.1, 0, "regador_jardim", 3);

-- no quarto 1
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (17, 166.12, 1, "tomada1_quarto1", 4);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (18, 160.67, 1, "tomada2_quarto1", 4);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (19, 188.63, 0, "lampada1_quarto1", 4);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (20, 238.63, 1, "ac_quarto1", 4);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (21, 144.84, 0, "computador", 4);

-- no quarto2

insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (22, 156.45, 1, "tomada1_quarto2", 5);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (23, 145.27, 1, "tomada2_quarto2", 5);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (24, 241.31, 0, "lampada1_quarto2", 5);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (25, 188.63, 1, "ac_quarto2", 5);
insert into dispositivo (id, consumo_energy, estado, nome, id_divisao) values (26, 167.34, 0, "televisao_quarto2", 5);

-- inserir tomadas (tipo de dispositivo):

INSERT INTO tomada(tipo, id) VALUES ("EU", 1);
INSERT INTO tomada(tipo, id) VALUES ("EU", 2);
INSERT INTO tomada(tipo, id) VALUES ("EU", 6);
INSERT INTO tomada(tipo, id) VALUES ("EU", 7);
INSERT INTO tomada(tipo, id) VALUES ("EU", 8);
INSERT INTO tomada(tipo, id) VALUES ("EU", 9);
INSERT INTO tomada(tipo, id) VALUES ("EU", 12);
INSERT INTO tomada(tipo, id) VALUES ("EU", 13);
INSERT INTO tomada(tipo, id) VALUES ("EU", 14);
INSERT INTO tomada(tipo, id) VALUES ("EU", 17);
INSERT INTO tomada(tipo, id) VALUES ("EU", 18);
INSERT INTO tomada(tipo, id) VALUES ("EU", 21);
INSERT INTO tomada(tipo, id) VALUES ("EU", 22);
INSERT INTO tomada(tipo, id) VALUES ("EU", 23);
INSERT INTO tomada(tipo, id) VALUES ("EU", 26);

-- inserir lampada (tipo de dispostivo) - luminosidade em percentagem:

INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00", 90,"9:00", 3);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00", 80,"9:00", 4);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00", 75,"9:00", 10);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00", 83,"9:00", 15);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00", 77,"9:00", 19);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00", 97,"9:00", 24);

-- inserir regador (tipo de dispositivo):

INSERT INTO regador(end_time, start_time, id) VALUES ("19:00", "20:00", 16);

-- inserir ac (tipo de dispositivo):

INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (21.2, 30.0, 10.0, 5);
INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (22.5, 31.0, 9.0, 11);
INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (23.5, 30.5, 9.5, 20);
INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (22.7, 31.2, 11.2, 25);



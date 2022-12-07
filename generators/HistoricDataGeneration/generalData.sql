
-- inserir casa:
INSERT INTO casa(morada) VALUES("Rua Aviacão Naval, Aveiro");

-- inserir utilizadores:
INSERT INTO utilizador(email, nome, password, is_admin, id_casa) VALUES ("Alberto Matias", "alberto.matias000@gmail.com", "admin", True, 1);
INSERT INTO utilizador(email, nome, password, is_admin, id_casa) VALUES ("Susana Mendes", "susana.mendes000@gmail.com", "password", False, 1);

-- inserir divisoes na casa:

INSERT INTO divisao(nome, id_casa) VALUES ("sala", 1);
INSERT INTO divisao(nome, id_casa) VALUES ("cozinha", 1);
INSERT INTO divisao(nome, id_casa) VALUES ("exterior", 1);
INSERT INTO divisao(nome, id_casa) VALUES ("quarto1", 1);

--inserir alertas - fica para depois:

INSERT INTO alerta(sensor, stamp, valor, id_divisao) VALUES("temperatura", "2022-12-13 23:53:00", 100, 2);

-- inserir outros dispostivos, entre eles tomada, lampada, regador e ac:

-- na sala
insert into dispositivo (consumo_energy, estado, id_divisao) values (140.03, 1, 1);
insert into dispositivo (consumo_energy, estado, id_divisao) values (231.11, 1, 1);
insert into dispositivo (consumo_energy, estado, id_divisao) values (164.82, 0, 1);
insert into dispositivo (consumo_energy, estado, id_divisao) values (163.58, 0, 1);
insert into dispositivo (consumo_energy, estado, id_divisao) values (313.74, 0, 1);
insert into dispositivo (consumo_energy, estado, id_divisao) values (598.06, 1, 1);
insert into dispositivo (consumo_energy, estado, id_divisao) values (108.29, 1, 1);

-- na cozinha:
insert into dispositivo (consumo_energy, estado, id_divisao) values (166.39, 1, 2);
insert into dispositivo (consumo_energy, estado, id_divisao) values (151.36, 0, 2);
insert into dispositivo (consumo_energy, estado, id_divisao) values (214.43, 0, 2);
insert into dispositivo (consumo_energy, estado, id_divisao) values (205.12, 0, 2);
insert into dispositivo (consumo_energy, estado, id_divisao) values (261.27, 1, 2);
insert into dispositivo (consumo_energy, estado, id_divisao) values (224.62, 0, 2);
insert into dispositivo (consumo_energy, estado, id_divisao) values (461.32, 0, 2);

-- no exterior
insert into dispositivo (consumo_energy, estado, id_divisao) values (252.49, 1, 3);
insert into dispositivo (consumo_energy, estado, id_divisao) values (100.1, 0, 3);

-- no quarto 1
insert into dispositivo (consumo_energy, estado, id_divisao) values (166.12, 1, 4);
insert into dispositivo (consumo_energy, estado, id_divisao) values (160.67, 1, 4);
insert into dispositivo (consumo_energy, estado, id_divisao) values (188.63, 0, 4);
insert into dispositivo (consumo_energy, estado, id_divisao) values (238.63, 1, 4);
insert into dispositivo (consumo_energy, estado, id_divisao) values (144.84, 0, 4);

-- inserir tomadas (tipo de dispositivo):

INSERT INTO tomada(tipo, id) VALUES ("Máquina aeróbica", 1);
INSERT INTO tomada(tipo, id) VALUES ("PlayStation 5", 2);
INSERT INTO tomada(tipo, id) VALUES ("Televisão LG OLED", 6);
INSERT INTO tomada(tipo, id) VALUES ("Aquário", 7);
INSERT INTO tomada(tipo, id) VALUES ("Frigorifico", 8);
INSERT INTO tomada(tipo, id) VALUES ("Microondas", 9);
INSERT INTO tomada(tipo, id) VALUES ("Máquina de Café", 12);
INSERT INTO tomada(tipo, id) VALUES ("Tostadeira", 13);
INSERT INTO tomada(tipo, id) VALUES ("Forno", 14);
INSERT INTO tomada(tipo, id) VALUES ("Ecrã", 17);
INSERT INTO tomada(tipo, id) VALUES ("Televisão", 18);
INSERT INTO tomada(tipo, id) VALUES ("Computador", 21);


-- inserir lampada (tipo de dispostivo) - luminosidade em percentagem:

INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00:00", 90,"09:00:00", 3);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00:00", 80,"09:00:00", 4);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00:00", 75,"09:00:00", 10);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00:00", 83,"09:00:00", 15);
INSERT INTO lampada(end_time, luminosidade, start_time, id) VALUES ("18:00:00", 77,"09:00:00", 19);

-- inserir regador (tipo de dispositivo):

INSERT INTO regador(end_time, start_time, id) VALUES ("19:00:00", "20:00:00", 16);

-- inserir ac (tipo de dispositivo):

INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (21.2, 30.0, 10.0, 5);
INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (22.5, 31.0, 9.0, 11);
INSERT INTO ac(t_atual, t_max, t_min, id) VALUES (23.5, 30.5, 9.5, 20);


-- inserir sensors

INSERT INTO sensors(tipo, id_div) VALUES ("temperatura", 1);
INSERT INTO sensors(tipo, id_div) VALUES ("humidade", 2);
INSERT INTO sensors(tipo, id_div) VALUES ("ar", 3);
INSERT INTO sensors(tipo, id_div) VALUES ("temperatura", 1);
INSERT INTO sensors(tipo, id_div) VALUES ("humidade", 2);
INSERT INTO sensors(tipo, id_div) VALUES ("ar", 3);
INSERT INTO sensors(tipo, id_div) VALUES ("temperatura", 1);
INSERT INTO sensors(tipo, id_div) VALUES ("humidade", 2);
INSERT INTO sensors(tipo, id_div) VALUES ("ar", 3);
INSERT INTO sensors(tipo, id_div) VALUES ("temperatura", 1);
INSERT INTO sensors(tipo, id_div) VALUES ("humidade", 2);
INSERT INTO sensors(tipo, id_div) VALUES ("ar", 3);



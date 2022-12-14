create trigger sensor_trigger after insert
on divisao for each row
begin
    insert into sensors(generator_type, division_id) values (1, NEW.id);
    insert into sensors(generator_type, division_id) values (2, NEW.id);
end;


INSERT INTO divisao(nome, id_casa, tipo) values ("teste", 1, "SALA");
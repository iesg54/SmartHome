Para correrem a base de dados correta:

1. Criem a base de dados no vosso computador através do SQL dump (na pasta database)
2. Criem um utilizador com o nome "springuser" e pass "password"
     ``` $ create user 'springuser'@'%' identified by 'password'; ``` 
3. Dar permissões de edição da tabela ao novo utilizador
   ``` $ grant all on SmartHome.* to 'springuser'@'%'; ```

Para ligar á api:
Se pedir login, fazer com os dados user = user e password = pass

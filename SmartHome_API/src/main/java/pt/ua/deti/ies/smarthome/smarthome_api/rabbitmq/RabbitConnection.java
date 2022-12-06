package pt.ua.deti.ies.smarthome.smarthome_api.rabbitmq;

import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.springframework.context.annotation.Bean;

public class RabbitConnection {
    
    Logger log = Logger.getLogger(RabbitConnection.class.getName());
    private Connection conn;
    private Channel channel;

    @Bean
    public void connect(){

        // sao valores default, podem ter de ser alterados depois
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUsername("guest");
        factory.setPassword("guest");
        factory.setVirtualHost("/");
        factory.setHost("localhost");
        factory.setPort(56781);

        try {
            conn = factory.newConnection();
            channel = conn.createChannel();
        } catch (IOException e) {
            log.log(Level.WARNING, "Couldn't connect to RabbitMQ");
            e.printStackTrace();
        } catch (TimeoutException e) {
            log.log(Level.WARNING, "Connection to RabbitMQ timed out");
            e.printStackTrace();
        }

        
    }

    public void disconnect() throws IOException, TimeoutException{
        //shoud we implement something to deal with errors?
        channel.close();
        conn.close();
    }
}

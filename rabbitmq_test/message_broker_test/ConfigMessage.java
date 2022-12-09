package pt.ua.deti.ies.smarthome.smarthome_api.message_broker_test;

import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ConfigMessage {
    
    public static final String QUEUE_NAME = "UserQueue";
    public static final String NAME_EXCHANGE = "ExchangeUser";
    public static final String ROUTING_KEY = "CreateUser";

    @Bean
    DirectExchange userExchange() {
        return new DirectExchange(NAME_EXCHANGE);
    }

    @Bean
    Queue queue(){
        return QueueBuilder.durable(QUEUE_NAME).build();
    }

    @Bean 
    Binding binding(){
        return BindingBuilder.bind(queue()).to(userExchange()).with(ROUTING_KEY);
    }



}

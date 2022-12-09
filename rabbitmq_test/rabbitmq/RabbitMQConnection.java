package pt.ua.deti.ies.smarthome.smarthome_api.rabbitmq;

import org.springframework.stereotype.Component;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;

@Component
public class RabbitMQConnection {

    private static final String NOME_EXCHANGE = "amq.direct";
    
    private Queue fila(String fila){
        return new Queue(fila, true, false, false);
    }

    private DirectExchange funExchange(String exchange){
        return new DirectExchange(exchange);
    }


    private Binding relationship(Queue fila, DirectExchange troca){
        return new Binding(fila.getName(), Binding.DestinationType.QUEUE, troca.getName(), fila.getName(), null);
    }

    private void add(String fila){
        //to be finnished
    }

    


}

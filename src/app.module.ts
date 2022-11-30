import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { HealthyController } from './healthy.controller';
import { KafkaClientProxy } from './injector.tokens';
import { UnhealthyController } from './unhealthy.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KafkaClientProxy,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [HealthyController, UnhealthyController],
})
export class AppModule implements OnModuleInit {
  private readonly clientProxy: ClientProxy;

  constructor(@Inject(KafkaClientProxy) clientProxy: ClientProxy) {
    this.clientProxy = clientProxy;
  }

  async onModuleInit(): Promise<void> {
    await this.clientProxy.emit('event', {
      message: 'Hello, world!',
    });
  }
}

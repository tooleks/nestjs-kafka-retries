import { Controller, UseFilters } from '@nestjs/common';
import {
  EventPattern,
  KafkaRetriableException,
  Payload,
} from '@nestjs/microservices';
import { AllExceptionsFilter } from './all-exceptions.filter';

@Controller()
export class UnhealthyController {
  @UseFilters(new AllExceptionsFilter())
  @EventPattern('event')
  async handle(@Payload() payload): Promise<void> {
    console.log(
      `The event "${payload.message}" has been received by the unhealthy controller.`,
    );

    throw new KafkaRetriableException(
      'The retriable exception has occurred in the unhealthy controller.',
    );
  }
}

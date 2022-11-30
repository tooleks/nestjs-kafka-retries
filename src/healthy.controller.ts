import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AllExceptionsFilter } from './all-exceptions.filter';

@Controller()
export class HealthyController {
  @UseFilters(new AllExceptionsFilter())
  @EventPattern('event')
  async handle(@Payload() payload): Promise<void> {
    console.log(
      `The event "${payload.message}" has been received by the healthy controller.`,
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    console.log(
      `The event "${payload.message}" has been processed by the healthy controller.`,
    );
  }
}

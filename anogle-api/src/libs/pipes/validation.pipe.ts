import { ValidationPipe, BadRequestException } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const validationErrors = errors.flatMap((error) => Object.values(error.constraints));
    return new BadRequestException(`check this value.\n${validationErrors.join('\n')}`, {
      description: 'Validation Error.',
    });
  },
});

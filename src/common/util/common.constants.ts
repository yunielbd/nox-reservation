import { ValidationPipeOptions } from "@nestjs/common";

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  };

export const DEFAULT_PAGE_SIZE = {
    CLIENT: 10,
    ORDER: 20,
    RESTAURANT: 5,
  } as const satisfies Record<string, number>;
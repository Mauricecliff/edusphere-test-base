import { Reflector } from "@nestjs/core";

export const AllowedOrigins=Reflector.createDecorator<Array<string>>();
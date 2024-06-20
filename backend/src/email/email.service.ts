import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto';

@Injectable()
export class EmailService {

    async send(payload:SendEmailDTO){
        
    }
}

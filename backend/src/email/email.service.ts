import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
@Injectable()
export class EmailService {
    host: string=this.configService.get("EMAIL_SERVER")
    port: string=this.configService.get("EMAIL_PORT")
    username: string=this.configService.get("EMAIL_USERNAME")
    password: string=this.configService.get("EMAIL_PASSWORD")
    /**/transporter= nodemailer. createTransport({
            host:this.host,
            port:465,
            secure:true,
            auth:{
                user:this.username,
                password:this.password
            }
        } as SMTPTransport.Options)
    constructor(private configService: ConfigService){  }
    async verifyConnection(){
        let transporter= nodemailer. createTransport({
            host:this.host,
            port:465,
            secure:true,
            auth:{
                user:this.username,
                pass:this.password
            }
        } as SMTPTransport.Options)
        console.log(await transporter.verify())
    }
    async send(payload:SendEmailDTO){
        const info = await this.transporter.sendMail({
          from:payload.from?? 'edusphere@datrisoft.com',
          to: payload.to,
          subject:payload.subject,
          html: payload.body,
        });
        console.log({info})
        return true
    }
}

import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { ConfigsService } from '@configs';

@Injectable()
export class NodeMailer {
  private transporter: nodeMailer.Transporter;

  constructor(private readonly configsService: ConfigsService) {
    this.transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.email',
      service: 'gmail',
      port: 587,
      auth: {
        user: this.configsService.googleAuth.email,
        pass: this.configsService.googleAuth.password,
      },
    });
  }

  async sendEmail({ to, text }: { to: string; text: string }) {
    await this.transporter.sendMail({
      from: this.configsService.googleAuth.email,
      to,
      subject: '우리들의 암장 회원가입 인증번호입니다.',
      text,
    });
  }
}

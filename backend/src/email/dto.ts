export type SendEmailDTO={
    from?: string;
    to: string|string[];
    body: string;
    subject: string;
}
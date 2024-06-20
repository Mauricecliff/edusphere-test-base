import { EmailJob } from 'src/utils/job_list';

export type SendWelcomeAndUserVerificationEmailPayload = {
  jobName: EmailJob.SendWelcomeAndUserVerificationEmailToStudent;
  email: string;
  student_id: string;
  context?: string;
};

export type SendVerificationEmailPayload = {
  jobName: EmailJob.SendVerificationEmail;
  email: string;
  context?: string;
};


export type SendPasswordRecoveryEmailPayload = {
  jobName: EmailJob.SendPasswordRecoveryEmail;
  email: string;
  context?: string;
};

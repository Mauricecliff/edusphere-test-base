export type AccountUserCreatedPayload = {
  event_name:"AccountCreated";
  email: string;
  account_type: "STUDENT"|"SUPER_ADMIN"
  student_id: string;
  time_created: string; //Must be ISO String
};

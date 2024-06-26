export type AccountCreated={
  event_name:"AccountCreatedByUpload";
  event_type:"AccountCreated";
}

export type AccountUserCreatedBySelfPayload = {
    event_name:"AccountCreatedBySelf";
    event_type:"AccountCreated";
    email: string;
    last_name: string;
    first_name: string;
    account_type:string;
    student_id?: string;
    time_created: string; //Must be ISO String
  };

  export type AccountUserCreatedByUploadPayload = {
    event_name:"AccountCreatedByUpload";
    event_type:"AccountCreated";
    email: string;
    last_name: string;
    first_name: string;
    password: string;
    uploader_id: string;
    student_id: string;
    account_type: "STUDENT"|"ADMIN"|"SUPER_ADMIN"
    time_created: string; //Must be ISO String
  };
  
export const postUserUploadTemplate = ({
  firstName,
  email,
  password,
}: {
  firstName: string;
  email: string;
  password: string;
}) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
</head>
<body>
    <p>Dear ${firstName},</p>

    <p>Welcome to <strong>Edusphere</strong>!</p>

    <p>We are excited to have you join our community. Below are your initial login credentials. Please use them to access your account and start exploring our services:</p>

    <p><strong>Username:</strong> ${email}<br>
    <strong>Password:</strong>${password}</p>

    <p>For security purposes, we highly encourage you to log in and change your password immediately. Here’s how you can do it:</p>

    <ol>
        <li>Log in to your account using the credentials provided above.</li>
        <li>Navigate to the 'Account Settings' section.</li>
        <li>Select 'Change Password' and follow the prompts to set a new, secure password.</li>
    </ol>

    <p>If you encounter any issues during the process, feel free to reach out to our support team at <a href="mailto:[Support Email]">[Support Email]</a> or call us at [Support Phone Number].</p>

    <p>We're here to help and ensure you have a smooth start. Welcome aboard!</p>

    <p>Best regards,</p>

    <p>[Your Full Name]<br>
    [Your Position]<br>
    Edusphere<br>
    [Contact Information]</p>
</body>
</html>

    `;
};

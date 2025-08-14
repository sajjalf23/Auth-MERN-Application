export const EMAIL_VERIFY_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      color: #333333;
    }
    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.5;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #2E86DE;
      text-align: center;
      margin: 20px 0;
      letter-spacing: 4px;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 12px 24px;
      background-color: #2E86DE;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      text-align: center;
      margin-top: 30px;
    }
    @media screen and (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 15px;
      }
      .otp {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1> Auth MERN App </h1>
    </div>
    <div class="content">
      <p>Hello ,</p>
      <p>Hi, please verify your account using the OTP below</p>

      <!-- OTP Example -->
      <div class="otp">{{otpCode}}</div>

      <!-- Or for password reset / email verification -->

      <p>If you didn’t request this, please ignore this email.</p>
      <p>Thank you,<br> Auth MERN APP </p>
    </div>
    <div class="footer">
      &copy; 2025 Auth MERN App. All rights reserved.
    </div>
  </div>
</body>
</html>
`

export const PASSWORD_RESET_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> RESET PASSWORD </title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      color: #333333;
    }
    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.5;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #2E86DE;
      text-align: center;
      margin: 20px 0;
      letter-spacing: 4px;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 12px 24px;
      background-color: #2E86DE;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      text-align: center;
      margin-top: 30px;
    }
    @media screen and (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 15px;
      }
      .otp {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1> Auth MERN App </h1>
    </div>
    <div class="content">
      <p>Hello ,</p>
      <p> Reset Your password using the OTP given below </p>

      <!-- OTP Example -->
      <div class="otp">{{otpCode}}</div>

      <!-- Or for password reset / email verification -->

      <p>If you didn’t request this, please ignore this email.</p>
      <p>Thank you,<br> Auth MERN APP </p>
    </div>
    <div class="footer">
      &copy; 2025 Auth MERN App. All rights reserved.
    </div>
  </div>
</body>
</html>
`



export const REGISTER_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> REGISTERED EMAIL </title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      color: #333333;
    }
    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.5;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #2E86DE;
      text-align: center;
      margin: 20px 0;
      letter-spacing: 4px;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 12px 24px;
      background-color: #2E86DE;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      text-align: center;
      margin-top: 30px;
    }
    @media screen and (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 15px;
      }
      .otp {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1> Auth MERN App </h1>
    </div>
    <div class="content">
      <p>Hello ,</p>
      <p> WELCOME TO AUTHENTICATION APP ! . Your account has been created using this email </p>

      <!-- OTP Example -->
      <div class="otp">{{email}}</div>

      <!-- Or for password reset / email verification -->

      <p>If you didn’t request this, please ignore this email.</p>
      <p>Thank you,<br> Auth MERN APP </p>
    </div>
    <div class="footer">
      &copy; 2025 Auth MERN App. All rights reserved.
    </div>
  </div>
</body>
</html>
`
// signup.js

export const signupFields = [
  {
    name: "UserName",
    label: "UserName",
    type: "text",
    className: "inputfield2",
    rules: {
      required: "UserName is required",
      minLength: {
        value: 5,
        message: "Min Length must be at least 3 characters",
      },
      maxLength: {
        value: 50,
        message: "Min Length must not exceed 50 characters",
      },
    },
  },

  {
    name: "Email",
    label: "Email",
    type: "email",
    className: "inputfield2",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
      minLength: {
        value: 5,
        message: "Email must be at least 5 characters",
      },
      maxLength: {
        value: 50,
        message: "Email must not exceed 50 characters",
      },
    },
  },

  {
    name: "PhoneNumber",
    label: "PhoneNumber",
    type: "tel",
    className: "inputfield2",
    rules: {
      required: "Phone Number is required",
    },
  },

  {
    name: "Password",
    label: "Password",
    type: "password",
    className: "inputfield2",
    rules: {
      required: "Enter a Valid FirstName",
      minLength: {
        value: 3,
        message: "Min Len Must be 3 characters",
      },
      maxLength: {
        value: 50,
        message: "Max Len Must be inside 50",
      },
    },
  },
];

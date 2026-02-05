// loginFields.js
export const loginFields = [
  {
    name: "UserName",
    label: "User Name",
    type: "text",
    placeholder: "Enter username",
    // className:"inputfield2",
    rules: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Minimum 3 characters"
      },
      maxLength:{
        value:50,
        message:"Maximum username value is 50 characters"
      }
    },
    className:"inputfield2"
  },
  {
    name: "Password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    //  className:"inputfield2",
    rules: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Minimum 6 characters"
      }
    },
      className:"inputfield2"
  }
];

// constants/userDetailsFields.js
export const USER_DETAILS_FIELDS = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    className: "inputfield2",
   
  },
  {
    name: "UserName",
    label: "User Name",
    type: "text",
    className: "inputfield2",
   
  },
  {
    name: "Email",
    label: "Email",
    type: "email",
    className: "inputfield2",
  
  },
  {
    name: "PhoneNumber",
    label: "Phone Number",
    type: "tel",
    className: "inputfield2"
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    className: "inputfield2",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" }
    ],
  
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    className: "inputfield2"
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    className: "inputfield2"
  },
  {
    name: "zip",
    label: "Zip Code",
    type: "text",
    className: "inputfield2"
  },
  {
    name: "state",
    label: "State",
    type: "text",
    className: "inputfield2"
  }
];

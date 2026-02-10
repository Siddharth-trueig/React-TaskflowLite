import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../../../Common/Form/Input";
import { loginFields } from "../Constants/loginFields";

const Login2 = ({
  handleSubmit,
  HandleClick,
  onSubmit,
  control,
  // formState
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginFields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: rhfField, fieldState }) => (
              <Input
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={rhfField.value || ""}
                onChange={rhfField.onChange}
                onBlur={rhfField.onBlur}
                error={fieldState.error}
                className={field.className}
              />
            )}
          />
        ))}
        {/* <div > */}
        <a
          href="/"
          className="flex justify-center underline mt-2 hover:text-blue-600  "
        >
          Forgot Your Password?
        </a>

        {/* </div> */}

        <button
          type="submit"
          className="flex justify-center items-center mx-auto LoginBtn mt-[7rem] rounded-md"
        >
          Login <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </form>

      <div className="notAccount flex justify-center mt-6">
        <span className="notAccountLft"> Don't Have an Account?</span>

        <a
          className="notAccountRgt underline ml-1  hover:text-blue-600 hover:cursor-pointer"
          onClick={HandleClick}
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login2;

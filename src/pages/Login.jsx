import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
function Login() {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (data) => {
    if (data.Email === "test@gmail.com" && data.Password === "123456") {
      localStorage.setItem("token", "fake-token");
      window.location.href = "/dashboard";
    } else {
      alert("EROOOOR");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-slate-300 rounded-md m-auto mt-40 p-6 "
      >
        <div className="grid justify-start items-center w-full">
          <label className="mr-4 mb-2">Email :</label>
          <input
            {...register("Email")}
            className="w-80 justify-center bg-gray-200 text-black px-4 py-2 rounded-md mb-4 "
            type="text"
            placeholder=" your Email..."
          />
          <label className="mr-4 mb-2">Password :</label>
          <input
            {...register("Password")}
            className="w-full justify-center bg-gray-200 text-black px-4 py-2 rounded-md mb-4 "
            type="password"
            placeholder=" type a password"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
}

export default Login;

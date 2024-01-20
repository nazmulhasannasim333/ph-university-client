import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button } from "antd";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123456",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("logging in...");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;

"use client";
import { app } from "../../../constants/firebase";
import { getAuth } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: yupResolver(schema) }); //Form type is SignUpForm
  const auth = getAuth(app);
  const [createUserWithEmailAndPassword, reguser, leading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  //custom hook
  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const { email, password } = data;
    await createUserWithEmailAndPassword(email, password);
    router.push("/auth/2factor");
  };

  useEffect(() => {
    if(error){
      console.log(error)
    }
  }, [error])

  return (
    <section className="bg-white ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-black"
        >
          <AssignmentIndOutlinedIcon className="w-10 h-10 mr-2 text-secondary" />
          DUTCH
        </a>
        <div className="w-center bg-secondary rounded-lg shadow ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl">
              Sign up for an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className="bg-black-50 border border-black-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                />
                <p>{errors.email?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
                <p>{errors.password?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-black-900 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
                <p>{errors.confirmPassword?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-black  "
              >
                Sign up
              </button>
              <p className="text-sm font-light text-black-500 ">
                Already have an account?{" "}
                <Link
                  href="/auth/"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

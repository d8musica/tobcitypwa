import { Fragment } from "react";
import Link from "next/link";
import LoginFace from "../static/login/loginfacebook.png";
import LoginGoogle from "../static/login/logingoogle.png";
import LoginCell from "../static/login/login-celular.png";

function Login() {
  return (
    <Fragment>
      <div className="accessbtn">
        <Link href="/auth">
          <img src={LoginCell} alt="Ingreso con celular " />
        </Link>
        <Link href="/auth/oauth/facebook">
          <img src={LoginFace} alt="Ingreso con facebook" />
        </Link>
        <Link href="/auth/oauth/google">
          <img src={LoginGoogle} alt="Ingreso con google" />
        </Link>
      </div>
      <style scoped>
        {`
          .accessbtn img {
            width: 100%;
            cursor: pointer;
          }
        `}
      </style>
    </Fragment>
  )
}

export default Login
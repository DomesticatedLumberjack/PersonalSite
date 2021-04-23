import React, { useState } from "react";
import { Button, Form, Jumbotron } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { IUserFormValues } from "../../app/Domain/IUserFormValues";
import { useStore } from "../../app/Stores/store";

interface ILoginFormContents{
  email: string,
  password: string
}

const Login: React.FC = () => {
  const history = useHistory();

  const [formContents, setLogin] = useState<ILoginFormContents>({
    email: "",
    password: "",
  });

  const {accountStore} = useStore();
  const {loginUser, loadingLogin} = accountStore;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const loginFormValues: IUserFormValues = {
      email: formDataObj.email.toString(),
      password: formDataObj.password.toString()
    }

    await loginUser(loginFormValues).then(() => history.push("/admin"));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setLogin({ ...formContents, [name]: value });
  };

  return (
    <Jumbotron style={{backgroundColor: "#FFFFFF"}}>
      <h1>Login</h1>
      <ul/>
      <Form id="loginForm" onSubmit={handleSubmit}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type="text"
          name="email"
        />
        <ul/>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type="password"
          autoComplete="on"
          name="password"
        />
        <ul/>
        <Button type="submit" disabled={loadingLogin}>Login</Button>
      </Form>
    </Jumbotron>
  );
};

export default withRouter(Login);
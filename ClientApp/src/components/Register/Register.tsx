import React, { useState } from "react";
import { Button, Form, Jumbotron } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IUserFormValues } from "../../app/Domain/IUserFormValues";
import { useStore } from "../../app/Stores/store";

interface IRegisterFormContents {
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
};

export const Register: React.FC = () => {
  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [formContents, setLogin] = useState<IRegisterFormContents>({
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  });

  const {accountStore} = useStore();
  const {registerUser} = accountStore;

  const handleSubmit = async (e: any) => {
    if(formContents.password === formContents.passwordConfirm){
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());

      const userFormValues: IUserFormValues = {
        email: formDataObj.email.toString(),
        password: formDataObj.password.toString(),
        displayName: formDataObj.username.toString(),
        username: formDataObj.username.toString().toLowerCase()
      }

      await registerUser(userFormValues).then(() => history.push('/'));
    }
  };

  const handleInputChange = (e: any) => {
    const {name, value} = e.currentTarget;
    setLogin({ ...formContents, [name]: value });
  };

  const handleValidation = (e: any) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false){
        e.stopPropagation();
    }
    setValidated(true);
  }

  return (
    <Jumbotron style={{backgroundColor: "#FFFFFF"}}>
      <h1>Register User</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit} onChange={handleValidation}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          placeholder="Email"
          required
        />
        <ul/>
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="username"
          placeholder="Username"
          required
        />
        <ul/>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="password"
          placeholder="Password"
          type="password"
          autoComplete="on"
          required
        />
        <ul/>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          name="passwordConfirm"
          placeholder="Password Confirmation"
          type="password"
          autoComplete="on"
          required
        />
        <ul/>
        <Button type="submit">Login</Button>
      </Form>
    </Jumbotron>
  );
};

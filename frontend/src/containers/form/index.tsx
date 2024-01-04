import SignIn from "../../components/buttons/signIn";
import Input from "../../components/input";
import { Container, FormStyle } from "./styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../services/api";
import { selectCurrentUser, setCredentials } from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.access_token) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          access_token: user.access_token,
          role: user.role,
        }),
        navigate("/home")
      );

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <Container>
      <h1>Delliv</h1>
      <FormStyle onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SignIn type="submit" />
      </FormStyle>
    </Container>
  );
};

export default Form;

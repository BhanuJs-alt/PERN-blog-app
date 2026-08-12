import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "./auth.repository.ts";
import { RegisterData, LoginData } from "../../types/auth.types.ts";
import { createToken } from "../../utils/jwt.ts";

export const register = async (data: RegisterData) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exist");
  }
  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );

  const newUser = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
  const token = createToken(newUser.id);
  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};
export const login = async (data: LoginData) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = createToken(user.id);
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

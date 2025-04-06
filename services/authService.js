const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
};

const loginUser = async (username, password) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('Usuário não encontrado');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error('Senha incorreta');

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  return { token };
};

module.exports = { registerUser, loginUser };
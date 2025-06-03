# 💰 Alume Finance App

Sistema completo de **simulação de financiamentos**, com:

- Autenticação JWT
- Edição de perfil
- Dashboard com gráficos
- Histórico com filtros
- Modo claro/escuro

Desenvolvido em **React** no frontend e **NestJS com Prisma** no backend.

---

## 📦 Estrutura do Projeto

```bash
alume-finance-app/
├── backend/
│   ├── src/
│   └── .env.example
├── frontend/
│   ├── src/
│   └── .env.example
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como Executar Localmente

### 🔧 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📝 Passo a Passo

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/alume-finance-app.git
cd alume-finance-app
```

2. Crie os arquivos de ambiente:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Suba os containers:

```bash
docker-compose up --build
```

4. Acesse os serviços:

- 🌐 Frontend: [http://localhost:5173](http://localhost:5173)
- 🛠️ Backend: [http://localhost:3000/api](http://localhost:3000/api)
- 🗄️ Banco de dados (PgAdmin): [http://localhost:5050](http://localhost:5050)

---

## ⚙️ Variáveis de Ambiente

### 📁 Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

### 📁 Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://postgres:mysecretpassword@db:5432/alume?schema=public
JWT_SECRET=mysecret
JWT_EXPIRES_IN=300s
```

---

## 🖥️ Imagens do sistema

## 🖥️ Cadastro

![Cadastro](/assets/cadastro.gif)

## 🖥️ Login

![Login](/assets/login.gif)

## 🖥️ Edição

![Alteração dos dados](/assets/edicao-estudante.gif)

## 🖥️ Gráfico

![Gráfico](/assets/graph.gif)

## 🖥️ Filtro

![Filtro da tabela](/assets/filtro.gif)

## 🖥️ Simulação

![Simulação](/assets/simulacao.gif)

## 💡 Tecnologias Utilizadas

### 🖥️ Frontend

- React + Vite
- TailwindCSS
- React Hook Form
- React Router DOM
- ApexCharts
- React Toastify

### 🧠 Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Docker

---

## 👨‍💼 Autor

Desenvolvido por **Michael Patrick**

- GitHub: [@mrosa16](https://github.com/mrosa16)
- LinkedIn: [linkedin.com/in/michael-patrick-aaab0572](https://www.linkedin.com/in/michael-patrick-aaab0572/)

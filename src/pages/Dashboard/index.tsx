import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";
import { Title, Form, Repositories , Error } from "./style";
import Repository from "../Repository";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const logo: string =
  "https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg";

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Digite autor/nome do repositório");
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setInputError("");
      setNewRepo("");
    } catch (error) {
      setInputError("Erro na busca do repositório");
    }
  }
  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Dashboard</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e): void => setNewRepo(e.target.value)}
          type="Digite o nome do repositório"
          placeholder="Digite aqui o repositório"
        />
        <button>Pesquisar</button>
      </Form>
      {inputError && ( <Error>{inputError}</Error>)}

      <Repositories>
        {repositories.map((repo) => (
          <a key={repo.full_name} href="https://localhost:3333">
            <img src={repo.owner.avatar_url} alt="Profile" />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

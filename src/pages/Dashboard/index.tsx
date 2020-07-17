import React, { useState, useEffect, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { Title, Form, Repositories, Error } from "./style";

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
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepos = localStorage.getItem("@gitexplorer:repositories");
    if (storagedRepos) {
      return JSON.parse(storagedRepos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "@gitexplorer:repositories",
      JSON.stringify(repositories)
    );
  }, [newRepo]);

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

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e): void => setNewRepo(e.target.value)}
          type="Digite o nome do repositório"
          placeholder="Digite aqui o repositório"
        />
        <button>Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repo) => (
          <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
            <img src={repo.owner.avatar_url} alt="Profile" />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;

import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'
import { useEffect, useState } from 'react'

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = async () => {
    if (data) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    if (data) {
      fetchRepositories();
    }
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
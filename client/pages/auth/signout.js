import { useRequest } from '../../hooks/use-request';
import { Router } from 'next/router';
import { useEffect } from 'react';

export const SignOut = () => {
  const { doRequest } = useRequest({
    url: 'api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div> Signing you out ...</div>;
};

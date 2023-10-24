import LoginFrom from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function Login({ searchParams }: Props) {
  return <LoginFrom returnTo={searchParams.returnTo} />;
}

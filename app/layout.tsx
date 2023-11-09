import './globals.css';
import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Tennisflow',
  description: 'All about tennis',
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body className="font-sans">{props.children}</body>
    </html>
  );
}

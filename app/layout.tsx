import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{props.children}</body>
    </html>
  );
}

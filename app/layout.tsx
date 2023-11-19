import './globals.css';
import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};

export const metadata = {
  title: {
    default: 'Tennisflow | all about tennis ',
    template: '%s | Tennisflow ',
  },
  description: 'Graphic designer and painter',
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body className="font-sans">{props.children}</body>
    </html>
  );
}

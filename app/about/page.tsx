import { Metadata } from 'next';

export const dynamic = 'force-static'; // no necessary, just for demonstration

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default async function About() {
    return (
        <div>
            <h1>About</h1>
            <p>We are a social media company that wants to bring people together!</p>
        </div>
    );
}
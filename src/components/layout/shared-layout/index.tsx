import Head from "next/head";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import NavBar from "@/components/layout/navbar";

interface SharedLayoutProps {
  children: ReactNode;
  title: string;
}

const SharedLayout = ({ title, children }: SharedLayoutProps) => {
  return (
    <Container maxWidth={false} style={{padding:0}}>
      <Head>
        <title>Simulate Emails | {title}</title>
      </Head>
      <NavBar/>
        {children}
    </Container>
  );
};

export default SharedLayout;

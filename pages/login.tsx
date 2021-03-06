import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import styled from "@emotion/styled";
import LoginForm from "@/components/login/LoginForm";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context.locale || process.env.NEXT_LOCALE;
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        locale,
        destination: "/member",
        permanent: false,
      },
    };
  }
  return { props: { session, locale } };
}

export default function Login() {
  return (
    <>
      <Head>
        <title>Rabbit Caffee | 登入</title>
        {/* <meta name='description' content='' /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="content">
          <LoginForm />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    width: 30rem;
    padding: 2rem;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    background-color: #fefefe;
    box-shadow: 0px 1px 3px 1px #00000018;

    @media (max-width: 520px) {
      width: 90%;
    }
  }
`;

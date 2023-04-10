import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import TopNavBar from "./TopNavBar";


const Layout: BlitzLayout<{ title?: string; isLogged: boolean; children?: React.ReactNode }> = ({
  title,
  isLogged,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "BooksLibrary"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopNavBar isLogged={isLogged} />
      {children}
    </>
  )
}

export default Layout

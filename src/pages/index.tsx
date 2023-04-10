import { FC, Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Carrusel from "src/books/components/Carrusel"
import Hero from "src/core/components/Hero"



const Home: BlitzPage = () => {
  return (
    <Layout title="Home" isLogged={false}>
      <Hero />

      <Suspense fallback={<div>Loading...</div>}>
        <div className="contain">
            <Carrusel type="fiction" />
            <Carrusel type="history" />
            <Carrusel type="action" />
            </div>
        </Suspense>


      <style jsx>{`

      .contain {
        display: flex;
        flex-direction: column;
        margin:auto;
      }
      @media (min-width: 640px) {
        .contain {
          max-width: 640px;
        }
      }
      @media (min-width: 768px) {
        .contain{
          max-width: 80%;
        }
      }
      `}</style>
    </Layout>
  )
}

export default Home

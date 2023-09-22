import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import ProjectHero from "@/components/SingleProject/ProjectHero";
import { Container } from '@mui/material';
import Documents from "@/content/Management/Documents/Documents";




export default function ProjectPage () {
    const router = useRouter()
    const { id } = router.query

   

    return (
        <>
        <Head>
          <title>Виж продробно {id} </title>
        </Head>
        <ProjectHero backgroundImage="https://images.unsplash.com/photo-1435575653489-b0873ec954e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        title="1"
        subtitle="Разгледай подробно документите" />
        <Container maxWidth='lg' sx={{
          padding: '40px'
        }}>
           <Documents/>
          </Container>
        <Footer />
      </>
    )
}

ProjectPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
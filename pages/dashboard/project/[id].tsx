import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import ProjectHeader from "@/content/Management/Project/ProjectHeader";
import ProjectDocuments from "@/content/Management/Project/ProjectDocuments";

export default function ProjectPage () {
    const router = useRouter()
    const { id } = router.query

   

    return (
        <>  
        <Head>
          <title>Виж продробно {id} </title>
        </Head>
        <ProjectHeader/>
        <ProjectDocuments />
        <Footer />
      </>
    )
}

ProjectPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
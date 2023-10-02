import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import ProjectHeader from '@/content/Management/Project/ProjectHeader';
import ProjectDocuments from '@/content/Management/Project/ProjectDocuments';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchProjectDocuments } from '@/store/slices/project/projectDocuments';
import { getProjectId } from '@/services/project';

export default function ProjectPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<any>({});

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectDocuments(id as string) as any);
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchPorjectById = async () => {
      const res = await getProjectId(id as string);

      if (res.success) {
        setProject(res.data);
      }
    };

    fetchPorjectById();
  }, [id]);

  return (
    <>
      <Head>
        <title>{id}</title>
        <meta charSet="UTF-8" />
      </Head>
      <ProjectHeader project={project} />

      <Box sx={{ width: '100%', p: '2rem 4rem' }}>
        <ProjectDocuments />
      </Box>
      <Footer />
    </>
  );
}

ProjectPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

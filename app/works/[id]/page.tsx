import prisma from "@/lib/database";

const getWork = async (id: string) => {
  const data = await prisma.works.findUnique({
    where: {
      id,
    },
    include: {
      developers: {
        include: {
          PersonalInfo: true,
          Works: {
            include:{
                media: true
            }
          },
        },
      },
      media: true,
      techStack: true,
    },
  });
  return [data];
};

async function WorkPage({ params }: { params: { id: string } }) {
  const data = await getWork(params.id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
}

export default WorkPage;

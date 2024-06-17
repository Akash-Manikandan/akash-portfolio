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
  return (
    <div>
      {/* {data.map((item) => (
        <div></div>
      ))} */}
    </div>
  );
}

export default WorkPage;

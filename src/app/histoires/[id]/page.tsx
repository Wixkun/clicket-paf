import Layout from "@/layout";

interface HistoiresIdPageProps {
  params: {
    id: string;
  };
}

const HistoiresIdPage = ({ params }: HistoiresIdPageProps) => {
  return (
    <Layout>
      <h1>
        {params.id}
      </h1>
    </Layout>
  );
};


export default HistoiresIdPage;




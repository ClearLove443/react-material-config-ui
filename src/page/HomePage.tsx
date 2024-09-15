import { useEffect } from "react";
import { getAllDatasource } from "../service/customer";
import useStore from "../store";

const HomePage = () => {
  const { setDataSources, loading, setLoading } = useStore();

  useEffect(() => {
    const fetchDataSourcesApi = async () => {
      setLoading(true);
      try {
        // const data: RegionResponse = await getRegionsApi();
        const res = await getAllDatasource();
        const datasources = res.data;
        setDataSources(datasources);
      } catch (error) {
        console.error("Error fetching data sources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataSourcesApi();
  }, []);

  return (
    <>
      <section>
        <div>
          <p>Welcome to Customer Hub </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;

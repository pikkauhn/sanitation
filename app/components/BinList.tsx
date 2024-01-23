import Datatable from "./Datatable";

export default async function BinList() {
  try {
    const bins = await fetch('http://localhost:3000/api/getBins', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      return response.json();
    });

    return (
      <div>
        <Datatable items={bins} loading={false} />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return ;
  }
}
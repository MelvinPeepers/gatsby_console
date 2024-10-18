import * as React from "react";

const SSRPage = ({ serverData }) => (
  <main>
    <h1>SSR Page with Dogs</h1>
    <img alt="Happy dog" src={serverData.message} />
  </main>
);

export default SSRPage;

export async function getServerData() {
  try {
    console.log("Fetching random dog image from API"); // Log before fetching
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.ok) {
      console.error("Fetch failed, status:", res.status);
      throw new Error(`Response failed with status: ${res.status}`);
    }

    const json = await res.json();
    console.log("Fetch successful, data received:", json); // Log successful fetch and data
    return {
      //   props: await res.json(),
      props: json,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}

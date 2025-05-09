import { useState, useEffect } from 'react';
import './App.css';
import PostCard from './components/PostCard.tsx';
import PostHeader from './components/PostHeader.tsx';
import Papa from "papaparse";
import type { ParseResult } from "papaparse";


type Query = {
  BUSINESS_NAME: string;
  SITE_URL: string;
  SITE_DESCRIPTION: string;
  LOCATION: string;
  QUESTION: string;
  result: string;
};

function App() {
  const [data, setData] = useState<Query[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string>('Little Maestros');

  const CSVReader = () => {
    Papa.parse<Query>("/results_output.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Query>) => {
        setData(results.data);
      },
      error: (error) => {
        console.error("Error loading CSV:", error);
      },
    });
  };


  useEffect(() => {
    CSVReader();
  }, []);

  // Get unique business names for dropdown
  const businessNames = Array.from(new Set(data.map((q) => q.BUSINESS_NAME)));

  // Filtered data
  const filteredData = selectedBusiness === 'All'
    ? data
    : data.filter((q) => q.BUSINESS_NAME === selectedBusiness);

  const siteInfo = filteredData[0];

  return (
    <>
      <div className='app'>
        {/* <div className='main-title'>Welcome Back Yohai!</div> */}
        <div className='content'>
          <PostHeader
            businessNames={businessNames}
            selectedBusiness={selectedBusiness}
            onFilterChange={setSelectedBusiness}
          />
          {siteInfo && (
            <div className='site-info'>
              <p><strong>Description:</strong> {siteInfo.SITE_DESCRIPTION}</p>
              <p><strong>URL:</strong> <a href={siteInfo.SITE_URL} target="_blank" rel="noopener noreferrer">{siteInfo.SITE_URL}</a></p>
            </div>
          )}
          <div>
            {filteredData.map((query, index) => (
              <PostCard
                key={index}
                question={query.QUESTION}
                result={query.result}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

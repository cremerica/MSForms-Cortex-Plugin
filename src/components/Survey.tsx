import React from "react";
import {
  
  usePluginContext,
} from "@cortexapps/plugin-core/components";
import "../baseStyles.css";
// import ErrorBoundary from "./ErrorBoundary";

let surveyURL:string = "https://docs.google.com/forms/d/e/1FAIpQLSd068wYDvfxbhB75fTx-KM7aWb9gNiLLcnjA6SQ4ulT9SLgqA/viewform?embedded=true";

const Survey: React.FC = () => {
    const context = usePluginContext();
    console.log(context);
    React.useEffect(() => { 
    if (context.location.match("ENTITY")){
        const fetchData = async (): Promise<void> => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const cortexTag = context.entity!.tag;
            console.log(cortexTag);
            const cortexURL = context.apiBaseUrl;
            console.log(cortexURL);
            const result = await fetch(`${cortexURL}/catalog/${cortexTag}/openapi`);
            const resultJson = await result.json();
            console.log({ resultJson });
            console.log(surveyURL);
            if (resultJson.info["x-cortex-custom-metadata"].survey !== undefined) {
                surveyURL = resultJson.info["x-cortex-custom-metadata"].survey
            }
            console.log(surveyURL);
        };
        void fetchData();
   }
   
   }, []);
            
   const url = new URL(
    surveyURL
   );
   url.searchParams.append("embed", "true");      
   

  return (
        
     <iframe src= {url.toString()} 
      width="100%" 
      height="100%"     
      style={{
        border: 'none',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      allowFullScreen
      />
  
  );
  };
export default Survey;

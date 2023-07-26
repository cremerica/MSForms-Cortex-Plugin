import React from "react";
import {
  
    Loader,
  usePluginContext,
} from "@cortexapps/plugin-core/components";
import "../baseStyles.css";
// import ErrorBoundary from "./ErrorBoundary";

let surveyURL = "https://docs.google.com/forms/d/e/1FAIpQLSd068wYDvfxbhB75fTx-KM7aWb9gNiLLcnjA6SQ4ulT9SLgqA/viewform?embedded=true";

const Survey: React.FC = () => {
    const context = usePluginContext();
    console.log(context);
    const [surveyUrl, setSurveyUrl] = React.useState<any | string>();
    const [isLoading, setIsLoading] = React.useState(true);
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
            
        }
        void fetchData();
        console.log(surveyURL);

    }; 
    setSurveyUrl(surveyURL);
    setIsLoading(false);;
        
   
   
   }, []);
            
   

  return (
     isLoading ? <Loader/> :   
     <iframe src= {surveyUrl ?? surveyURL} 
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

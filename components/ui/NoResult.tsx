import { Inbox } from "lucide-react";

const NoResults = () => {
    return ( 
      <div className="flex flex-col space-y-2 items-center justify-center h-full w-full text-neutral-500">
        <div className=" flex items-center justify-centerw-8 h-8 relative">
            <Inbox />
        </div>
        No results found.
      </div>
     );
  };
   
  export default NoResults;
export function List({
    dateStarted, dateEnded, children 
   }: {
       dateStarted: Date, dateEnded?: Date, children: React.ReactNode 
   }){
   return(
       <div className="relative">
           <div className="flex gap-5 w-full h-12 p-2 relative">
               <div className="text-lg md:text-3xl font-semibold text-muted-foreground w-20">
                   <span>{dateStarted.toISOString().slice(0, 4)}</span>
                   {dateEnded && <span>{ `- ${dateEnded.toISOString().slice(0, 4)}` }</span>}
               </div>
               <div className="flex flex-col justify-center px-2">{ children }</div>
           </div>
       </div>
   );
};
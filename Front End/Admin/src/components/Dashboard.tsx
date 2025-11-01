import StatsCard from "./StattsCard";
import Tables from "./Tables"

function Dashboard(){
    return(
        <>
        <div className="flex-1 p-6">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <span className="text-gray-600">Hoş geldin, <strong>Admin</strong></span>
        </header>     
        
      </div>
        <StatsCard/>        
        <Tables/>
        </>
        
    )
}
export default Dashboard
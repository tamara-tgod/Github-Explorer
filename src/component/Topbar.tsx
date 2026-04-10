function Topbar() {
    return (
        <main className="bg-[#161b22] flex items-center gap-6 font-syne py-3.5 px-8 border-b border-[#21262d]">
       <div id="dots" className="flex gap-1">
         <div className="w-2.5 h-2.5 bg-red-400 rounded-4xl"></div>
        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-4xl"></div>
        <div className="w-2.5 h-2.5 bg-green-400 rounded-4xl"></div>
       </div>

       <p className="flex gap-1 text-sm">
        <span className="text-blue-400">$</span>
        <span className="text-blue-400">gh-<span className="text-green-400">search</span></span>
        
        <span className="text-blue-400">--user</span>
       </p>
        </main>
    )
}
    export default Topbar
;
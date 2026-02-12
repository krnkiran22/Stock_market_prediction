import TopNavigation from '@/components/TopNavigation'
import LeftSidebar from '@/components/LeftSidebar'
import MainContent from '@/components/MainContent'
import RightSidebar from '@/components/RightSidebar'

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-trade-main">
      {/* Top Navigation - Fixed 60px */}
      <TopNavigation />

      {/* Main Layout - Left Sidebar + Content + Right Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Watchlist - Fixed 320px */}
        <LeftSidebar />

        {/* Main Content Area - Flex */}
        <MainContent />

        {/* Right Sidebar - AI Chat + Risk - Fixed 360px */}
        <RightSidebar />
      </div>
    </div>
  )
}

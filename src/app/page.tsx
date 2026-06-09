import Navbar from '@/components/Navbar'
import Story from '@/components/Story'

export default function Home() {
  return (
    <main className="relative bg-[#050505] selection:bg-[#0050FF] selection:text-white">
      <Navbar />
      <Story />
    </main>
  )
}

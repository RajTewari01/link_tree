import Image from "next/image"
import LinkCard from "@/components/LinkCard"
import SocialRow from "@/components/SocialRow"
import ProfileHeader from "@/components/ProfileHeader"
import TopActionBar from "@/components/TopActionBar"
import { getLinks } from "@/lib/firebase"
import { USER_LINKS } from "@/lib/links"

export const dynamic = "force-dynamic"

export default async function Home() {
  const firebaseLinks = await getLinks()
  const links = firebaseLinks && firebaseLinks.length > 0 ? firebaseLinks : USER_LINKS

  return (
    <main className="w-full min-h-screen bg-black flex flex-col items-center pb-24 relative overflow-x-hidden">
      <div className="w-full max-w-[480px] px-4 py-8 flex flex-col pt-8 md:pt-12">
        
        {/* Top Action Bar (Client Component for sharing) */}
        <TopActionBar />

        {/* Profile Header Block */}
        <ProfileHeader />

        {/* Social Icons row (left-aligned) */}
        <div className="flex justify-start items-center gap-4 mb-10 md:mb-12">
          <SocialRow />
        </div>

        {/* Recent YouTube Upload Block */}
        <div className="w-full flex flex-col mb-10">
          <h3 className="text-white font-[600] text-[1.1rem] mb-5 text-center">Recent YouTube upload</h3>
          <div className="w-full aspect-[16/9] rounded-[32px] overflow-hidden bg-[#1f1f1f] relative">
             <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/oafxkMv4xnc?si=tdmJljH-HhHuZ51Z&controls=1&modestbranding=1&rel=0" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="encrypted-media;picture-in-picture" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
             >
             </iframe>
          </div>
        </div>

        {/* Notes Block (Exactly below video, matching Beacons layout) */}
        <div className="relative w-full py-4 mb-10 flex flex-col items-center">
          <h4 className="text-[#e2e2e2] text-[1.25rem] leading-[1.3] font-[400] text-center w-[90%] mb-4">
             Simplicity is the soul of efficiency
          </h4>
          <div className="relative w-full flex items-center">
            <div className="absolute left-4 w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 opacity-80">
               <Image src="/profile.jpeg" alt="Avatar" width={46} height={46} className="object-cover w-full h-full" />
            </div>
            <div className="w-full pl-[76px] pr-4">
               <p className="text-[#a1a1aa] text-[0.9rem] leading-relaxed text-center font-[300]">
                  Crafting scalable architectures, developing intelligent systems, and pushing the boundaries of what is possible with code.
               </p>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div className="w-full flex flex-col gap-1">
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              title={link.title}
              subtitle={link.subtitle}
              url={link.url}
              iconUrl={link.iconUrl}
              delay={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Fixed Footer Sticky Pill - Clickable link to actual portfolio */}
      <a 
        href="https://rajs.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[448px] bg-white rounded-[18px] py-3.5 px-4 flex justify-between items-center z-50 cursor-pointer hover:scale-[1.02] transition-transform"
        title="Visit my main portfolio"
      >
        <div className="flex items-center gap-2.5 text-black font-[500] text-[0.95rem]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black">
             <circle cx="12" cy="7" r="3.2" />
             <circle cx="7" cy="16" r="3.2" />
             <circle cx="17" cy="16" r="3.2" />
          </svg>
          Biswadeep Tewari
        </div>
        <div className="text-black/80 font-[400] text-[0.95rem] tracking-wide pr-1">
          Link Tree
        </div>
      </a>
    </main>
  )
}
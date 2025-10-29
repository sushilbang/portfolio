import BannerSection from "./BannerSection"
import ProfileHeader from "./ProfileHeader"
import ContentSection from './ContentSection'
import SectionBorder from './SectionBorder'
import ContentParagraph from "./ContentParagraph"
import ContributionsDisplay from "./ContributionsDisplay"
import TechStackMarquee from "./TechStackMarquee"
import OpenSourceContributionsCard from "./OpenSourceContributionsCard"
import Reachout from "./Reachout"
export default function HeroSection() {
    return (
        <div className="min-h-screen transition-colors duration-300 font-['Inter'] relative">
            <div className="relative mx-auto max-w-4xl">
                <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl">
                    <BannerSection
                        bannerImage="/banner.jpeg"
                    />
                    <ProfileHeader
                        name="Sushil Bang"
                        age="21"
                        title="engineer"
                        profileImage="/pfp.jpg"
                        socialLinks={{
                            twitter: "https://x.com/bang_sushil17",
                            github: "https://github.com/sushilbang",
                            linkedin: "https://www.linkedin.com/in/sushil-bang-9b0327284/",
                            resume: "https://drive.google.com/file/d/1ejKPEj_43_RReGmoNJnN5-74hqMazuJv/view?usp=sharing",
                        }}
                    />
                    <SectionBorder className="mt-6" />
                    <ContentSection className="pb-8 pt-6">
                        <ContentParagraph className="mb-6">
                            Hey there! I&apos;m Sushil, who&apos;s all about building cool digital stuff that blends engineering, creativity, and real-world use. I get a kick out of working on scalable backend systems, AI + (Dopamine) - driven web apps, and pitching in on open-source projects. I love that sweet spot where cutting-edge tech meets awesome user experiences.
                        </ContentParagraph>
                        <ContentParagraph className="mb-6">
                            I&apos;m pretty handy with tools like FastAPI, Celery, Redis, Supabase, and AWS, whipping up solid web apps. One of my favorite projects was Podcast Pro—it&apos;s this neat setup that turns documents into podcasts automatically. I&apos;m also a big open-source fan, having spruced up things like context menus and drag-and-drop features for Wisk.
                        </ContentParagraph>
                        <ContentParagraph className="mb-2">
                            When I&apos;m not coding or tweaking cloud setups, you&apos;ll catch me diving into the latest AI research, contributing to open-source repos, or just geeking out over the newest software trends.
                        </ContentParagraph>
                    </ContentSection>
                    <SectionBorder className="mt-0 pt-0 mb-6" />
                    <TechStackMarquee className="w-full" />
                    <SectionBorder className="mt-0 pt-0 mb-6" />
                    <p className="text-lg opacity-20 leading-relaxed -tracking-[0.01em] mb-4">
                        GitHub Contributions <span className="opacity-20">●</span> @sushilbang
                    </p>
                    <div className="mb-6">
                        <ContributionsDisplay
                            username="sushilbang"
                            variant="compact"
                            className="w-full"
                        />
                    </div>
                    <SectionBorder className="mt-0 pt-0 mb-6" />
                    <h2 className="text-lg sm:text-xl opacity-20 mt-8 leading-relaxed -tracking-[0.01em] mb-4">
                        Open Source Contributions <span className="opacity-20">●</span> {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </h2>
                    <OpenSourceContributionsCard />
                    <SectionBorder className="mt-0 pt-0 mb-6" />
                    <Reachout 
                        title="Let's connect"
                        subtitle="Find me on these platforms"
                    />
                </div>

            </div>
        </div>
    )
}
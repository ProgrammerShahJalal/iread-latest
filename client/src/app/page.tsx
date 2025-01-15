import Blog from "./home/Blog";
import Courses from "./home/Courses";
import Gallery from "./home/Gallery";
import HappyStudentAtAGlance from "./home/HappyStudentAtAGlance";
import Hero from "./home/Hero";
import OurTeachers from "./home/OurTeachers";

export default function Home() {
    return (
        <>
            <Hero />
            <Courses />
            <HappyStudentAtAGlance />
            <OurTeachers />
            <Gallery/>
            <Blog/>
        </>
    );
}

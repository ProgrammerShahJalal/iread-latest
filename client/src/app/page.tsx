import AboutPage from "./about/page";
import Blog from "./home/Blog";
import Courses from "./home/Courses";
import Gallery from "./home/Gallery";
import HappyStudentAtAGlance from "./home/HappyStudentAtAGlance";
import OurTeachers from "./home/OurTeachers";

export default function Home() {
    return (
        <main>
            <AboutPage />

            <Courses />

            <HappyStudentAtAGlance />

            <OurTeachers />

            <Gallery/>

            <Blog/>
        </main>
    );
}

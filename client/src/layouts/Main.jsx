import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Banner from '../pages/Home/Banner'
import Container from '../components/Shared/Container'
import RecentBlogs from '../pages/Home/RecentBlogs'
import ShowAnnouncements from '../pages/Home/ShowAnnouncements'
import PopularPosts from '../pages/Home/PopularPosts'
import ZoomIn from '../Animations/Zoom'
import FeatureSections from '../pages/Home/Features'
const Main = () => {
  return (
    <div>
      <Navbar />
      <Banner></Banner>
    <Container><FeatureSections></FeatureSections></Container>

      <ZoomIn>      <Container><RecentBlogs></RecentBlogs></Container>
      </ZoomIn>
      <ZoomIn>      <Container><PopularPosts></PopularPosts></Container>
      </ZoomIn>
      <ShowAnnouncements></ShowAnnouncements>

      <Footer />
    </div>
  )
}

export default Main

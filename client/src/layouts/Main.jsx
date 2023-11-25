import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Banner from '../pages/Home/Banner'
import Container from '../components/Shared/Container'
import SearchSection from '../pages/Home/SearchSection'
const Main = () => {
  return (
    <div>
      <Navbar />
          <Banner></Banner>
<Container>       <SearchSection></SearchSection>
</Container>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main

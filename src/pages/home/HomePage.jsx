import Layout from '../../components/Layout/Layout'
import HeroSection from '../../components/HeroSection/HeroSection';
import Category from '../../components/category/Category';
import HomePageProductCard from '../../components/HomePageProductCard/HomePageProductCard';
export default function HomePage() {
  return (
    <Layout>
      <HeroSection/>
      <Category/>
      <HomePageProductCard/>
    </Layout>
  );
}

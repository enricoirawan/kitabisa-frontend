import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';

import logo_active from '@/public/icons/logo_active.svg';
import love_list_active from '@/public/icons/love_list_active.svg';
import image_11 from '@/public/icons/image_11.svg';
import zakat from '@/public/icons/zakat.svg';
import donasi from '@/public/icons/donasi.svg';
import saling_bantu from '@/public/icons/saling_bantu.svg';
import kurban from '@/public/icons/kurban.svg';
import create_donation from '@/public/images/create_donation.png';
import HomeMenuItem from '@/components/home/home-menu-item';
import HomeCarouselBanner from '@/components/home/home-carousel-banner';
import CreateCampaignButton from '@/components/home/create-campaign-button';
import GoToLoginButton from '@/components/home/go-to-login-button';
import HomeCampaignList from '@/components/home/home-campaign-list';
import HomeCategoryList from '@/components/home/home-category-list';
import GoToCampaignsButton from '@/components/go-to-campaigns-button';
import SearchBar from '@/components/home/search-bar';
import NewestDonation from '@/components/home/newest-donation';
import DonationCount from '@/components/home/donation-count';
import { authOptions } from '@/lib/authOptions';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home',
    description: 'Donasi kapanpun dan dimanapun. Kita Bisa Kok!',
  };
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const username = session?.user.name;

  return (
    <div className="space-y-4 h-screen overflow-y-scroll">
      {/* Header */}
      <section className="relative h-52 bg-curelean-50 rounded-b-xl">
        <div className="flex items-center justify-between px-4 py-3 gap-x-4">
          <Image alt="Logo" src={logo_active} />
          <SearchBar />
          <Image alt="Favorite" src={love_list_active} />
        </div>

        {session ? (
          <div className="px-3 py-3 space-y-2">
            <p className="text-neutral-0 font-bold text-sm">
              Terima kasih, {username}
            </p>
            <DonationCount />
          </div>
        ) : (
          <div className="px-3 py-3 space-y-2">
            <p className="text-neutral-0 text-sm">
              Halo <span className="font-semibold">#OrangBaik</span>
            </p>
            <p className="text-neutral-0 text-sm">
              Yuk peduli & berbuat baik dengan sekitar,
            </p>
            <GoToLoginButton label="Masuk untuk berdonasi" />
          </div>
        )}

        <div className="absolute bottom-0 right-0">
          <Image alt="image_11" src={image_11} />
        </div>
      </section>
      {/* Header */}

      {/* Menu */}
      <section className="px-2">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-black text-lg">Menu</p>
          <GoToCampaignsButton />
        </div>
        <div className="px-6 flex items-center justify-between">
          <HomeMenuItem label="Donasi" src={donasi} />
          <HomeMenuItem label="Zakat" src={zakat} />
          <HomeMenuItem label="Saling Bantu" src={saling_bantu} />
          <HomeMenuItem label="Kurban" src={kurban} />
        </div>
      </section>
      {/* Menu */}

      {/* Create Donation */}
      <section className="relative w-full px-2 rounded">
        <Image alt="create_donation" className="w-full" src={create_donation} />
        <div className="absolute bottom-4 left-5">
          <p className="text-xl text-neutral-0 font-bold mb-2">
            Anda Ingin Membantu Orang Yang Membutuhkan?
          </p>
          {session ? (
            <CreateCampaignButton />
          ) : (
            <GoToLoginButton label="Masuk untuk membuat kampanye" />
          )}
        </div>
      </section>
      {/* Create Donation */}

      {/* Category */}
      <section className="">
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="font-bold text-black text-lg">Kategori</p>
          <GoToCampaignsButton />
        </div>
        <div className="w-full flex items-center justify-start gap-x-3 overflow-x-scroll no-scrollbar mb-4">
          <HomeCategoryList />
        </div>
        <div className="w-full flex items-center justify-start gap-x-3 overflow-x-scroll no-scrollbar pb-2">
          <HomeCampaignList />
        </div>
      </section>
      {/* Category */}

      {/* Carousel Banner */}
      <section className="px-2">
        <HomeCarouselBanner />
      </section>
      {/* Carousel Banner */}

      {/* Donation */}
      <section className="">
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="font-bold text-black text-lg">
            Doa-doa{' '}
            <span className="text-curelean-50 font-semibold">#OrangBaik</span>
          </p>
          <p className="font-bold text-sm text-curelean-50">Lainnya</p>
        </div>
        <div className="w-full flex items-center justify-start gap-x-3 overflow-x-scroll no-scrollbar pb-24">
          <NewestDonation />
        </div>
      </section>
      {/* Donation */}
    </div>
  );
}

import { getServerSession } from 'next-auth';
import Image from 'next/image';

import LogoutButton from '@/components/profile/logout-button';
import EditProfileButton from '@/components/profile/edit-profile-button';
import { authOptions } from '@/lib/authOptions';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  console.log(JSON.stringify(session?.user));

  return (
    <div className="w-full flex flex-col h-screen">
      {/* Header */}
      <section className="h-16 bg-curelean-50 flex items-center justify-start">
        <p className="pl-5 py-5 text-neutral-0 font-bold">Profile</p>
      </section>
      {/* Header */}

      {/* Profile */}
      <section className="flex items-center justify-start px-4 py-2 mt-2">
        <Image
          alt="photo_profile"
          className="w-12 h-12 rounded-full"
          height={0}
          src={session?.user.image ?? ''}
          unoptimized={true}
          width={0}
        />
        <div className="flex flex-col items-start justify-start ml-3">
          <p className="text-sm font-semibold">{session?.user.name}</p>
          <p className="text-sm text-neutral-60">{session?.user.email}</p>
        </div>
      </section>
      <div className="mt-2 ml-4 border-b border-solid border-neutral-20" />
      {/* Profile */}

      {/* Menus */}
      <section className="flex flex-col">
        {/* Edit Profile */}
        <EditProfileButton />
        <div className="mt-2 ml-4 border-b border-solid border-neutral-10" />
        {/* Edit Profile */}

        {/* Logout */}
        <LogoutButton />
        <div className="mt-2 ml-4 border-b border-solid border-neutral-10" />
        {/* Logout */}
      </section>
      {/* Menus */}
    </div>
  );
};

export default ProfilePage;

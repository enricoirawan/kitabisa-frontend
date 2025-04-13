import { getServerSession } from 'next-auth';

import Divider from '@/components/divider';
import { formatDateForView } from '@/common/utils';
import DonationCount from '@/components/my-donations/donation-count';
import DonationList from '@/components/my-donations/donation-list';
import { authOptions } from '@/lib/authOptions';

const MyDonations = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex flex-col h-screen">
      {/* Header */}
      <section className="bg-curelean-50 h-28 relative">
        <p className="pl-5 py-5 text-neutral-0 font-bold">Donasi Saya</p>

        <div className="absolute -bottom-16 w-full bg-transparent p-5">
          <div className="bg-neutral-0 mx-3 px-3.5 py-3 rounded shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <p className="text-neutral-100 font-semibold text-sm">
              {session?.user.name}
            </p>
            <p className="text-neutral-100 text-xs">
              Berbagi kebaikan di Kitabisa sejak{' '}
              {formatDateForView(session?.user.createdAt ?? '')}
            </p>

            <div className="h-[1px] bg-neutral-20 w-full my-2" />

            <DonationCount />
          </div>
        </div>
      </section>
      {/* Header */}

      <div className="mt-16">
        <Divider />
      </div>

      {/* Doa-doa */}
      <section className="flex-1 w-full px-4 mt-5 pb-24 overflow-y-scroll">
        <p className="text-neutral-100 font-bold">
          Ingat Pernah Menulis Doa Ini?
        </p>
        <DonationList />
      </section>
      {/* Doa-doa */}
    </div>
  );
};

export default MyDonations;

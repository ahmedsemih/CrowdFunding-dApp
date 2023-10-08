import Link from 'next/link';
import Image from 'next/image';

import Logo from '../../public/Logo.png';
import getDaysLeft from '@/utils/getDaysLeft';

const Card = ({ campaign }) => {
  return (
    <Link href={`/campaigns/${campaign.id}`} className='w-full cursor-pointer bg-neutral-800 rounded-lg'>
        <img className='w-full rounded-lg h-[264px]' loading='lazy' src={campaign.imageUrl} alt={campaign.title} width={500} height={250} />
        <div className='p-2 sm:p-4'>
            <h5 className='text-xl py-1 truncate'>{campaign.title}</h5>
            <p className='truncate pb-4 text-neutral-400' >{campaign.description}</p>
            <div className='flex justify-between pb-4 gap-4'>
                <div className='flex flex-col overflow-hidden'>
                    <span className='text-neutral-300'>{campaign.collectedAmount}</span>
                    <span className='text-neutral-400'>Raised of {campaign.target}</span>
                </div>
                <div className='flex flex-col overflow-hidden'>
                    <span className='text-neutral-300'>{getDaysLeft(campaign.deadline)}</span>
                    <span className='text-neutral-400'>Days Left</span>
                </div>
            </div>
            <div className='flex items-center'>
                <Image  className='bg-neutral-900 rounded-full mr-2 p-2' src={Logo} alt='logo' width={36} height={36} />
                <p className='text-sm truncate'><span className='text-neutral-400 mr-1'>by</span> {campaign.owner}</p>
            </div>
        </div>
    </Link>
  )
}

export default Card;
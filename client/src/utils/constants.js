import { MdOutlineCampaign } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbZoomMoney } from 'react-icons/tb';
import { HiOutlineUserCircle } from 'react-icons/hi';

export const navLinks = [
    {
        Icon: BsGrid,
        href: '/',
        title: 'All Campaigns'
    },
    {
        Icon: RiMoneyDollarCircleLine,
        href: '/most',
        title: 'Most Funded'
    },
    {
        Icon: MdOutlineCampaign,
        href: '/newest',
        title: 'New Campaigns'
    },
    {
        Icon: TbZoomMoney,
        href: '/discover',
        title: 'Discover'
    },
    {
        Icon: HiOutlineUserCircle,
        href: '/account',
        title: 'Account'
    },
]
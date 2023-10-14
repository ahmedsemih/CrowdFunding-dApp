import { MdOutlineCampaign } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbZoomMoney } from 'react-icons/tb';
import { HiOutlineUserCircle } from 'react-icons/hi';

export const navLinks = [
    {
        Icon: BsGrid,
        href: '/campaigns',
        title: 'All Campaigns'
    },
    {
        Icon: RiMoneyDollarCircleLine,
        href: '/campaigns?sort=most_funded',
        title: 'Most Funded'
    },
    {
        Icon: MdOutlineCampaign,
        href: '/campaigns?sort=newest',
        title: 'New Campaigns'
    },
    {
        Icon: TbZoomMoney,
        href: '/search',
        title: 'Search'
    },
    {
        Icon: HiOutlineUserCircle,
        href: '/account',
        title: 'Account'
    },
]
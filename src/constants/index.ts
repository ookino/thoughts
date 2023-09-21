import { ActivityIcon, ExploreIcon, HomeIcon, UserIcon, UsersIcon } from '@/components/icons'

export const sidebarLinks = [
  {
    logo: HomeIcon,
    route: '/',
    label: 'Home'
  },
  {
    logo: ExploreIcon,
    route: '/explore',
    label: 'Explore'
  },
  {
    logo: ActivityIcon,
    route: '/activity',
    label: 'Activity'
  },
  // {
  //   logo: '/assets/create.svg',
  //   route: '/create-thread',
  //   label: 'Create Thread'
  // },
  // {
  //   logo: UsersIcon,
  //   route: '/communities',
  //   label: 'Communities'
  // },
  {
    logo: UserIcon,
    route: '/profile',
    label: 'Profile'
  }
]

export const profileTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
  { value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' }
]

export const communityTabs = [
  { value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
  { value: 'members', label: 'Members', icon: '/assets/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/assets/request.svg' }
]

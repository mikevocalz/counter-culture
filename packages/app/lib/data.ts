export type Comment = {
  id: string
  username: string
  avatar: string
  text: string
  timeAgo: string
  likes: number
  replies?: Comment[]
}

export type Post = {
  id: string
  author: { username: string; avatar: string; verified?: boolean }
  media: { type: 'image' | 'video'; url: string }[]
  caption?: string
  likes: number
  comments: Comment[]
  timeAgo: string
  location?: string
}

export function countThreadComments(comments: Comment[]): number {
  return comments.reduce((total, comment) => total + 1 + countThreadComments(comment.replies || []), 0)
}

export const feedPosts: Post[] = [
  {
    id: 'f1',
    author: {
      username: 'sarahchen',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
    media: [
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
    ],
    caption:
      'Just shipped a new portfolio build. The performance gains are wild and the animations feel crisp.',
    likes: 12847,
    comments: [
      {
        id: 'c1',
        username: 'alexkim',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'This is clean. The motion work looks great.',
        timeAgo: '2h',
        likes: 24,
        replies: [
          {
            id: 'c1r1',
            username: 'sarahchen',
            avatar:
              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
            text: 'Thanks! The micro-interactions were the fun part.',
            timeAgo: '58m',
            likes: 6,
          },
        ],
      },
      {
        id: 'c2',
        username: 'jamielee',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Love the typography choices.',
        timeAgo: '1h',
        likes: 12,
      },
    ],
    timeAgo: '2 hours ago',
    location: 'San Francisco, CA',
  },
  {
    id: 'f2',
    author: {
      username: 'marcusj',
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    media: [
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
    ],
    caption: 'Golden hour on the coast never gets old.',
    likes: 8432,
    comments: [
      {
        id: 'c3',
        username: 'emmaw',
        avatar:
          'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'These colors are unreal.',
        timeAgo: '3h',
        likes: 18,
        replies: [
          {
            id: 'c3r1',
            username: 'marcusj',
            avatar:
              'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
            text: 'Pure luck with the clouds.',
            timeAgo: '1h',
            likes: 7,
          },
        ],
      },
    ],
    timeAgo: '5 hours ago',
    location: 'Big Sur, CA',
  },
  {
    id: 'f3',
    author: {
      username: 'priyapatel',
      avatar:
        'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
    },
    media: [
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
    ],
    caption: 'New neighborhood spot. The cold brew is a must.',
    likes: 5621,
    comments: [
      {
        id: 'c4',
        username: 'davidpark',
        avatar:
          'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Adding this to my list.',
        timeAgo: '5h',
        likes: 8,
      },
    ],
    timeAgo: '8 hours ago',
    location: 'Brooklyn, NY',
  },
  {
    id: 'f4',
    author: {
      username: 'elitorres',
      avatar:
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    media: [
      {
        type: 'video',
        url:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    caption: 'Late-night build session, neon on repeat.',
    likes: 23156,
    comments: [
      {
        id: 'c5',
        username: 'mayapatel',
        avatar:
          'https://images.pexels.com/photos/1181713/pexels-photo-1181713.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Love the vibe in this shot.',
        timeAgo: '10h',
        likes: 32,
      },
      {
        id: 'c6',
        username: 'leogrant',
        avatar:
          'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'What playlist are you on?',
        timeAgo: '9h',
        likes: 15,
      },
    ],
    timeAgo: '12 hours ago',
    location: 'Austin, TX',
  },
]

export type EventAttendee = {
  name: string
  avatar?: string
  initials?: string
}

export type EventListing = {
  id: string
  title: string
  date: string
  month: string
  time: string
  location: string
  price: number
  image: string
  attendees: EventAttendee[]
  totalAttendees: number
  likes: number
  category: string
}

export const eventListings: EventListing[] = [
  {
    id: 'lower-east-side-winter-bar-fest',
    title: 'Lower East Side Winter Bar Fest',
    date: '17',
    month: 'JAN',
    time: '6:00 PM',
    location: 'Lower East Side, NY',
    price: 35,
    image: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=1200&q=80',
    attendees: [
      {
        name: 'Sarah',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'Maria',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'JD', initials: 'JD' },
      {
        name: 'Emma',
        avatar:
          'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'John',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    totalAttendees: 127,
    likes: 1100,
    category: 'Nightlife',
  },
  {
    id: 'brooklyn-jazz-night',
    title: 'Brooklyn Jazz Night',
    date: '18',
    month: 'JAN',
    time: '8:00 PM',
    location: 'Brooklyn, NY',
    price: 45,
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    attendees: [
      {
        name: 'Emma',
        avatar:
          'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'MK', initials: 'MK' },
      {
        name: 'John',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'Alex',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'Lisa',
        avatar:
          'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    totalAttendees: 89,
    likes: 850,
    category: 'Music',
  },
  {
    id: 'rooftop-brunch-experience',
    title: 'Rooftop Brunch Experience',
    date: '19',
    month: 'JAN',
    time: '11:00 AM',
    location: 'Manhattan, NY',
    price: 55,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    attendees: [
      {
        name: 'Alex',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'Lisa',
        avatar:
          'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'TC', initials: 'TC' },
      {
        name: 'Sarah',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'RS', initials: 'RS' },
    ],
    totalAttendees: 156,
    likes: 2300,
    category: 'Food & Drink',
  },
  {
    id: 'tech-networking-mixer',
    title: 'Tech Startup Networking Mixer',
    date: '23',
    month: 'JAN',
    time: '6:30 PM',
    location: 'SoHo, NY',
    price: 25,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    attendees: [
      { name: 'RS', initials: 'RS' },
      {
        name: 'Sarah',
        avatar:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'PK', initials: 'PK' },
      {
        name: 'Maria',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'John',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    totalAttendees: 203,
    likes: 1600,
    category: 'Networking',
  },
  {
    id: 'comedy-show-special',
    title: 'Stand-Up Comedy Show Special',
    date: '24',
    month: 'JAN',
    time: '7:00 PM',
    location: 'Greenwich Village, NY',
    price: 30,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    attendees: [
      {
        name: 'Emma',
        avatar:
          'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'John',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'AZ', initials: 'AZ' },
      {
        name: 'Alex',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'GH', initials: 'GH' },
    ],
    totalAttendees: 178,
    likes: 1450,
    category: 'Entertainment',
  },
  {
    id: 'art-gallery-opening',
    title: 'Contemporary Art Gallery Opening',
    date: '25',
    month: 'JAN',
    time: '5:00 PM',
    location: 'Chelsea, NY',
    price: 20,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    attendees: [
      {
        name: 'Maria',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'GH', initials: 'GH' },
      {
        name: 'Alex',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        name: 'Lisa',
        avatar:
          'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      { name: 'TC', initials: 'TC' },
    ],
    totalAttendees: 94,
    likes: 720,
    category: 'Art & Culture',
  },
]

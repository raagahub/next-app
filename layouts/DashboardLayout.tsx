import { PropsWithChildren, useState } from 'react';
import { Group, Text } from '@mantine/core';
import {
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconMusicPlus,
  IconPlaylist,
  IconGps,
  IconWriting,
  IconMessage,
} from '@tabler/icons-react';
import useStyles from './Dashboard.styles';
import Image from 'next/image';
import { Lora } from 'next/font/google';
import { useRouter } from 'next/navigation';

export const brandFont = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const data = [
  { link: '/submit-music', label: 'Submit Music', icon: IconMusicPlus },
  { link: '', label: 'Create Playlist', icon: IconPlaylist },
  { link: '', label: 'Guidelines', icon: IconWriting },
  { link: '', label: 'Browse', icon: IconGps },
  { link: '', label: 'Settings', icon: IconSettings },
];

const DashboardLayout = (props: PropsWithChildren) => {
  const [active, setActive] = useState('Submit Music');
  const { classes } = useStyles()
  const router = useRouter()

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div className={classes.container}>
      <nav className={classes.navbar}>
        <Group className={classes.header}>
          <Image
            src='/raagahub_logo_dark.png'
            alt='raagahub_logo'
            width={60}
            height={60}
          />
          <Text color='dark.4' mt={-5} style={{ fontFamily: brandFont.style.fontFamily, fontWeight: 700, fontSize: 24 }}>Ragahub</Text>
        </Group>
        <div className={classes.navbarMain}>
          {links}
        </div>

        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconMessage className={classes.linkIcon} stroke={1.5} />
            <span>Submit Feedback</span>
          </a>

          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

export default DashboardLayout;
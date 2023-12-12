import { PropsWithChildren, useState } from 'react';
import { Group, Text } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import useStyles from './Dashboard.styles';
import Image from 'next/image';
import { Lora } from 'next/font/google';

export const brandFont = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

const DashboardLayout = (props: PropsWithChildren) => {
  const [active, setActive] = useState('Billing');
  const { classes } = useStyles()

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
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
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
      <div>
        <div className={classes.content}>{props.children}</div>
      </div>

    </div>
  );
}

export default DashboardLayout;
import { useState, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Grid, NavLink, Navbar, Group, Paper } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { dashboardElements } from '../library/components/Dashboard/DashboardHelper'
import { IconUser, IconBookmarks, IconActivity, IconChevronRight, IconLock } from '@tabler/icons-react';



const DashboardLayout = (props: PropsWithChildren) => {
  const router = useRouter()
  const pathname = usePathname()
  const activePath = pathname.split('/')[2]
  console.log(activePath)
  const [active, setActive] = useState(activePath);

  const sidebarItems = dashboardElements.map((item, index) => (
    <NavLink
      key={item.path}
      active={item.path === activePath}
      label={item.label}
      icon={<item.icon size="1rem" stroke={1.5} />}
      rightSection={item.private ? <IconLock size="0.8rem" stroke={1.5} color='gray' /> : null}
      variant="subtle"
      onClick={() => router.push(`/dashboard/${item.path}`)}
    />
  ));

  return (
    <Container mt={64}>
      <Grid>
        <Grid.Col span={3}>
          <Paper shadow="xs" radius="md" p={0} withBorder>
            {sidebarItems}
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Box px={"lg"} py={48}>
          {props.children}
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

// export default withRouter(DashboardLayout)
export default DashboardLayout

import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Grid } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { routes } from './configs/routes'

type PageLayoutProps = {
  children: React.ReactElement
}

const { useBreakpoint } = Grid

function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation()
  const screens = useBreakpoint()

  return (
    <Layout>
      <Layout.Header
        style={{ backgroundColor: 'white', ...(screens.xs ? { padding: '0' } : undefined) }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ textAlign: screens.md ? 'right' : 'center' }}
        >
          <Menu.Item key={routes.originalPokemons.path}>
            <Link to={routes.originalPokemons.path}>Original Pokemons</Link>
          </Menu.Item>
          <Menu.Item key={routes.customPokemons.path}>
            <Link to={routes.customPokemons.path}>Custom Pokemons</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout>
        <Layout.Sider breakpoint="sm" collapsedWidth={0} trigger={null}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{
              position: 'sticky',
              top: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '100vh',
            }}
          >
            <Menu.Item key={routes.originalPokemons.path} icon={<UserOutlined />}>
              <Link to={routes.originalPokemons.path}>Original Pokemons</Link>
            </Menu.Item>
            <Menu.Item key={routes.customPokemons.path} icon={<VideoCameraOutlined />}>
              <Link to={routes.customPokemons.path}>Custom Pokemons</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <div style={{ margin: screens.md ? 24 : 0, padding: 24, backgroundColor: 'white' }}>
            {children}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout

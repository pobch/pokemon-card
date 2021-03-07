import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { routes } from './configs/routes'

type PageLayoutProps = {
  children: React.ReactElement
}

function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation()

  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: 'white' }}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ float: 'right' }}
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
        <Layout.Sider breakpoint="sm">
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
          <div style={{ margin: 24, padding: 24, backgroundColor: 'white' }}>{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout

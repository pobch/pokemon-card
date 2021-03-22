import firebase from 'firebase/app'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu, Grid, Button } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { routes, RouteKey } from './configs/routes'
import { useAccountConsumer } from './AccountContext'

type PageLayoutProps = {
  children: React.ReactElement
}

const { useBreakpoint } = Grid

function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation()
  const screens = useBreakpoint()
  const { account } = useAccountConsumer()
  const history = useHistory()

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
          <Menu.Item key={routes[RouteKey.OriginalPokemons].path}>
            <Link to={routes[RouteKey.OriginalPokemons].path}>Original Pokemons</Link>
          </Menu.Item>
          {account && (
            <Menu.Item key={routes[RouteKey.CustomPokemons].path}>
              <Link to={routes[RouteKey.CustomPokemons].path}>Custom Pokemons</Link>
            </Menu.Item>
          )}
          {account ? (
            <Menu.Item key={Math.random()}>
              <Button
                type="text"
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      history.push(routes[RouteKey.OriginalPokemons].path)
                    })
                }}
              >
                Sign Out
              </Button>
            </Menu.Item>
          ) : (
            <Menu.Item key={routes[RouteKey.SignIn].path}>
              <Link to={routes[RouteKey.SignIn].path}>Sign In</Link>
            </Menu.Item>
          )}
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
            <Menu.Item key={routes[RouteKey.OriginalPokemons].path} icon={<UserOutlined />}>
              <Link to={routes[RouteKey.OriginalPokemons].path}>Original Pokemons</Link>
            </Menu.Item>
            {account && (
              <Menu.Item key={routes[RouteKey.CustomPokemons].path} icon={<VideoCameraOutlined />}>
                <Link to={routes[RouteKey.CustomPokemons].path}>Custom Pokemons</Link>
              </Menu.Item>
            )}
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

export { PageLayout }

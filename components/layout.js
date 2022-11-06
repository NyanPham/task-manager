import Background from './background'
import Card from './Card'
import Header from './header'
import MainView from './Main/main-view'
import ViewNavigation from './view-navigation'

function Layout({ children }) {
    return (
        <Background>
            <div className="flex flex-row h-screen">
                <div className="w-1/2 flex flex-col justify-center items-center gap-16">
                    <Header />
                    <ViewNavigation />
                </div>
                <div className="w-1/2 m-4">
                    <Card bg="bg-white">
                        <MainView>{children}</MainView>
                    </Card>
                </div>
            </div>
        </Background>
    )
}

export default Layout

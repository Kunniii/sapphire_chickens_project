import { lazy } from 'react'

//Layouts:
import MarketLayout from '../components/layout/market-layout'
import GameLayout from '../components/layout/game-layout'

//Pages
const HomePage = lazy(() => import("./home"))
const DetailCollections = lazy(() => import("./detail-collections"))
const DetailNft = lazy(() => import("./detail-nft"))
const CreateNft = lazy(() => import("./create-nft"))
const Customers = lazy(() => import("./customers"))
const CustomersEdit = lazy(() => import("./customers-edit"))
const CustomersCreate = lazy(() => import("./customers-create"))
const LoginGame = lazy(() => import("./game/login"))

const routes = [
    {
        path: "/",
        exact: true,
        public: true,
        component: HomePage,
        layout: MarketLayout
    },
    {
        path: "/login",
        exact: true,
        public: true,
        component: LoginGame,
        layout: null
    },
    {
        path: "/collection/detail",
        exact: true,
        public: true,
        component: DetailCollections,
        layout: MarketLayout
    },
    {
        path: "/nft/:id",
        exact: true,
        public: true,
        component: DetailNft,
        layout: MarketLayout
    },
    {
        path: "/nft/create",
        exact: true,
        public: true,
        component: CreateNft,
        layout: MarketLayout
    },
    {
        path: "/customers",
        exact: true,
        public: true,
        component: Customers,
        layout: MarketLayout
    },
    {
        path: "/customers/:id",
        exact: true,
        public: true,
        component: CustomersEdit,
        layout: MarketLayout
    },
    {
      path: "/customers/create",
      exact: true,
      public: true,
      component: CustomersCreate,
      layout: MarketLayout
    },
]

export default routes